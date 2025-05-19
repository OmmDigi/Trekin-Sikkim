// add basic info

import { pool } from "../config/db";
import asyncErrorHandler from "../middlewares/asyncErrorHandler";
import { CustomRequest } from "../types";
import { ApiResponse } from "../utils/ApiResponse";
import { createSlug } from "../utils/createSlug";
import { ErrorHandler } from "../utils/ErrorHandler";
import { filterToSql } from "../utils/filterToSql";
import { generatePlaceholders } from "../utils/generatePlaceholders";
import {
  objectToSqlConverterUpdate,
  objectToSqlInsert,
} from "../utils/objectToSql";
import { parsePagination } from "../utils/parsePagination";
import {
  VAddPackageBasicInfo,
  VAddPackageFaq,
  VAddPackageGallery,
  VAddPackageItinerary,
  VCreateDepartureDate,
  VDepartureFilter,
  VGetPackageList,
  VGetSinglePackagePageInfo,
  VPackageAndOther,
  VPackageAndSeo,
  VPackageOverview,
  VSingle,
  VSinglePackageInfo,
  VUpdateDepartureDate,
  VUpdatePackageAndOther,
  VUpdatePackageBasicInfo,
  VUpdatePackageFaq,
  VUpdatePackageGallery,
  VUpdatePackageItinerary,
} from "../validator/package.validator";

export const getSinglePackagePage = asyncErrorHandler(async (req, res) => {
  const { error, value } = VGetSinglePackagePageInfo.validate(req.params);
  if (error) throw new ErrorHandler(400, error.message);

  const { rows } = await pool.query(
    `
      SELECT
       p.*,
       pseo.meta_title,
       pseo.meta_description,
       pseo.meta_keywords,
       pseo.canonical,
       COALESCE(JSON_AGG(DISTINCT to_jsonb(a)) FILTER (WHERE a.additional_id IS NOT NULL), '[]') AS additional,
       COALESCE(JSON_AGG(DISTINCT to_jsonb(mi)) FILTER (WHERE mi.media_item_id IS NOT NULL), '[]') AS banner_info,
       COALESCE(JSON_AGG(DISTINCT JSONB_BUILD_OBJECT(
        'id', po.id,
        'option_name', po.option_name
       )) FILTER (WHERE po.id IS NOT NULL), '[]') AS other_option_names
      FROM packages p

      LEFT JOIN package_and_additional paa
      ON p.id = paa.package_id

      LEFT JOIN additional a
      ON a.additional_id = paa.additional_id

      LEFT JOIN package_and_media pm
      ON pm.package_id = p.id AND pm.where_to_use = 'banner'

      LEFT JOIN media_item mi
      ON mi.media_item_id = pm.media_item_id

      LEFT JOIN package_and_other po
      ON po.package_id = p.id

      LEFT JOIN package_and_seo pseo
      ON pseo.package_id = p.id

      WHERE p.slug = $1

      GROUP BY p.id, pseo.meta_title, pseo.meta_description, pseo.meta_keywords, pseo.canonical
    `,
    [value.package_slug]
  );

  res.status(200).json(new ApiResponse(200, "Pacakge Page Info", rows[0]));
});

export const getPackageList = asyncErrorHandler(
  async (req: CustomRequest, res) => {
    const { error, value } = VGetPackageList.validate(req.query);
    if (error) throw new ErrorHandler(400, error.message);

    const isAdmin = req.user_info?.role === "Admin";

    let filters = "";
    const filterValues: string[] = [];
    let placeholdernum = 1;

    if (!isAdmin) {
      filters = "WHERE pkg.is_active = 1";
    }

    if (value.category_slug) {
      if (filters === "") {
        filters = `WHERE c.slug = $${placeholdernum}`;
      } else {
        filters += ` AND c.slug = $${placeholdernum}`;
      }
      filterValues.push(value.category_slug);
      placeholdernum++;
    }

    if (value.category_type) {
      if (filters === "") {
        filters = `WHERE c.type_id = $${placeholdernum}`;
      } else {
        filters += ` AND c.type_id = $${placeholdernum}`;
      }
      filterValues.push(value.category_type);
      placeholdernum++;
    }

    const { rows: countRows } = await pool.query(
      `
          SELECT 
            COUNT(pkg.id) AS total_package
          FROM packages pkg

          LEFT JOIN LATERAL (
            SELECT pam.*
            FROM package_and_media pam
            WHERE pam.package_id = pkg.id
              AND pam.where_to_use = 'banner'
            ORDER BY pam.id
            LIMIT 1
          ) pam ON true

          LEFT JOIN media_item mi
          ON mi.media_item_id = pam.media_item_id AND mi.media_type = 'image'

          LEFT JOIN category c
          ON c.category_id = pkg.category_id

        ${filters}
       `,
      filterValues
    );

    const totalPackages = countRows[0].total_package;

    const { LIMIT, OFFSET } = parsePagination(req);

    const TOTAL_PAGE = Math.ceil(totalPackages / LIMIT);

    const { rows } = await pool.query(
      `
      SELECT 
      pkg.id, 
      pkg.package_name, 
      pkg.duration, 
      pkg.short_description,
      mi.item_link AS thumbnail,
      mi.alt_tag,
      pkg.highest_altitude,
      pkg.slug AS package_slug,
      c.slug AS category_slug
    FROM packages pkg

    LEFT JOIN LATERAL (
      SELECT pam.*
      FROM package_and_media pam
      WHERE pam.package_id = pkg.id
        AND pam.where_to_use = 'banner'
      ORDER BY pam.id
      LIMIT 1
    ) pam ON true

    LEFT JOIN media_item mi
    ON mi.media_item_id = pam.media_item_id AND mi.media_type = 'image'

    LEFT JOIN category c
    ON c.category_id = pkg.category_id

    ${filters}

    LIMIT ${LIMIT} OFFSET ${OFFSET}`,
      filterValues
    );
    res
      .status(200)
      .json(
        new ApiResponse(200, "All Package List", rows, undefined, TOTAL_PAGE)
      );
  }
);

export const deletePackage = asyncErrorHandler(async (req, res) => {
  const { error, value } = VSinglePackageInfo.validate(req.params);
  if (error) throw new ErrorHandler(400, error.message);

  await pool.query("DELETE FROM packages WHERE id = $1", [value.package_id]);

  res.status(200).json(new ApiResponse(200, "Package Has Removed"));
});

// package basic info crm
export const getSinglePackageBasicInfo = asyncErrorHandler(async (req, res) => {
  const { error, value } = VSinglePackageInfo.validate(req.params || {});
  if (error)
    throw new ErrorHandler(400, error.message, error.details[0].context?.key);

  const { rows, rowCount } = await pool.query(
    `
     SELECT 
      pkg.*,
      COALESCE(JSON_AGG(paa) FILTER (WHERE paa.id IS NOT NULL), '[]'::json) as additionals
     FROM packages pkg

     LEFT JOIN package_and_additional paa
     ON paa.package_id = pkg.id

     WHERE pkg.id = $1
     
     GROUP BY pkg.id

     `,
    [value.package_id]
  );
  if (rowCount === 0)
    throw new ErrorHandler(400, "No package info has found with this id");
  return res
    .status(200)
    .json(new ApiResponse(400, `Single package Info`, rows[0]));
});

export const updateSinglePackageBasicInfo = asyncErrorHandler(
  async (req, res) => {
    const { error, value } = VUpdatePackageBasicInfo.validate({
      ...req.params,
      ...req.body,
    });
    if (error)
      throw new ErrorHandler(400, error.message, error.details[0].context?.key);

    const packageSlug = createSlug(value.package_name);

    const additionals = value.additionals as number[];
    delete value.additionals;
    const packageID = value.package_id;
    delete value.package_id;

    const { keys, values, paramsNum } = objectToSqlConverterUpdate({
      ...value,
      slug: packageSlug,
    });
    values.push(packageID);

    const placeholdernum = generatePlaceholders(additionals.length, 2);

    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      await client.query(
        `UPDATE packages SET ${keys} WHERE id = $${paramsNum}`,
        values
      );

      if (additionals.length !== 0) {
        await client.query(
          "DELETE FROM package_and_additional WHERE package_id = $1",
          [packageID]
        );

        await client.query(
          `INSERT INTO package_and_additional (package_id, additional_id) VALUES ${placeholdernum}
         ON CONFLICT (package_id, additional_id) DO NOTHING
        `,
          additionals.flatMap((additional_id) => [packageID, additional_id])
        );
      }

      await client.query("COMMIT");

      res
        .status(200)
        .json(new ApiResponse(200, `Package Has Updated`, packageID));
    } catch (error: any) {
      await client.query("ROLLBACK");
      throw new ErrorHandler(400, error.message);
    } finally {
      client.release();
    }
  }
);

export const addPackageBasicInfo = asyncErrorHandler(async (req, res) => {
  const { error, value } = VAddPackageBasicInfo.validate(req.body || {});
  if (error)
    throw new ErrorHandler(400, error.message, error.details[0].context?.key);

  const additionals = value.additionals as number[];
  delete value.additionals;

  const packageSlug = createSlug(value.package_name);

  const { columns, params, values } = objectToSqlInsert({
    ...value,
    slug: packageSlug,
  });

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const { rows } = await client.query(
      `INSERT INTO packages ${columns} VALUES ${params} RETURNING id`,
      values
    );

    if (additionals.length !== 0) {
      const placeholdernum = generatePlaceholders(additionals.length, 2);

      await client.query(
        "DELETE FROM package_and_additional WHERE package_id = $1",
        [rows[0].id]
      );

      await client.query(
        `INSERT INTO package_and_additional (package_id, additional_id) VALUES ${placeholdernum}`,
        additionals.flatMap((additional_id) => [rows[0].id, additional_id])
      );
    }

    await client.query("COMMIT");
    client.release();

    res
      .status(201)
      .json(
        new ApiResponse(
          201,
          `Package Basic Info Has Successfully Created`,
          rows[0].id
        )
      );
  } catch (error: any) {
    await client.query("ROLLBACK");
    client.release();
    throw new ErrorHandler(400, error.message);
  }
});

// Departure Date
export const getSingleDepartureDate = asyncErrorHandler(async (req, res) => {
  const { error, value } = VSingle.validate(req.params);
  if (error)
    throw new ErrorHandler(400, error.message, error.details[0].context?.key);

  const { rows, rowCount } = await pool.query(
    "SELECT *, TO_CHAR(from_date, 'yyyy-mm-dd') as from_date, TO_CHAR(to_date, 'yyyy-mm-dd') as to_date FROM packages_departure_date WHERE id = $1",
    [value.id]
  );
  if (rowCount === 0)
    throw new ErrorHandler(400, "No Departure Date Found With This ID");

  res.status(200).json(new ApiResponse(200, "Single Departure Date", rows[0]));
});

export const getDepartureDates = asyncErrorHandler(async (req, res) => {
  const { error, value } = VSinglePackageInfo.validate(req.params || {});
  if (error)
    throw new ErrorHandler(400, error.message, error.details[0].context?.key);

  const { error: filterError, value: filterValue } = VDepartureFilter.validate(
    req.query
  );
  if (filterError) throw new ErrorHandler(400, filterError.message);

  let filterQuery = "WHERE package_id = $1";
  const filterValuesList: string[] = [value.package_id];
  let placeholdernum = 2;

  if (filterValue.for_month) {
    filterQuery += ` AND for_month = $${placeholdernum}`;
    filterValuesList.push(filterValue.for_month);
    placeholdernum++;
  }

  if (filterValue.max_seats_is_not_zero) {
    filterQuery += ` AND max_seats > 0`;
  }

  if (filterQuery === "WHERE") {
    filterQuery = "";
  }

  const { rows } = await pool.query(
    `
      SELECT 
        * 
      FROM 
      packages_departure_date
      ${filterQuery}
      ORDER BY from_date ASC
      `,
    filterValuesList
  );

  res
    .status(200)
    .json(new ApiResponse(200, "Departure Date Of A Package", rows));
});

export const createDepartureDate = asyncErrorHandler(async (req, res) => {
  const { error } = VCreateDepartureDate.validate(req.body || {});
  if (error)
    throw new ErrorHandler(400, error.message, error.details[0].context?.key);

  const { columns, params, values } = objectToSqlInsert(req.body);

  await pool.query(
    `INSERT INTO packages_departure_date ${columns} VALUES ${params}`,
    values
  );

  res
    .status(201)
    .json(new ApiResponse(201, `Package Departure Date Successfully Created`));
});

export const updateDepartureDateInfo = asyncErrorHandler(async (req, res) => {
  const { error, value } = VUpdateDepartureDate.validate({
    ...req.params,
    ...req.body,
  });
  if (error)
    throw new ErrorHandler(400, error.message, error.details[0].context?.key);

  const { keys, paramsNum, values } = objectToSqlConverterUpdate(req.body);
  values.push(value.id);

  await pool.query(
    `UPDATE packages_departure_date SET ${keys} WHERE id = $${paramsNum}`,
    values
  );

  res.status(200).json(new ApiResponse(200, "Departure Date Has Updated"));
});

export const deleteDepartureDate = asyncErrorHandler(async (req, res) => {
  const { error, value } = VSingle.validate(req.params);
  if (error)
    throw new ErrorHandler(400, error.message, error.details[0].context?.key);

  await pool.query("DELETE FROM packages_departure_date WHERE id = $1", [
    value.id,
  ]);

  res.status(200).json(new ApiResponse(200, "Departure Date Has Removed"));
});

// package gallery
export const addPackageGallery = asyncErrorHandler(async (req, res) => {
  const { error, value } = VAddPackageGallery.validate({
    ...req.params,
    ...req.body,
  });
  if (error)
    throw new ErrorHandler(400, error.message, error.details[0].context?.key);

  const placeholders = generatePlaceholders(value.media_info.length, 3);

  await pool.query(
    `
      INSERT INTO package_and_media 
        (package_id, media_item_id, where_to_use) 
      VALUES 
        ${placeholders}
      ON CONFLICT (media_item_id, package_id)
      DO UPDATE SET 
         where_to_use = EXCLUDED.where_to_use
      `,
    value.media_info.flatMap((item: any) => [
      value.package_id,
      item.media_id,
      item.where_to_use,
    ])
  );

  res.status(201).json(new ApiResponse(201, "Gallery Items Are Added"));
});

export const getPackageGallery = asyncErrorHandler(async (req, res) => {
  const { error, value } = VSinglePackageInfo.validate(req.params);
  if (error) {
    throw new ErrorHandler(400, error.message, error.details[0].context?.key);
  }

  const { rows } = await pool.query(
    `
      SELECT
        pm.id,
        pm.where_to_use,
        mi.*
      FROM package_and_media pm

      INNER JOIN media_item mi
      ON mi.media_item_id = pm.media_item_id

      WHERE pm.package_id = $1
    `,
    [value.package_id]
  );

  res.status(200).json(new ApiResponse(200, "Package Gallery Items", rows));
});

export const getSingleGalleryInfo = asyncErrorHandler(async (req, res) => {
  const { error, value } = VSingle.validate(req.params);
  if (error)
    throw new ErrorHandler(400, error.message, error.details[0].context?.key);

  console.log(value);

  const { rows, rowCount } = await pool.query(
    "SELECT * FROM package_and_media WHERE id = $1",
    [value.id]
  );
  if (rowCount === 0) throw new ErrorHandler(400, "No item found with this id");

  res
    .status(200)
    .json(new ApiResponse(200, "Single Package Gallery Item", rows[0]));
});

export const removePackageGallery = asyncErrorHandler(async (req, res) => {
  const { error, value } = VSingle.validate(req.params);
  if (error) throw new ErrorHandler(400, error.message);

  await pool.query("DELETE FROM package_and_media WHERE id = $1", [value.id]);

  res
    .status(200)
    .json(new ApiResponse(200, "Media Removed Form Package Gallery"));
});

export const updatePackageGalleryInfo = asyncErrorHandler(async (req, res) => {
  const { error, value } = VUpdatePackageGallery.validate({
    ...req.params,
    ...req.body,
  });
  if (error)
    throw new ErrorHandler(400, error.message, error.details[0].message);

  await pool.query(
    "UPDATE package_and_media SET where_to_use = $1 WHERE id = $2",
    [value.where_to_use, value.id]
  );

  res
    .status(200)
    .json(new ApiResponse(200, "Package Media Info Has Updated Successfully"));
});

// package faq
export const getPackageFaq = asyncErrorHandler(async (req, res) => {
  const { error, value } = VSinglePackageInfo.validate(req.params);
  if (error) throw new ErrorHandler(400, error.message);

  const withContent = req.query.withContent?.toString() === "true";

  const { rows } = await pool.query(
    `SELECT 
      id, 
      package_id, 
      faq_heading, 
      ${withContent ? "faq_detail," : ""}
      created_at 
    FROM package_faq 
    WHERE package_id = $1`,
    [value.package_id]
  );

  res.status(200).json(new ApiResponse(200, "Single Package Faqs", rows));
});

export const createPackageFaq = asyncErrorHandler(async (req, res) => {
  const { error, value } = VAddPackageFaq.validate(req.body);
  if (error)
    throw new ErrorHandler(400, error.message, error.details[0].context?.key);

  await pool.query(
    "INSERT INTO package_faq (package_id, faq_heading, faq_detail) VALUES ($1, $2, $3)",
    [value.package_id, value.faq_heading, value.faq_detail]
  );

  res.status(201).json(new ApiResponse(201, "Package Faq Has Created"));
});

export const getSinglePackgeFaq = asyncErrorHandler(async (req, res) => {
  const { error, value } = VSingle.validate(req.params);
  if (error) throw new ErrorHandler(400, error.message);

  const { rowCount, rows } = await pool.query(
    "SELECT * FROM package_faq WHERE id = $1",
    [value.id]
  );
  if (rowCount === 0) throw new ErrorHandler(400, "No FAQ Found With This Id");

  res.status(200).json(new ApiResponse(200, "", rows[0]));
});

export const updatePackageFaq = asyncErrorHandler(async (req, res) => {
  const { error, value } = VUpdatePackageFaq.validate({
    ...req.params,
    ...req.body,
  });
  if (error)
    throw new ErrorHandler(400, error.message, error.details[0].context?.key);

  await pool.query(
    "UPDATE package_faq SET package_id = $1, faq_heading = $2, faq_detail = $3 WHERE id = $4",
    [value.package_id, value.faq_heading, value.faq_detail, value.id]
  );

  res.status(200).json(new ApiResponse(200, "Update Package Faq Info"));
});

export const deleteFaq = asyncErrorHandler(async (req, res) => {
  const { error, value } = VSingle.validate(req.params);
  if (error) throw new ErrorHandler(400, error.message);

  await pool.query("DELETE FROM package_faq WHERE id = $1", [value.id]);

  res.status(200).json(new ApiResponse(200, "Faq has removed from package"));
});

// package itinerary
export const getPackageItinerary = asyncErrorHandler(async (req, res) => {
  const { error, value } = VSinglePackageInfo.validate(req.params);
  if (error) throw new ErrorHandler(400, error.message);

  const withContent = req.query.withContent?.toString() === "true";

  const { rows } = await pool.query(
    `SELECT 
      id, 
      package_id, 
      itinerary_heading, 
      itinerary_subheading, 
      ${withContent ? "itinerary_details," : ""}
      created_at 
    FROM package_itinerary 
    WHERE package_id = $1`,
    [value.package_id]
  );

  res.status(200).json(new ApiResponse(200, "Single Package Itinerar", rows));
});

export const createPackageItinerary = asyncErrorHandler(async (req, res) => {
  const { error, value } = VAddPackageItinerary.validate(req.body);
  if (error)
    throw new ErrorHandler(400, error.message, error.details[0].context?.key);

  await pool.query(
    "INSERT INTO package_itinerary (package_id, itinerary_heading, itinerary_subheading, itinerary_details) VALUES ($1, $2, $3, $4)",
    [
      value.package_id,
      value.itinerary_heading,
      value.itinerary_subheading,
      value.itinerary_details,
    ]
  );

  res.status(201).json(new ApiResponse(201, "Package Itinerar Has Created"));
});

export const getSinglePackageItinerary = asyncErrorHandler(async (req, res) => {
  const { error, value } = VSingle.validate(req.params);
  if (error) throw new ErrorHandler(400, error.message);

  const { rowCount, rows } = await pool.query(
    "SELECT * FROM package_itinerary WHERE id = $1",
    [value.id]
  );
  if (rowCount === 0)
    throw new ErrorHandler(400, "No Itinerar Found With This Id");

  res.status(200).json(new ApiResponse(200, "", rows[0]));
});

export const updatePackageItinerary = asyncErrorHandler(async (req, res) => {
  const { error, value } = VUpdatePackageItinerary.validate({
    ...req.params,
    ...req.body,
  });
  if (error)
    throw new ErrorHandler(400, error.message, error.details[0].context?.key);

  await pool.query(
    "UPDATE package_itinerary SET package_id = $1, itinerary_heading = $2, itinerary_subheading = $3, itinerary_details = $4 WHERE id = $5",
    [
      value.package_id,
      value.itinerary_heading,
      value.itinerary_subheading,
      value.itinerary_details,
      value.id,
    ]
  );

  res.status(200).json(new ApiResponse(200, "Update Package Itinerar Info"));
});

export const deletePackageItinerary = asyncErrorHandler(async (req, res) => {
  const { error, value } = VSingle.validate(req.params);
  if (error) throw new ErrorHandler(400, error.message);

  await pool.query("DELETE FROM package_itinerary WHERE id = $1", [value.id]);

  res
    .status(200)
    .json(new ApiResponse(200, "Itinerar has removed from package"));
});

//package overview
export const addPackageOverview = asyncErrorHandler(async (req, res) => {
  const { error, value } = VPackageOverview.validate(req.body);
  if (error)
    throw new ErrorHandler(400, error.message, error.details[0].context?.key);

  await pool.query(
    `
      INSERT INTO package_overview (package_id, overview) VALUES ($1, $2)
      ON CONFLICT (package_id)
      DO UPDATE SET
        overview = EXCLUDED.overview
  `,
    [value.package_id, value.overview]
  );

  res
    .status(200)
    .json(new ApiResponse(200, "Package Overview Has Successfully Saved"));
});

export const getPackageOverview = asyncErrorHandler(async (req, res) => {
  const { error, value } = VSinglePackageInfo.validate(req.params);
  if (error)
    throw new ErrorHandler(400, error.message, error.details[0].context?.key);

  const { rows } = await pool.query(
    "SELECT * FROM package_overview WHERE package_id = $1",
    [value.package_id]
  );

  res.status(200).json(new ApiResponse(200, "Package overview info", rows[0]));
});

// package and other options
export const getPackageOtherOptions = asyncErrorHandler(async (req, res) => {
  const { error, value } = VSinglePackageInfo.validate(req.params);
  if (error)
    throw new ErrorHandler(400, error.message, error.details[0].context?.key);

  const withContent = req.query.withContent?.toString() === "true";

  const { rows } = await pool.query(
    `SELECT 
      id, 
      package_id, 
      option_name
      ${withContent ? ",option_content" : ""}
    FROM package_and_other 
    WHERE package_id = $1`,
    [value.package_id]
  );
  res
    .status(200)
    .json(new ApiResponse(200, "Other Options Of This Package", rows));
});

// export const getOneOtherOptionNames = asyncErrorHandler(async (req, res) => {
//   const { error } = VSinglePackageInfo.validate(req.params);
//   if (error) throw new ErrorHandler(400, error.message);

//   const { rows } = await pool.query(
//     "SELECT id, option_name FROM package_and_other"
//   );

//   res.status(200).json(new ApiResponse(200, "Other Options", rows));
// });

export const addOtherOption = asyncErrorHandler(async (req, res) => {
  const { error, value } = VPackageAndOther.validate(req.body);
  if (error)
    throw new ErrorHandler(400, error.message, error.details[0].context?.key);

  await pool.query(
    "INSERT INTO package_and_other (package_id, option_name, option_content) VALUES ($1, $2, $3)",
    [value.package_id, value.option_name, value.option_content]
  );

  res
    .status(201)
    .json(new ApiResponse(201, "New Package Other Option Has Added"));
});

export const getOneOtherOptions = asyncErrorHandler(async (req, res) => {
  const { error, value } = VSingle.validate(req.params);
  if (error)
    throw new ErrorHandler(400, error.message, error.details[0].context?.key);
  const { rows, rowCount } = await pool.query(
    "SELECT * FROM package_and_other WHERE id = $1",
    [value.id]
  );
  if (rowCount === 0)
    throw new ErrorHandler(400, "No option found with this id");
  res.status(200).json(new ApiResponse(200, "Single Other Option", rows[0]));
});

export const deleteOtherOptionRow = asyncErrorHandler(async (req, res) => {
  const { error, value } = VSingle.validate(req.params);
  if (error)
    throw new ErrorHandler(400, error.message, error.details[0].context?.key);

  await pool.query("DELETE FROM package_and_other WHERE id = $1", [value.id]);

  res.status(200).json(new ApiResponse(200, "Other Option Has Removed"));
});

export const updateOtherOption = asyncErrorHandler(async (req, res) => {
  const { error, value } = VUpdatePackageAndOther.validate({
    ...req.params,
    ...req.body,
  });
  if (error)
    throw new ErrorHandler(400, error.message, error.details[0].context?.key);

  await pool.query(
    "UPDATE package_and_other SET package_id = $1, option_name = $2, option_content = $3 WHERE id = $4",
    [value.package_id, value.option_name, value.option_content, value.id]
  );

  res.status(200).json(new ApiResponse(200, "Other option has updated"));
});

// package and seo
export const managePackageSeo = asyncErrorHandler(async (req, res) => {
  const { error, value } = VPackageAndSeo.validate(req.body);
  if (error) throw new ErrorHandler(400, error.message);

  await pool.query(
    `
    INSERT INTO package_and_seo 
      (package_id, meta_title, meta_description, meta_keywords, canonical) 
    VALUES 
      ($1, $2, $3, $4, $5)
    ON CONFLICT (package_id) DO UPDATE SET
      meta_title = EXCLUDED.meta_title,
      meta_description = EXCLUDED.meta_description,
      meta_keywords = EXCLUDED.meta_keywords,
      canonical = EXCLUDED.canonical
    `,
    [
      value.package_id,
      value.meta_title,
      value.meta_description,
      value.meta_keywords,
      value.canonical,
    ]
  );

  res.status(201).json(new ApiResponse(201, "Package Seo Info Saved"));
});

export const getSinglePackageSeoInfo = asyncErrorHandler(async (req, res) => {
  const { error, value } = VSinglePackageInfo.validate(req.params);
  if (error) throw new ErrorHandler(400, error.message);

  const { rows } = await pool.query(
    "SELECT * FROM package_and_seo WHERE package_id = $1",
    [value.package_id]
  );

  res
    .status(200)
    .json(new ApiResponse(200, "Single Package Seo Info", rows[0]));
});
