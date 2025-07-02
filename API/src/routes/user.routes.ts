import { Router } from "express";
import {
  changePassword,
  createAdmin,
  getAccountInfo,
  getResetPasswordPage,
  checkIsLogin,
  loginUser,
  loginWithGoogle,
  logout,
  sendResetPasswordLink,
  signupUser,
  verifyEmail,
  verifyGoogleLogin,
  updateAccountInfo,
} from "../controllers/user.controller";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { ApiResponse } from "../utils/ApiResponse";
import { CustomRequest } from "../types";
import { ErrorHandler } from "../utils/ErrorHandler";

export const userRoute = Router();

userRoute
  .get("/is-login", isAuthenticated, (req, res) => {
    res.status(200).json(new ApiResponse(200, "", true));
  })
  .get("/is-login-crm", isAuthenticated, (req: CustomRequest, res) => {
    if (req.user_info?.role !== "Admin") {
      throw new ErrorHandler(401, "Unauthorize");
    }
    res.status(200).json(new ApiResponse(200, "", true));
  })
  .post("/login", loginUser)
  .post("/create-admin", createAdmin)
  .post("/signup", signupUser)
  .get("/verify-email/:token", verifyEmail)
  .get("/logout", isAuthenticated, logout)
  .post("/reset-password/send", sendResetPasswordLink)
  .get("/reset-password/page/:token", getResetPasswordPage)
  .post("/change-password", changePassword)

  .get("/login/google", loginWithGoogle)
  .get("/login/google/verify", verifyGoogleLogin)

  .get("/account", isAuthenticated, getAccountInfo)
  .get("/account/is-login", isAuthenticated, checkIsLogin)
  .put("/account", isAuthenticated, updateAccountInfo);
