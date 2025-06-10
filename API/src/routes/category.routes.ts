import { Router } from "express";
import {
  addCategoryGallery,
  addCategoryPackages,
  addNewCategory,
  createCategoryFaq,
  deleteCategory,
  deleteCategoryFaq,
  deleteCategoryPackage,
  getAllCategories,
  getCategoryFaq,
  getCategoryGallery,
  getCategoryPageContent,
  getCategoryPageInfo,
  getSingleCategory,
  getSingleCategoryFaq,
  getSingleCategoryGalleryInfo,
  manageCategoryPageContent,
  removeCategoryGallery,
  updateCategory,
  updateCategoryFaq,
  updateCategoryGalleryInfo,
} from "../controllers/category.controller";
import { isAuthenticated } from "../middlewares/isAuthenticated";

export const categoryRoute = Router();

categoryRoute
  //for frontend
  .get("/page-info/:category_slug", getCategoryPageInfo)
  //for crm
  .post("/packages", addCategoryPackages)
  .delete("/package/:category_id/:package_id", deleteCategoryPackage)
  .get("/", getAllCategories)
  .get("/:category_id", getSingleCategory)
  .post("/", isAuthenticated, addNewCategory)
  .put("/:category_id", isAuthenticated, updateCategory)
  .delete("/:category_id", isAuthenticated, deleteCategory)

  .get("/faq-one/:id", getSingleCategoryFaq)
  .get("/faq/:category_id", getCategoryFaq)
  .post("/faq", isAuthenticated, createCategoryFaq)
  .put("/faq/:id", isAuthenticated, updateCategoryFaq)
  .delete("/faq/:id", isAuthenticated, deleteCategoryFaq)

  .get("/gallery/:category_id", getCategoryGallery)
  .get("/gallery-one/:id", getSingleCategoryGalleryInfo)
  .post("/gallery/:category_id", isAuthenticated, addCategoryGallery)
  .put("/gallery/:id", isAuthenticated, updateCategoryGalleryInfo)
  .delete("/gallery/:id", isAuthenticated, removeCategoryGallery)

  .get("/page-contant/:category_id", getCategoryPageContent)
  .post("/page-contant", manageCategoryPageContent)
