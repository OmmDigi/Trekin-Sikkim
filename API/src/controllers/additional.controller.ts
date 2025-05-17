import { pool } from "../config/db";
import asyncErrorHandler from "../middlewares/asyncErrorHandler";
import { ApiResponse } from "../utils/ApiResponse";
import { ErrorHandler } from "../utils/ErrorHandler";
import { parsePagination } from "../utils/parsePagination";
import {
  VAdditional,
  VDeleteAdditional,
  VUpdateAdditional,
} from "../validator/additional.validator";

export const getAllAdditionals = asyncErrorHandler(async (req, res) => {
  const { LIMIT, OFFSET } = parsePagination(req);
  const { rows } = await pool.query(
    `SELECT * FROM additional LIMIT ${LIMIT} OFFSET ${OFFSET};`
  );
  res.status(200).json(new ApiResponse(200, "Additionals", rows));
});

export const getSingleAdditional = asyncErrorHandler(async (req, res) => {
  const { error, value } = VDeleteAdditional.validate(req.params);
  if (error)
    throw new ErrorHandler(400, error.message, error.details[0].context?.key);

  const { rowCount, rows } = await pool.query(
    "SELECT * FROM additional WHERE additional_id = $1",
    [value.additional_id]
  );

  if (rowCount === 0)
    throw new ErrorHandler(400, "No additional avilable with this id");

  res.status(200).json(new ApiResponse(200, "", rows[0]));
});

export const addNewAdditional = asyncErrorHandler(async (req, res) => {
  const { error, value } = VAdditional.validate(req.body);
  if (error)
    throw new ErrorHandler(400, error.message, error.details[0].context?.key);

  await pool.query(
    `INSERT INTO additional (additional_name, price_inr, price_usd) VALUES ($1, $2, $3)`,
    [value.additional_name, value.price_inr, value.price_usd]
  );

  res.status(201).json(new ApiResponse(201, "Additional Info Added"));
});

export const updateAdditional = asyncErrorHandler(async (req, res) => {
  const { error, value } = VUpdateAdditional.validate({
    ...req.body,
    ...req.params,
  });
  if (error)
    throw new ErrorHandler(400, error.message, error.details[0].context?.key);

  await pool.query(
    `UPDATE additional SET additional_name = $1, price_inr = $2, price_usd = $3 WHERE additional_id = $4`,
    [
      value.additional_name,
      value.price_inr,
      value.price_usd,
      value.additional_id,
    ]
  );

  res.status(200).json(new ApiResponse(200, "Additional Info Updated"));
});

export const deleteAdditional = asyncErrorHandler(async (req, res) => {
  const { error, value } = VDeleteAdditional.validate(req.params);
  if (error)
    throw new ErrorHandler(400, error.message, error.details[0].context?.key);

  await pool.query("DELETE FROM additional WHERE additional_id = $1", [
    value.additional_id,
  ]);

  res.status(200).json(new ApiResponse(200, "Category has been deleted"));
});
