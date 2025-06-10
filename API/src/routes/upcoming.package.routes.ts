import { Router } from "express";
import {
  deletePackageFromUpcomming,
  getPackageChooseList,
  getUpcomingPackageList,
  modifyUpcomingPackage,
} from "../controllers/upcoming.package.controller";

export const upcomingPackageRoutes = Router();

upcomingPackageRoutes
  .get("/", getUpcomingPackageList)
  .get("/package-list", getPackageChooseList)
  .post("/modify", modifyUpcomingPackage)
  .delete("/:package_id", deletePackageFromUpcomming);
