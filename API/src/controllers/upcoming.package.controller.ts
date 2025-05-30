import { pool } from "../config/db";
import asyncErrorHandler from "../middlewares/asyncErrorHandler";
import { ApiResponse } from "../utils/ApiResponse";
import { ErrorHandler } from "../utils/ErrorHandler";
import { generatePlaceholders } from "../utils/generatePlaceholders";
import { VModifyUpcomingPackage } from "../validator/upcoming.validator";

export const getUpcomingPackageList = asyncErrorHandler(async (req, res) => {
  const { rows } = await pool.query(
    `
         SELECT
           p.id,
           p.package_name,
           c.slug AS category_slug,
           p.slug AS package_slug,
           mi.item_link AS thumbnail,
           p.duration,
           p.short_description,
           p.highest_altitude,
           mi.alt_tag
         FROM upcoming_treks ut

         LEFT JOIN packages p
         ON p.id = ut.package_id

         LEFT JOIN category c
         ON c.category_id = p.category_id

        LEFT JOIN LATERAL (
            SELECT pam.*
            FROM package_and_media pam
            WHERE pam.package_id = p.id
                AND pam.where_to_use = 'thumbnail'
            ORDER BY pam.id
            LIMIT 1
        ) pam ON true

         LEFT JOIN media_item mi
         ON mi.media_item_id = pam.media_item_id
        `
  );

  res.status(200).json(new ApiResponse(200, "", rows));
});

export const getPackageChooseList = asyncErrorHandler(async (req, res) => {
  const { rows } = await pool.query(
    `
         SELECT
           p.id as package_id,
           p.package_name,
           c.category_name,
           mi.item_link,
           CASE 
             WHEN ut.id IS NOT NULL THEN true
             ELSE false 
            END AS is_selected
         FROM packages p

         LEFT JOIN category c
         ON c.category_id = p.category_id

        LEFT JOIN LATERAL (
            SELECT pam.*
            FROM package_and_media pam
            WHERE pam.package_id = p.id
                AND pam.where_to_use = 'thumbnail'
            ORDER BY pam.id
            LIMIT 1
        ) pam ON true

         LEFT JOIN media_item mi
         ON mi.media_item_id = pam.media_item_id

         LEFT JOIN upcoming_treks ut
         ON ut.package_id = p.id
        `
  );

  res.status(200).json(new ApiResponse(200, "", rows));
});

export const modifyUpcomingPackage = asyncErrorHandler(async (req, res) => {
  const { error, value } = VModifyUpcomingPackage.validate(req.body);
  if (error) throw new ErrorHandler(400, error.message);

  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    await client.query("DELETE FROM upcoming_treks");

    if (value.length !== 0) {
      await client.query(
        `INSERT INTO upcoming_treks (package_id) VALUES ${generatePlaceholders(
          value.length,
          1
        )}`,
        value.flatMap((item) => [item])
      );
    }

    await client.query("COMMIT");

    res.status(200).json(new ApiResponse(200, "Successfully completed"));
  } catch (error: any) {
    await client.query("ROLLBACK");
    throw new ErrorHandler(400, error.message);
  } finally {
    client.release();
  }
});
