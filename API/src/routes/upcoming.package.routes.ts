import { Router } from "express";
import {
  getPackageChooseList,
  getUpcomingPackageList,
  modifyUpcomingPackage,
} from "../controllers/upcoming.package.controller";

export const upcomingPackageRoutes = Router();

upcomingPackageRoutes
  .get("/", getUpcomingPackageList)
  .get("/package-list", getPackageChooseList)
  .post("/modify", modifyUpcomingPackage);
