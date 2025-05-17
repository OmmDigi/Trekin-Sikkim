import { Router } from "express";
import { getBookingData, getBookings } from "../controllers/booking.controller";
import { isAuthenticated } from "../middlewares/isAuthenticated";

export const bookingRoute = Router();
bookingRoute
  .get("/", isAuthenticated, getBookingData)
  .get("/list", isAuthenticated, getBookings);
