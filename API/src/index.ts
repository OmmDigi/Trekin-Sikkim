import express, { Application } from "express";
import dotenv from "dotenv";
import { userRoute } from "./routes/user.routes";
import { globalErrorController } from "./controllers/error.controller";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";
import { categoryRoute } from "./routes/category.routes";
import { additionalRoutes } from "./routes/additional.routes";
import { mediaItem } from "./routes/gallery.routes";
import { packageRoute } from "./routes/packages.routes";
import { pool } from "./config/db";
import { paymentRouter } from "./routes/payment.routes";
import { bookingRoute } from "./routes/booking.routes";
import { websiteRoute } from "./routes/website.routes";
import asyncErrorHandler from "./middlewares/asyncErrorHandler";
import { ApiResponse } from "./utils/ApiResponse";
import fs from "fs";
import { upcomingPackageRoutes } from "./routes/upcoming.package.routes";

import {
  StandardCheckoutClient,
  Env,
  StandardCheckoutPayRequest,
} from "pg-sdk-node";
import { randomUUID } from "crypto";

const app: Application = express();

// Load environment variables based on NODE_ENV
if (process.env.NODE_ENV === "development") {
  dotenv.config({ path: ".env.local", override: true });
} else {
  dotenv.config({ path: ".env", override: true });
}

const PORT = process.env.PORT || 8080;

const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : ["http://localhost:3000", "http://localhost:3001"]; // Default to localhost:3000

// Middleware
app.use(
  cors({
    origin: ALLOWED_ORIGINS, // Frontend URL
    credentials: true, // Required for cookies
  })
);
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "../public/views"));
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));
app.use(cookieParser());

//modules
app.use("/api/v1/users", userRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/addition", additionalRoutes);
app.use("/api/v1/media-item", mediaItem);
app.use("/api/v1/package", packageRoute);
app.use("/api/v1/payment", paymentRouter);
app.use("/api/v1/booking", bookingRoute);
app.use("/api/v1/website", websiteRoute);
app.use("/api/v1/upcoming", upcomingPackageRoutes);

app.post(
  "/init-db",
  asyncErrorHandler(async (req, res) => {
    const initSqlPasswordEnv = process.env.INIT_SQL_PASSWORD;
    if (req.body?.password !== initSqlPasswordEnv) {
      res.status(400).json(new ApiResponse(400, "password is wrong"));
      return;
    }
    const sql = fs.readFileSync(
      path.join(__dirname, "../database.sql"),
      "utf-8"
    );

    await pool.query(sql);

    res.status(200).json(new ApiResponse(200, "Sql Successfully Init"));
  })
);

app.get(
  "/phone",
  asyncErrorHandler(async (req, res) => {
    // const clientId = "TEST-M23MM5WJFVU2M_25063";
    // const clientSecret = "ZjRiMzIwY2QtOTY1MC00YTQyLTg3YjEtYmI3NzlmNDVjZTZi";
    const clientId = process.env.PHONEPE_MERCHANT_ID!;
    const clientSecret = process.env.PHONEPE_MERCHANT_KEY!;
    const clientVersion = 1; //insert your client version here
    const env = Env.SANDBOX; //change to Env.PRODUCTION when you go live

    const client = StandardCheckoutClient.getInstance(
      clientId,
      clientSecret,
      clientVersion,
      env
    );

    const merchantOrderId = randomUUID();
    const amount = 100;
    const redirectUrl = "https://www.merchant.com/redirect";

    const request = StandardCheckoutPayRequest.builder()
      .merchantOrderId(merchantOrderId)
      .amount(amount)
      .redirectUrl(redirectUrl)
      .build();

    // client.pay(request).then((response) => {
    //   const checkoutPageUrl = response.redirectUrl;
    //   console.log(checkoutPageUrl);
    //   res.send(checkoutPageUrl);
    // });

    const response = await client.pay(request);
    res.send(response);
  })
);

//global error handler
app.use(globalErrorController);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
