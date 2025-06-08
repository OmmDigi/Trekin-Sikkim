import { Router } from "express";
import {
  addEnquiry,
  deleteBlog,
  getBlogsList,
  getEnquiry,
  getRelatedBlogs,
  getSingleBlog,
  getSiteMapList,
  getSlugs,
  postNewBlog,
  updateSingleBlog,
} from "../controllers/website.controller";
import { checkUser } from "../middlewares/checkUser";

export const websiteRoute = Router();

websiteRoute
  .get("/blogs", checkUser, getBlogsList)
  .get("/blogs/related", checkUser, getRelatedBlogs)
  .get("/blogs/slug", checkUser, getSlugs)
  .get("/blogs/:blog_id", checkUser, getSingleBlog)
  .post("/blogs", postNewBlog)
  .put("/blogs/:blog_id", updateSingleBlog)
  .delete("/blogs/:blog_id", deleteBlog)

  .get("/enquiry", getEnquiry)
  .post("/enquiry", addEnquiry)

  .get("/sitemap", getSiteMapList)
