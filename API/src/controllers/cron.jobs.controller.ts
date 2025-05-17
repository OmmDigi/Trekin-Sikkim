import { pool } from "../config/db";
import asyncErrorHandler from "../middlewares/asyncErrorHandler";
import { ApiResponse } from "../utils/ApiResponse";
import { ErrorHandler } from "../utils/ErrorHandler";

export const removeTempUnusedOrderInfo = asyncErrorHandler(async (req, res) => {
  const password = req.body.password;
  if (!password) throw new ErrorHandler(400, "Unable to access");
  if (password !== process.env.CRON_JOB_RUNNER_PASSWORD)
    throw new ErrorHandler(400, "Unable to access");

  await pool.query(
    "DELETE FROM temp_create_order_info WHERE CURRENT_TIMESTAMP - created_at > interval '20 minutes'"
  );

  res.status(200).json(new ApiResponse(200, "Remove Unused Order Info"));
});
