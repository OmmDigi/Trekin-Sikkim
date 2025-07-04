import { Router } from "express";
import {
  addEnquiry,
  deleteBlog,
  deleteBlogComment,
  editBlogComment,
  getBlogsList,
  getEnquiry,
  getRelatedBlogs,
  getSingleBlog,
  getSiteMapList,
  getSlugs,
  postBlogComment,
  postNewBlog,
  updateSingleBlog,
} from "../controllers/website.controller";
import { checkUser } from "../middlewares/checkUser";
import { isAuthenticated } from "../middlewares/isAuthenticated";

export const websiteRoute = Router();

websiteRoute
  .get("/blogs", checkUser, getBlogsList)
  .get("/blogs/related", checkUser, getRelatedBlogs)
  .get("/blogs/slug", checkUser, getSlugs)
  .get("/blogs/:blog_id", checkUser, getSingleBlog)
  .post("/blogs", postNewBlog)
  .put("/blogs/:blog_id", updateSingleBlog)
  .delete("/blogs/:blog_id", deleteBlog)

  .post("/blogs/comment/:blog_id", isAuthenticated, postBlogComment)
  .put("/blogs/comment/:comment_id", isAuthenticated, editBlogComment)
  .delete("/blogs/comment/:comment_id", isAuthenticated, deleteBlogComment)

  .get("/enquiry", getEnquiry)
  .post("/enquiry", addEnquiry)

  .get("/sitemap", getSiteMapList)
