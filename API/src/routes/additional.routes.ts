import { Router } from "express";
import {
  addNewAdditional,
  deleteAdditional,
  getAllAdditionals,
  getSingleAdditional,
  updateAdditional,
} from "../controllers/additional.controller";
import { isAuthenticated } from "../middlewares/isAuthenticated";

export const additionalRoutes = Router();

additionalRoutes
  .get("/", getAllAdditionals)
  .get("/:additional_id", getSingleAdditional)
  .post("/", isAuthenticated, addNewAdditional)
  .put("/:additional_id", isAuthenticated, updateAdditional)
  .delete("/:additional_id", isAuthenticated, deleteAdditional);
