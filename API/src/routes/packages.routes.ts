import { Router } from "express";
import {
  addOtherOption,
  addPackageBasicInfo,
  addPackageGallery,
  addPackageOverview,
  createDepartureDate,
  createPackageFaq,
  createPackageItinerary,
  deleteDepartureDate,
  deleteFaq,
  deleteOtherOptionRow,
  deletePackage,
  deletePackageItinerary,
  getDepartureDates,
  getDepartureDatesV2,
  // getOneOtherOptionNames,
  getOneOtherOptions,
  getPackageFaq,
  getPackageGallery,
  getPackageItinerary,
  getPackageList,
  getPackageOtherOptions,
  getPackageOverview,
  getSingleDepartureDate,
  getSingleGalleryInfo,
  getSinglePackageBasicInfo,
  getSinglePackageItinerary,
  getSinglePackagePage,
  getSinglePackageSeoInfo,
  getSinglePackgeFaq,
  managePackageSeo,
  removePackageGallery,
  updateDepartureDateInfo,
  updateOtherOption,
  updatePackageFaq,
  updatePackageGalleryInfo,
  updatePackageItinerary,
  updateSinglePackageBasicInfo,
} from "../controllers/packages.controller";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { checkUser } from "../middlewares/checkUser";

export const packageRoute = Router();

packageRoute
  .get("/single-page-basic/:package_slug", getSinglePackagePage)

  .get("/", checkUser, getPackageList)
  .delete("/:package_id", deletePackage)

  .get("/basic/:package_id", getSinglePackageBasicInfo)
  .post("/basic", isAuthenticated, addPackageBasicInfo)
  .put("/basic/:package_id", isAuthenticated, updateSinglePackageBasicInfo)

  .get("/departure-date-one/:id", getSingleDepartureDate)
  .get("/departure-date/:package_id", checkUser, getDepartureDates)
  .get("/departure-date-v2/:package_id", checkUser, getDepartureDatesV2)
  .post("/departure-date", isAuthenticated, createDepartureDate)
  .put("/departure-date/:id", isAuthenticated, updateDepartureDateInfo)
  .delete("/departure-date/:id", isAuthenticated, deleteDepartureDate)

  .get("/gallery/:package_id", getPackageGallery)
  .get("/gallery-one/:id", getSingleGalleryInfo)
  .post("/gallery/:package_id", isAuthenticated, addPackageGallery)
  .put("/gallery/:id", isAuthenticated, updatePackageGalleryInfo)
  .delete("/gallery/:id", isAuthenticated, removePackageGallery)

  .get("/faq-one/:id", getSinglePackgeFaq)
  .get("/faq/:package_id", getPackageFaq)
  .post("/faq", isAuthenticated, createPackageFaq)
  .put("/faq/:id", isAuthenticated, updatePackageFaq)
  .delete("/faq/:id", isAuthenticated, deleteFaq)

  .get("/itinerary-one/:id", getSinglePackageItinerary)
  .get("/itinerary/:package_id", getPackageItinerary)
  .post("/itinerary", isAuthenticated, createPackageItinerary)
  .put("/itinerary/:id", isAuthenticated, updatePackageItinerary)
  .delete("/itinerary/:id", isAuthenticated, deletePackageItinerary)

  .post("/overview", isAuthenticated, addPackageOverview)
  .get("/overview/:package_id", getPackageOverview)

  .get("/other-one/:id", getOneOtherOptions)
  // .get("/other-options/:package_id", getOneOtherOptionNames)
  .get("/other/:package_id", getPackageOtherOptions)
  .post("/other", isAuthenticated, addOtherOption)
  .put("/other/:id", isAuthenticated, updateOtherOption)
  .delete("/other/:id", isAuthenticated, deleteOtherOptionRow)

  .get("/seo/:package_id", getSinglePackageSeoInfo)
  .post("/seo", isAuthenticated, managePackageSeo)


