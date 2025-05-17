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

    const { rows: dateInfo } = await pool.query(
      "SELECT from_date, to_date FROM packages_departure_date"
    );

    sendEmail(orderInfo.email, "booking-confirmation", {
      packageName: rows[0].package_name,
      customerName: orderInfo.full_name,
      totalParticipants: orderInfo.number_of_people,
      amountPaid: paymentInfo.data.amount / 100,
      orderId: paymentInfo.data.merchantTransactionId,
      transactionId: paymentInfo.data.transactionId,
      groupType: orderInfo.group_type,
      tripDate: `${formatDateToReadable(
        dateInfo[0].from_date
      )} - ${formatDateToReadable(dateInfo[0].to_date)}`,
    });

    await client.query("COMMIT");
    client.release();
  } catch (error) {
    await client.query("ROLLBACK");
    client.release();
    console.log(error);
  }
};
