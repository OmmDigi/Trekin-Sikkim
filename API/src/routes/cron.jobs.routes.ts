import { Router } from "express";
import { removeTempUnusedOrderInfo } from "../controllers/cron.jobs.controller";

export const cronJobsRoute = Router();

cronJobsRoute.post("/remove-unused-order-info", removeTempUnusedOrderInfo)