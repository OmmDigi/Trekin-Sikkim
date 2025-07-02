import asyncErrorHandler from "../middlewares/asyncErrorHandler";
import { v4 as uuidv4 } from "uuid";
import { ApiResponse } from "../utils/ApiResponse";
import { ErrorHandler } from "../utils/ErrorHandler";
import {
  VCheckPhonePeStatus,
  VPayToPackage,
} from "../validator/payment.validator";
import { CustomRequest } from "../types";
import { pool } from "../config/db";
import { generatePlaceholders } from "../utils/generatePlaceholders";
import { encrypt } from "../utils/crypto";
import { phonePe } from "../config/phonePe";
import { sendBookingConfirmationEmail } from "../services/sendBookingConfirmationEmail";

export const createPhonepeOrder = asyncErrorHandler(
  async (req: CustomRequest, res) => {
    const { error, value } = VPayToPackage.validate(req.body || {});
    if (error) throw new ErrorHandler(400, error.message);

    if (
      value.number_of_people > 1 &&
      value?.participant_info?.length != value.number_of_people - 1
    )
      throw new ErrorHandler(
        400,
        `Number of people is ${value.number_of_people} and you are not providing proper "Participant Info"`
      );

    const merchant_order_id = uuidv4();
    const currentUserId = req.user_info?.id;
    const currentPackageId = value.package_id;

    const client = await pool.connect();

    let finalPrice = 0;

    try {
      await client.query("BEGIN");
      //get the amount of package with the current packageId
      const { rowCount, rows } = await client.query(
        "SELECT offer_price_inr as package_amount_to_pay FROM packages WHERE id = $1",
        [currentPackageId]
      );

      if (rowCount === 0)
        throw new ErrorHandler(400, "Unable find package price");

      //calclute package price * number of people
      finalPrice =
        parseFloat(rows[0].package_amount_to_pay) * value.number_of_people;

      //if addon added than get the price
      if (value.addon_ids && value.addon_ids.length !== 0) {
        const { rowCount, rows } = await client.query(
          `SELECT SUM(price_inr) total FROM additional WHERE additional_id IN (${value.addon_ids.join(
            ","
          )})`
        );

        if (rowCount === 0)
          throw new ErrorHandler(400, "Unable to find addon price");

        // add addon price with final price
        finalPrice += parseFloat(rows[0].total);
      }

      //now add the gst
      finalPrice += finalPrice * (5 / 100);

      // store the body data to database to use it later
      await client.query(
        "INSERT INTO temp_create_order_info (merchant_order_id, info) VALUES ($1, $2)",
        [
          merchant_order_id,
          JSON.stringify({ user_id: currentUserId, ...value }),
        ]
      );

      await client.query("COMMIT");
    } catch (error: any) {
      await client.query("ROLLBACK");
      throw new ErrorHandler(400, error.message);
    } finally {
      client.release();
    }

    if (finalPrice === 0)
      throw new ErrorHandler(400, "Amount must be gretter than 0");

    const { success, data } = await phonePe().createOrder({
      merchantUserId: value.full_name,
      mobileNumber: value.contact_number,
      amount: finalPrice * 100,
      merchantTransactionId: merchant_order_id,
      redirectUrl: `${process.env.API_HOST_URL}/api/v1/payment/phonepe/status?merchant_order_id=${merchant_order_id}`,
      redirectMode: "POST",
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    });

    if (!success) {
      throw new ErrorHandler(400, "Unable to create order");
    }

    res
      .status(201)
      .json(
        new ApiResponse(
          201,
          "Order successfully created",
          data.instrumentResponse.redirectInfo.url
        )
      );
  }
);

export const checkPhonepePaymentStatus = asyncErrorHandler(async (req, res) => {
  const { error, value } = VCheckPhonePeStatus.validate(req.query);
  if (error) throw new ErrorHandler(400, error.message);

  const merchantOrderId = value.merchant_order_id;

  const paymentInfo = await phonePe().checkStatus(merchantOrderId);
  if (!paymentInfo.success) throw new ErrorHandler(400, paymentInfo.message);

  const orderId = paymentInfo.data.orderId;

  const formattedDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const { rows, rowCount } = await client.query(
      "SELECT * FROM temp_create_order_info WHERE merchant_order_id = $1",
      [merchantOrderId]
    );

    if (rowCount === 0) throw new ErrorHandler(404, "No order found");
    const orderInfo = JSON.parse(rows[0].info);

    const currentPackageId = orderInfo.package_id;
    const currentUserId = orderInfo.user_id;

    // i wll update the basic info of users in the database first
    const { rowCount: userRowCount } = await client.query(
      "UPDATE users SET user_name = $1, user_email = $2, user_contact_number = $3, address = $4 WHERE user_id = $5 AND is_verified = 1",
      [
        orderInfo.full_name,
        orderInfo.email,
        orderInfo.contact_number,
        orderInfo?.address,
        currentUserId,
      ]
    );

    if (userRowCount === 0) throw new ErrorHandler(404, "User not found");

    // then if any Participants Info there create a new entry in users table with a default password
    let enrollmentData: any[] = [];
    let createEnrolledItemPlaceholder = null;
    const ENROLLMENT_COLUMNS = 5;
    if (orderInfo.participant_info && orderInfo.participant_info.length !== 0) {
      const createUserPlaceholder = generatePlaceholders(
        orderInfo.participant_info.length,
        4
      );
      const encryptPassword = encrypt("123456");
      const { rowCount, rows } = await client.query(
        `INSERT INTO users (user_name, user_email, user_contact_number, user_password) VALUES ${createUserPlaceholder} 
         ON CONFLICT (user_email, account_type) DO UPDATE SET user_name = EXCLUDED.user_name
         RETURNING user_id
         `,
        orderInfo.participant_info.flatMap((item: any) => [
          item.full_name,
          item.email,
          item.contact_number,
          encryptPassword,
        ])
      );

      // after creating participant add them to enrolled_package with the payment owner (he is the current user who is enrolling)
      createEnrolledItemPlaceholder = generatePlaceholders(
        (rowCount || rows.length) + 1,
        ENROLLMENT_COLUMNS
      );
      enrollmentData = rows.flatMap((item) => [
        orderId,
        item.user_id,
        currentPackageId,
        1,
        orderInfo.group_type,
      ]); // 1 mean as-participants;

      enrollmentData.push(
        orderId,
        currentUserId,
        currentPackageId,
        2,
        orderInfo.group_type
      ); // 2 mean as-owner
    } else {
      createEnrolledItemPlaceholder = generatePlaceholders(
        1,
        ENROLLMENT_COLUMNS
      );
      enrollmentData.push(
        orderId,
        currentUserId,
        currentPackageId,
        2,
        orderInfo.group_type
      ); // 2 mean as-owner
    }

    await client.query(
      `INSERT INTO enrolled_package (order_id, user_id, package_id, as_type, trip_type) VALUES ${createEnrolledItemPlaceholder}`,
      enrollmentData
    );

    if (orderInfo.addon_ids && orderInfo.addon_ids.length !== 0) {
      const createAddonPlaceholder = generatePlaceholders(
        orderInfo.addon_ids.length,
        2
      );
      await client.query(
        `INSERT INTO order_id_and_additional (order_id, additional_id) VALUES ${createAddonPlaceholder}`,
        orderInfo.addon_ids.flatMap((item: number) => [orderId, item])
      );
    }

    // store departure date id date info if exict
    if (orderInfo?.departure_date_id) {
      await client.query(
        "INSERT INTO order_id_and_date (order_id, departure_date_id) VALUES ($1, $2)",
        [orderId, orderInfo.departure_date_id]
      );

      await client.query(
        "UPDATE packages_departure_date SET max_seats = max_seats - 1 WHERE id = $1",
        [orderInfo.departure_date_id]
      );
    }

    // now if check custom from date and to date has choosed or not if yes store them
    if (orderInfo?.from_date && orderInfo?.to_date) {
      await client.query(
        "INSERT INTO order_id_and_date (order_id, from_date, to_date) VALUES ($1, $2, $3)",
        [orderId, orderInfo.from_date, orderInfo.to_date]
      );
    }

    await client.query(
      "INSERT INTO payments (order_id, transactionId, amount, state, paymentInstrument) VALUES ($1, $2, $3, $4, $5)",
      [
        paymentInfo.data.orderId,
        paymentInfo.data.transactionId,
        paymentInfo.data.amount / 100,
        paymentInfo.data.state,
        paymentInfo.data.paymentInstrument,
      ]
    );

    await client.query(
      "DELETE FROM temp_create_order_info WHERE merchant_order_id = $1",
      [merchantOrderId]
    );

    await client.query("COMMIT");

    sendBookingConfirmationEmail(orderInfo, paymentInfo);

    res.render("payment-success.ejs", {
      orderId: orderId,
      paidAmount: `₹${paymentInfo.data.amount / 100}`,
      purchaseDate: formattedDate,
      frontendPageLink: `${process.env.FRONTEND_HOST_URL}/account`,
    });
  } catch (error: any) {
    await client.query("ROLLBACK");

    if (error?.statusCode === 404) {
      res.redirect(`${process.env.FRONTEND_HOST_URL}/account`);
    } else {
      res.render("payment-failed.ejs", {
        failedAmount: `₹${paymentInfo.data.amount / 100}`,
        purchaseDate: formattedDate,
      });
    }
  } finally {
    client.release();
  }
});
