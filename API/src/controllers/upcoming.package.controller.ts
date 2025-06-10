import { pool } from "../config/db";
import asyncErrorHandler from "../middlewares/asyncErrorHandler";
import { ApiResponse } from "../utils/ApiResponse";
import { ErrorHandler } from "../utils/ErrorHandler";
import { generatePlaceholders } from "../utils/generatePlaceholders";
import { VSinglePackageInfo } from "../validator/package.validator";
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

         LEFT JOIN category_and_packages cp
         ON cp.package_id = p.id

         LEFT JOIN category c
         ON c.category_id = cp.category_id

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

  await pool.query(
    `INSERT INTO upcoming_treks (package_id) VALUES ${generatePlaceholders(
      value.length,
      1
    )}
     ON CONFLICT (package_id) DO NOTHING
    `,
    value.flatMap((item) => [item])
  );

  res.status(201).json(new ApiResponse(200, "Upcomming packages are added"));
});

export const deletePackageFromUpcomming = asyncErrorHandler(
  async (req, res) => {
    const { error, value } = VSinglePackageInfo.validate(req.params);
    if (error) throw new ErrorHandler(404, error.message);

    await pool.query("DELETE FROM upcoming_treks WHERE package_id = $1", [
      value.package_id,
    ]);

    res
      .status(200)
      .json(
        new ApiResponse(200, "Package has removed form upcoming packages list")
      );
  }
);
