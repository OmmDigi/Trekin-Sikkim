import { pool } from "../config/db";
import asyncErrorHandler from "../middlewares/asyncErrorHandler";
import { ApiResponse } from "../utils/ApiResponse";
import { createSlug } from "../utils/createSlug";
import { ErrorHandler } from "../utils/ErrorHandler";
import { generatePlaceholders } from "../utils/generatePlaceholders";
import {
  VAddCategoryFaq,
  VAddCategoryGallery,
  VAddNewCategory,
  VCategoryPageInfo,
  VManageCategoryPageContent,
  VSingleCategory,
  VUpdateACategory,
  VUpdateCategoryFaq,
  VUpdateCategoryGallery,
} from "../validator/category.validator";

import { VSingle } from "../validator/package.validator";

export const getCategoryPageInfo = asyncErrorHandler(async (req, res) => {
  const { error, value } = VCategoryPageInfo.validate(req.params);
  if (error) throw new ErrorHandler(400, error.message);

  const { rows } = await pool.query(
    `
    SELECT
      c.category_id,
      c.category_name,
      c.meta_title,
      c.meta_description,
      c.meta_keywords,
      c.canonical,
      MAX(cpc.page_content) AS page_content,
      COALESCE(JSON_AGG(mi) FILTER (WHERE mi.media_item_id IS NOT NULL), '[]') AS media_items,
      COALESCE(JSON_AGG(cpf) FILTER (WHERE cpf.id IS NOT NULL), '[]') AS faqs
    FROM category c

    LEFT JOIN categorypage_page_content cpc
    ON cpc.category_id = c.category_id

    LEFT JOIN categorypage_media cm
    ON cm.category_id = c.category_id

    LEFT JOIN media_item mi
    ON mi.media_item_id = cm.media_item_id

    LEFT JOIN categorypage_faq cpf
    ON cpf.category_id = c.category_id

    WHERE slug = $1

    GROUP BY c.category_id
    `,
    [value.category_slug]
  );

  res.status(200).json(new ApiResponse(200, "Category Page Info", rows[0]));
});

export const getAllCategories = asyncErrorHandler(async (req, res) => {
  const category_type = req.query.category_type?.toString();

  let filter = "";
  const filterValues: string[] = [];
  let placeholdernum = 1;

  if (category_type) {
    filter = `WHERE t.type_id = $${placeholdernum}`;

    filterValues.push(category_type);
    placeholdernum++;
  }

  const { rows } = await pool.query(
    `
    SELECT c.category_id, c.category_name, t.type_id AS category_type_id, t.type_name AS category_type, c.slug  FROM category c
    LEFT JOIN types t ON t.type_id = c.type_id
    ${filter}
    ORDER BY c.category_id DESC
      `,
    filterValues
  );
  res.status(200).json(new ApiResponse(200, "Package Categories", rows));
});

export const getSingleCategory = asyncErrorHandler(async (req, res) => {
  const { error, value } = VSingleCategory.validate(req.params);
  if (error)
    throw new ErrorHandler(400, error.message, error.details[0].context?.key);

  const { rows } = await pool.query(
    `
    SELECT c.category_id, c.category_name, t.type_id AS category_type_id, t.type_name AS category_type, c.meta_title, c.meta_description, c.meta_keywords, c.canonical  FROM category c
    LEFT JOIN types t ON t.type_id = c.type_id
    WHERE c.category_id = $1
      `,
    [value.category_id]
  );

  res.status(200).json(new ApiResponse(200, "Single category info", rows[0]));
});

export const addNewCategory = asyncErrorHandler(async (req, res) => {
  const { error, value } = VAddNewCategory.validate(req.body || {});
  if (error)
    throw new ErrorHandler(400, error.message, error.details[0].context?.key);

  const slug = createSlug(value.category_name);

  const { rows } = await pool.query(
    `INSERT INTO category (category_name, type_id, slug, meta_title, meta_description, meta_keywords, canonical) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING category_id`,
    [
      value.category_name,
      value.category_type,
      slug,
      value.meta_title,
      value.meta_description,
      value.meta_keywords,
      value.canonical,
    ]
  );

  res
    .status(201)
    .json(new ApiResponse(201, "New category has added", rows[0].category_id));
});

export const updateCategory = asyncErrorHandler(async (req, res) => {
  const { error, value } = VUpdateACategory.validate({
    ...req.body,
    ...req.params,
  });
  if (error)
    throw new ErrorHandler(400, error.message, error.details[0].context?.key);

  const slug = createSlug(value.new_category_name);

  await pool.query(
    "UPDATE category SET category_name = $1, type_id = $2, slug = $3, meta_title = $4, meta_description = $5, meta_keywords = $6, canonical = $7  WHERE category_id = $8",
    [
      value.new_category_name,
      value.new_category_type,
      slug,
      value.new_meta_title,
      value.new_meta_description,
      value.new_meta_keywords,
      value.new_canonical,
      value.category_id,
    ]
  );

  res.status(200).json(new ApiResponse(200, "Category has been updated"));
});

export const deleteCategory = asyncErrorHandler(async (req, res) => {
  const { error, value } = VSingleCategory.validate(req.params);
  if (error)
    throw new ErrorHandler(400, error.message, error.details[0].context?.key);

  await pool.query("DELETE FROM category WHERE category_id = $1", [
    value.category_id,
  ]);

  res.status(200).json(new ApiResponse(200, "Category has been deleted"));
});

// catgory and faq
export const getCategoryFaq = asyncErrorHandler(async (req, res) => {
  const { error, value } = VSingleCategory.validate(req.params);
  if (error) throw new ErrorHandler(400, error.message);

  const { rows } = await pool.query(
    "SELECT id, category_id, faq_heading, created_at FROM categorypage_faq WHERE category_id = $1 ORDER BY id DESC",
    [value.category_id]
  );

  res.status(200).json(new ApiResponse(200, "Single Category Faqs", rows));
});

export const createCategoryFaq = asyncErrorHandler(async (req, res) => {
  const { error, value } = VAddCategoryFaq.validate(req.body);
  if (error)
    throw new ErrorHandler(400, error.message, error.details[0].context?.key);

  await pool.query(
    "INSERT INTO categorypage_faq (category_id, faq_heading, faq_detail) VALUES ($1, $2, $3)",
    [value.category_id, value.faq_heading, value.faq_detail]
  );

  res.status(201).json(new ApiResponse(201, "Category Faq Has Created"));
});

export const getSingleCategoryFaq = asyncErrorHandler(async (req, res) => {
  const { error, value } = VSingle.validate(req.params);
  if (error) throw new ErrorHandler(400, error.message);

  const { rowCount, rows } = await pool.query(
    "SELECT * FROM categorypage_faq WHERE id = $1",
    [value.id]
  );
  if (rowCount === 0) throw new ErrorHandler(400, "No FAQ Found With This Id");

  res.status(200).json(new ApiResponse(200, "", rows[0]));
});

export const updateCategoryFaq = asyncErrorHandler(async (req, res) => {
  const { error, value } = VUpdateCategoryFaq.validate({
    ...req.params,
    ...req.body,
  });
  if (error)
    throw new ErrorHandler(400, error.message, error.details[0].context?.key);

  await pool.query(
    "UPDATE categorypage_faq SET category_id = $1, faq_heading = $2, faq_detail = $3 WHERE id = $4",
    [value.category_id, value.faq_heading, value.faq_detail, value.id]
  );

  res.status(200).json(new ApiResponse(200, "Update Category Faq Info"));
});

export const deleteCategoryFaq = asyncErrorHandler(async (req, res) => {
  const { error, value } = VSingle.validate(req.params);
  if (error) throw new ErrorHandler(400, error.message);

  await pool.query("DELETE FROM categorypage_faq WHERE id = $1", [value.id]);

  res
    .status(200)
    .json(new ApiResponse(200, "Faq has removed from current category"));
});

//category and gallery
export const addCategoryGallery = asyncErrorHandler(async (req, res) => {
  const { error, value } = VAddCategoryGallery.validate({
    ...req.params,
    ...req.body,
  });
  if (error)
    throw new ErrorHandler(400, error.message, error.details[0].context?.key);

  const placeholders = generatePlaceholders(value.media_info.length, 3);

  await pool.query(
    `
      INSERT INTO categorypage_media 
        (category_id, media_item_id, where_to_use) 
      VALUES 
        ${placeholders}
      ON CONFLICT (media_item_id, category_id)
      DO UPDATE SET 
         where_to_use = EXCLUDED.where_to_use
      `,
    value.media_info.flatMap((item: any) => [
      value.category_id,
      item.media_id,
      item.where_to_use,
    ])
  );

  res.status(201).json(new ApiResponse(201, "Items Are Added"));
});

export const getCategoryGallery = asyncErrorHandler(async (req, res) => {
  const { error, value } = VSingleCategory.validate(req.params);
  if (error) {
    throw new ErrorHandler(400, error.message, error.details[0].context?.key);
  }

  const { rows } = await pool.query(
    `
      SELECT
        cm.id,
        cm.where_to_use,
        mi.*
      FROM categorypage_media cm

      INNER JOIN media_item mi
      ON mi.media_item_id = cm.media_item_id

      WHERE cm.category_id = $1
    `,
    [value.category_id]
  );

  res.status(200).json(new ApiResponse(200, "Category Gallery Items", rows));
});

export const getSingleCategoryGalleryInfo = asyncErrorHandler(
  async (req, res) => {
    const { error, value } = VSingle.validate(req.params);
    if (error)
      throw new ErrorHandler(400, error.message, error.details[0].context?.key);

    console.log(value);

    const { rows, rowCount } = await pool.query(
      "SELECT * FROM categorypage_media WHERE id = $1",
      [value.id]
    );
    if (rowCount === 0)
      throw new ErrorHandler(400, "No item found with this id");

    res
      .status(200)
      .json(new ApiResponse(200, "Single Category Gallery Item", rows[0]));
  }
);

export const removeCategoryGallery = asyncErrorHandler(async (req, res) => {
  const { error, value } = VSingle.validate(req.params);
  if (error) throw new ErrorHandler(400, error.message);

  await pool.query("DELETE FROM categorypage_media WHERE id = $1", [value.id]);

  res
    .status(200)
    .json(new ApiResponse(200, "Media Removed Form Category Gallery"));
});

export const updateCategoryGalleryInfo = asyncErrorHandler(async (req, res) => {
  const { error, value } = VUpdateCategoryGallery.validate({
    ...req.params,
    ...req.body,
  });
  if (error)
    throw new ErrorHandler(400, error.message, error.details[0].message);

  await pool.query(
    "UPDATE categorypage_media SET where_to_use = $1 WHERE id = $2",
    [value.where_to_use, value.id]
  );

  res
    .status(200)
    .json(new ApiResponse(200, "Category Media Info Has Updated Successfully"));
});

//category page content and cateogry
export const getCategoryPageContent = asyncErrorHandler(async (req, res) => {
  const { error, value } = VSingleCategory.validate(req.params);
  if (error) throw new ErrorHandler(400, error.message);

  const { rows } = await pool.query(
    "SELECT * FROM categorypage_page_content WHERE category_id = $1",
    [value.category_id]
  );
  // if (rowCount === 0) throw new ErrorHandler(400, "Category id is not found");

  res
    .status(200)
    .json(new ApiResponse(200, "Single Category Page Content", rows[0]));
});

export const manageCategoryPageContent = asyncErrorHandler(async (req, res) => {
  const { error, value } = VManageCategoryPageContent.validate(req.body);
  if (error) throw new ErrorHandler(400, error.message);

  await pool.query(
    `
      INSERT INTO categorypage_page_content (category_id, page_content) VALUES ($1, $2)
      ON CONFLICT (category_id) DO UPDATE SET page_content = EXCLUDED.page_content
    `,
    [value.category_id, value.page_content]
  );

  res
    .status(200)
    .json(
      new ApiResponse(200, "Category Page Content Has Updated Successfully")
    );
});
