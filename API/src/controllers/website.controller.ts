import axios, { AxiosError } from "axios";
import { pool } from "../config/db";
import asyncErrorHandler from "../middlewares/asyncErrorHandler";
import { CustomRequest } from "../types";
import { ApiResponse } from "../utils/ApiResponse";
import { ErrorHandler } from "../utils/ErrorHandler";
import { filterToSql } from "../utils/filterToSql";
import {
  objectToSqlConverterUpdate,
  objectToSqlInsert,
} from "../utils/objectToSql";
import { parsePagination } from "../utils/parsePagination";
import { sendEmail } from "../utils/sendEmail";
import {
  VAddEnquiry,
  VDeleteBlogComment,
  VPostBlogComment,
  VPostNewBlog,
  VRelatedBlogs,
  VSingleBlog,
  VUpdateBlogComment,
  VUpdateSingleBlog,
} from "../validator/website.validator";
import { getAuthToken } from "../utils/getAuthToken";
import { fetchAllBlogSlugs } from "../utils/fetchAllBlogSlugs";

export const getBlogsList = asyncErrorHandler(
  async (req: CustomRequest, res) => {
    let query: any = {};
    if (req.user_info?.role !== "Admin") {
      query = {
        visible: true,
      };
    }

    const { filterQuery, filterValues } = filterToSql(query);

    const { rows: totalBlogsCount } = await pool.query(
      `SELECT COUNT(*) total_blogs FROM blogs ${filterQuery}`,
      filterValues
    );

    const { LIMIT, OFFSET } = parsePagination(req);
    const totalPages = Math.ceil(totalBlogsCount[0].total_blogs / LIMIT);

    const { rows } = await pool.query(
      `
      SELECT 
        blog_id, 
        heading, 
        sub_heading,
        meta_description, 
        meta_keywords, 
        created_at,
        thumbnail,
        visible,
        thumbnail_alt_tag,
        slug
      FROM blogs

      ${filterQuery}

      ORDER BY blog_id DESC
      LIMIT ${LIMIT} OFFSET ${OFFSET}
      `,
      filterValues
    );

    res
      .status(200)
      .json(new ApiResponse(200, "Blogs List", rows, undefined, totalPages));
  }
);

export const getSlugs = asyncErrorHandler(async (req, res) => {
  const { rows } = await pool.query("SELECT slug FROM blogs");
  res.status(200).json(new ApiResponse(200, "Blog Slgs", rows));
});

export const getRelatedBlogs = asyncErrorHandler(
  async (req: CustomRequest, res) => {
    const { error, value } = VRelatedBlogs.validate(req.query);
    if (error) throw new ErrorHandler(400, error.message);

    const keywordList: string[] = value.keywords.split(",");

    const likeClauses: string[] = [];
    const values: string[] = [];

    keywordList.forEach((keyword, index) => {
      likeClauses.push(`(',' || meta_keywords || ',') ILIKE $${index + 1}`);
      values.push(`%,${keyword},%`);
    });
    values.push(value.current_blog_id);
    const sql = `
        SELECT 
            blog_id, 
            heading, 
            sub_heading,
            meta_description, 
            meta_keywords, 
            created_at,
            thumbnail,
            visible,
            thumbnail_alt_tag,
            slug 
        FROM blogs
        WHERE (${likeClauses.join(" OR ")}) AND blog_id <> $${
      keywordList.length + 1
    }
  `;

    const { rows } = await pool.query(sql, values);

    res.status(200).json(new ApiResponse(200, "Blog List", rows));
  }
);

export const getSingleBlog = asyncErrorHandler(
  async (req: CustomRequest, res) => {
    const { error, value } = VSingleBlog.validate(req.params);
    if (error) throw new ErrorHandler(400, error.message);

    const search_with = Number.isNaN(parseInt(value.blog_id))
      ? "slug"
      : "blog_id";

    let query: any = {};
    if (req.user_info?.role !== "Admin") {
      query = {
        visible: true,
        [search_with]: value.blog_id,
      };
    } else {
      query = {
        [search_with]: value.blog_id,
      };
    }

    const { filterQuery, filterValues } = filterToSql(query);

    const { rowCount, rows } = await pool.query(
      `SELECT * FROM blogs ${filterQuery}`,
      filterValues
    );
    if (!rowCount || rowCount === 0)
      throw new ErrorHandler(400, "No blog found with this id");

    res.status(200).json(new ApiResponse(200, "Single Blog Info", rows[0]));
  }
);

export const postNewBlog = asyncErrorHandler(async (req, res) => {
  const { error, value } = VPostNewBlog.validate(req.body);
  if (error) throw new ErrorHandler(400, error.message);

  const result = await pool.query(
    'SELECT EXISTS (SELECT 1 FROM blogs WHERE slug = $1) AS "isExist"',
    [value.slug]
  );

  const isExist = result.rows[0].isExist;

  if (isExist) {
    throw new ErrorHandler(
      400,
      "Blog Slug Is Already Exist Please Try Another Slug",
      "slug"
    );
  }

  const { rows } = await pool.query(
    "SELECT * FROM media_item WHERE media_item_id = $1",
    [value.media_id]
  );

  value.thumbnail = rows[0].item_link;
  value.thumbnail_alt_tag = rows[0].alt_tag;

  const { params, values, columns } = objectToSqlInsert(value);

  const { rowCount } = await pool.query(
    `
      INSERT INTO blogs ${columns} VALUES ${params}
      ON CONFLICT (slug) DO NOTHING
      RETURNING blog_id
    `,
    values
  );

  if (!rowCount || rowCount === 0) {
    throw new ErrorHandler(
      400,
      "Duplicate Heading Please Change The Blog Heading"
    );
  }

  res.status(201).json(new ApiResponse(201, "New Blog Added"));
});

export const updateSingleBlog = asyncErrorHandler(async (req, res) => {
  const { error, value } = VUpdateSingleBlog.validate({
    ...req.body,
    ...req.params,
  });
  if (error) throw new ErrorHandler(400, error.message);

  const result = await pool.query(
    'SELECT EXISTS (SELECT 1 FROM blogs WHERE slug = $1 AND blog_id <> $2) AS "isExist"',
    [value.slug, value.blog_id]
  );

  const isExist = result.rows[0].isExist;

  if (isExist) {
    throw new ErrorHandler(
      400,
      "Blog Slug Is Already Exist Please Try Another Slug",
      "slug"
    );
  }

  const { rows, rowCount: mediaRowCount } = await pool.query(
    "SELECT * FROM media_item WHERE media_item_id = $1",
    [value.media_id]
  );

  if (mediaRowCount === 0)
    throw new ErrorHandler(
      400,
      "Media Item Not Found. Please Try To Upload New Blog Image"
    );

  value.thumbnail = rows[0].item_link;
  value.thumbnail_alt_tag = rows[0].alt_tag;

  const { keys, values, paramsNum } = objectToSqlConverterUpdate(req.body);
  values.push(value.blog_id);

  const { rowCount } = await pool.query(
    `
      UPDATE blogs SET ${keys} 
        WHERE 
          blog_id = $${paramsNum}
    `,
    values
  );

  if (!rowCount || rowCount === 0) {
    throw new ErrorHandler(400, "Duplicate Heading Please Change The Heading");
  }

  res.status(200).json(new ApiResponse(200, "Blog Updated"));
});

export const deleteBlog = asyncErrorHandler(async (req, res) => {
  const { error, value } = VSingleBlog.validate(req.params);
  if (error) throw new ErrorHandler(400, error.message);

  await pool.query(`DELETE FROM blogs WHERE blog_id = $1`, [value.blog_id]);

  res.status(200).json(new ApiResponse(200, "Blog Remove"));
});

// comments
export const postBlogComment = asyncErrorHandler(async (req, res) => {
  const { error, value } = VPostBlogComment.validate({
    ...req.body,
    ...req.params,
  });
  if (error) throw new ErrorHandler(400, error.message);

  const token = getAuthToken(req);

  const { data } = await axios.post<{ success: boolean; comment_id: number }>(
    `${process.env.WORDPRESS_HOST}/wp-json/custom/v1/add-comment`,
    {
      post_id: value.blog_id,
      content: value.content,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!data.success) {
    throw new ErrorHandler(
      400,
      "Unable to add comment please try again later!"
    );
  }

  res
    .status(201)
    .json(
      new ApiResponse(201, "Comment Added", { comment_id: data.comment_id })
    );
});

export const editBlogComment = asyncErrorHandler(
  async (req: CustomRequest, res) => {
    const { error, value } = VUpdateBlogComment.validate({
      ...req.body,
      ...req.params,
    });
    if (error) throw new ErrorHandler(400, error.message);

    const { data } = await axios.put<{ success: boolean; comment_id: number }>(
      `${process.env.WORDPRESS_HOST}/wp-json/custom/v1/edit-comment/${value.comment_id}`,
      {
        user_id: req.user_info?.id,
        content: value.content,
      }
    );

    if (!data.success) {
      throw new ErrorHandler(
        400,
        "Unable to edit comment please try again later!"
      );
    }

    res
      .status(200)
      .json(
        new ApiResponse(200, "Comment Updated", { comment_id: data.comment_id })
      );
  }
);

export const deleteBlogComment = asyncErrorHandler(
  async (req: CustomRequest, res) => {
    const { error, value } = VDeleteBlogComment.validate(req.params);
    if (error) throw new ErrorHandler(400, error.message);

    try {
      const { data } = await axios.delete<{
        success: boolean;
        comment_id: number;
      }>(
        `${process.env.WORDPRESS_HOST}/wp-json/custom/v1/delete-comment/${value.comment_id}`,
        {
          data: {
            user_id: req.user_info?.id,
          },
        }
      );

      if (!data.success) {
        throw new ErrorHandler(
          400,
          "Unable to edit comment please try again later!"
        );
      }

      res.status(200).json(
        new ApiResponse(200, "Comment Deleted Successfully", {
          comment_id: data.comment_id,
        })
      );
    } catch (error: any) {
      console.log(error);
      throw new ErrorHandler(400, error.message);
    }
  }
);

//Enquiry

export const addEnquiry = asyncErrorHandler(async (req, res) => {
  const { error, value } = VAddEnquiry.validate(req.body);
  if (error) throw new ErrorHandler(400, error.message);

  const { columns, params, values } = objectToSqlInsert(req.body);
  await pool.query(
    `INSERT INTO enquiry_form ${columns} VALUES ${params}`,
    values
  );

  res
    .status(201)
    .json(
      new ApiResponse(
        201,
        "Your enquiry has successfully submitted. we will contact you very soon"
      )
    );
});

export const getEnquiry = asyncErrorHandler(async (req, res) => {
  const { LIMIT, OFFSET } = parsePagination(req);
  const { rows } = await pool.query(
    `SELECT 
      *,
      TO_CHAR(created_at, 'DD Month, YYYY') AS created_at
     FROM enquiry_form ORDER BY id DESC LIMIT ${LIMIT} OFFSET ${OFFSET}`
  );

  res.status(200).json(new ApiResponse(200, "Enquiry List", rows));
});

// sitemap
export const getSiteMapList = asyncErrorHandler(async (req, res) => {
  const client = await pool.connect();
  const frontendDomain = process.env.FRONTEND_HOST_URL;
  try {
    await client.query("BEGIN");
    const { rows: category } = await client.query(
      "SELECT slug AS slug FROM category"
    );
    const { rows: packages } = await client.query(
      `
       SELECT 
        c.slug || '/' || p.slug
       AS slug FROM packages p

       LEFT JOIN category c
       ON c.category_id = p.p_category_id

       WHERE p.p_category_id IS NOT NULL
      `
    );

    await client.query("COMMIT");

    const blogs = await fetchAllBlogSlugs();

    const staticPages = ["", "about-us", "contact-us", "articles"].map(
      (slug) => `<url><loc>${frontendDomain}/${slug}</loc></url>\n`
    );

    const categoriesSlug = category.map((row) => {
      return `<url><loc>${frontendDomain}/${row.slug}</loc></url>\n`;
    });

    const packagesSlug = packages.map((row) => {
      return `<url><loc>${frontendDomain}/${row.slug}</loc></url>\n`;
    });

    const blogsSlug = blogs.map((slug) => {
      return `<url><loc>${frontendDomain}/article/${slug}</loc></url>\n`;
    });

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${staticPages}
        ${categoriesSlug}
        ${packagesSlug}
        ${blogsSlug}
      </urlset>`;

    res.header("Content-Type", "application/xml");
    res.send(sitemap);
  } catch (error: any) {
    await client.query("ROLLBACK");
    throw new ErrorHandler(400, error.message);
  } finally {
    client.release();
  }
});
