// all the payment related task will done here
import { Router } from "express";
import {
  createPhonepeOrder,
  checkPhonepePaymentStatus,
} from "../controllers/payment.controller";
import { isAuthenticated } from "../middlewares/isAuthenticated";

export const paymentRouter = Router();

paymentRouter
  .post("/phonepe/create-order", isAuthenticated, createPhonepeOrder)
  .post("/phonepe/status", checkPhonepePaymentStatus); //
