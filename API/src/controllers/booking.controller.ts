import { pool } from "../config/db";
import asyncErrorHandler from "../middlewares/asyncErrorHandler";
import { CustomRequest } from "../types";
import { ApiResponse } from "../utils/ApiResponse";
import { ErrorHandler } from "../utils/ErrorHandler";
import { parsePagination } from "../utils/parsePagination";
import {
  VBookingData,
  VGetBookingListFilter,
} from "../validator/booking.validator";

export const getBookingData = asyncErrorHandler(
  async (req: CustomRequest, res) => {
    const { error, value } = VBookingData.validate(req.query);
    if (error) throw new ErrorHandler(400, error.message);

    const userId = req.user_info?.id;

    const additionalIds = value.additional_id
      ? value.additional_ids.split(",")
      : [];
    const purifyAdditionalIds: number[] = [];

    additionalIds.forEach((id: string) => {
      const parsedId = parseInt(id);
      if (!isNaN(parsedId)) {
        purifyAdditionalIds.push(parsedId);
      }
    });

    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      const { rows } = await client.query(
        `
        SELECT
          u.user_name,
          u.user_email,
          u.user_contact_number,
          u.address,
          u.dial_code
        FROM users u

        WHERE u.user_id = $1
    `,
        [userId]
      );

      const { rows: packages } = await client.query(
        `
          SELECT
           id as package_id,
           package_name,
           original_price_inr,
           offer_price_inr,
           offer_price_usd,
           original_price_usd
          FROM packages

          WHERE id = $1
        `,
        [value.package_id]
      );

      const { rows: dates } = await client.query(
        `
          SELECT
           from_date,
           to_date
          FROM packages_departure_date

          WHERE id = $1
        `,
        [value.date_id]
      );

      const additional: any[] = [];
      if (purifyAdditionalIds.length !== 0) {
        const { rows } = await client.query(
          `
          SELECT
            SUM(price_inr) total_addon_price_inr,
            SUM(price_usd) total_addon_price_usd
          FROM additional
          WHERE additional_id IN (${purifyAdditionalIds.join(",")})
        `
        );

        additional.push(...rows);
      }

      res.status(200).json(
        new ApiResponse(200, "", {
          userInfo: rows[0],
          packageInfo: packages[0],
          datesInfo: dates[0],
          additionalInfo: additional[0],
        })
      );

      await client.query("COMMIT");
      client.release();
    } catch (error: any) {
      await client.query("ROLLBACK");
      client.release();
      throw new ErrorHandler(400, error.message);
    }
  }
);

//get single booking info in user account on view booking details click
export const getBookings = asyncErrorHandler(async (req : CustomRequest, res) => {
  const { error, value } = VGetBookingListFilter.validate(req.query);
  if (error) throw new ErrorHandler(400, error.message);

  let filter = "WHERE ep.as_type = 2 ";
  const filterValue: string[] = [];
  let placeHolderNumber = 1;
  if (value.phone_number) {
    filter += `AND u.user_contact_number = $${placeHolderNumber}`;
    filterValue.push(value.phone_number);
    placeHolderNumber++;
  } else if (value.name) {
    filter += `AND u.user_name ILIKE '%' || $${placeHolderNumber} || '%'`;
    filterValue.push(value.name);
    placeHolderNumber++;
  } else if (value.email) {
    filter += `AND u.user_email = $${placeHolderNumber}`;
    filterValue.push(value.email);
    placeHolderNumber++;
  } else if (value.order_id) {
    filter += `AND ep.order_id = $${placeHolderNumber}`;
    filterValue.push(value.order_id);
    placeHolderNumber++;
  } else if (value.transition_id) {
    filter += `AND pay.transactionId = $${placeHolderNumber}`;
    filterValue.push(value.transition_id);
    placeHolderNumber++;
  } else if (value.package_id) {
    filter += `AND p.id = $${placeHolderNumber}`;
    filterValue.push(value.package_id);
    placeHolderNumber++;
  }

  if(value.from === "account" && req.user_info?.id) {
    filter += ` AND u.user_id = $${placeHolderNumber}`;
    filterValue.push(req.user_info.id.toString());
    placeHolderNumber++;
  }


  const { LIMIT, OFFSET } = parsePagination(req);

  const { rows } = await pool.query(
    `
    
    WITH addition_info AS (
        SELECT
          oia.order_id,
          a.*
        FROM order_id_and_additional oia

        LEFT JOIN additional a
        ON a.additional_id = oia.additional_id
      ),

      booking_dates AS (
        SELECT
          oid.order_id,
          COALESCE(pdd.from_date, oid.from_date) AS from_date,
          COALESCE(pdd.to_date, oid.to_date) AS to_date
        FROM order_id_and_date oid

        LEFT JOIN packages_departure_date pdd
        ON pdd.id = oid.departure_date_id
      ),

      participant_info AS (
        SELECT
          ep.order_id,
          u.user_name AS participant_name,
          u.user_email AS participant_email,
          u.user_contact_number AS participant_number
        FROM enrolled_package ep

        LEFT JOIN users u
        ON u.user_id = ep.user_id

        WHERE ep.as_type = 1
      )

      SELECT
        ep.order_id,
        ep.trip_type,
        u.user_name,
        u.user_contact_number,
        u.user_email,
        p.package_name,
        pay.amount,
        pay.transactionId,
        (SELECT COUNT(user_id) FROM enrolled_package WHERE order_id = ep.order_id) AS number_of_person,
        (SELECT JSON_AGG(ai) FROM addition_info ai WHERE ai.order_id = ep.order_id) AS additional_information,
        (SELECT JSON_AGG(bd) FROM booking_dates bd WHERE bd.order_id = ep.order_id) AS booking_dates,
        (SELECT JSON_AGG(pi) FROM participant_info pi WHERE pi.order_id = ep.order_id) AS participant_info
      FROM enrolled_package ep

      LEFT JOIN users u
      ON u.user_id = ep.user_id

      LEFT JOIN packages p
      ON p.id = ep.package_id

      LEFT JOIN payments pay
      ON pay.order_id = ep.order_id

      ${filter}

      ORDER BY ep.created_at DESC

      LIMIT ${LIMIT} OFFSET ${OFFSET}
    
  `,
    filterValue
  );

  res.status(200).json(new ApiResponse(200, "Booking List", rows));
});
