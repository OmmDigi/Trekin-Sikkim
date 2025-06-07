import { pool } from "../config/db";
import { PaymentResponse } from "../types";
import { formatDateToReadable } from "../utils/formatDateToReadable";
import { sendEmail } from "../utils/sendEmail";

export const sendBookingConfirmationEmail = async (
  orderInfo: any,
  paymentInfo: PaymentResponse
) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const { rows } = await pool.query(
      "SELECT package_name FROM packages WHERE id = $1",
      [orderInfo.package_id]
    );

    const dateInfo: {
      from_date: string | null;
      to_date: string | null;
    } = {
      from_date: null,
      to_date: null,
    };

    if (orderInfo?.departure_date_id) {
      const { rows, rowCount } = await pool.query(
        "SELECT from_date, to_date FROM packages_departure_date WHERE departure_date_id = $1",
        [orderInfo.departure_date_id]
      );
      if (rowCount !== 0) {
        dateInfo.from_date = rows[0].from_date;
        dateInfo.to_date = rows[0].to_date;
      }
    } else if (orderInfo?.from_date && orderInfo?.to_date) {
      dateInfo.from_date = orderInfo?.from_date;
      dateInfo.to_date = orderInfo?.to_date;
    }

    sendEmail(orderInfo.email, "booking-confirmation", {
      packageName: rows[0].package_name,
      customerName: orderInfo.full_name,
      totalParticipants: orderInfo.number_of_people,
      amountPaid: paymentInfo.data.amount / 100,
      orderId: paymentInfo.data.merchantTransactionId,
      transactionId: paymentInfo.data.transactionId,
      groupType: orderInfo.group_type,
      tripDate: `${formatDateToReadable(
        dateInfo.from_date || ""
      )} - ${formatDateToReadable(dateInfo.to_date || "")}`,
    });

    await client.query("COMMIT");
    client.release();
  } catch (error) {
    await client.query("ROLLBACK");
    client.release();
    console.log(error);
  }
};
