import { NextFunction, Response } from "express";
import { CustomRequest, IUserToken } from "../types";
import { verifyToken } from "../utils/jwt";
import asyncErrorHandler from "./asyncErrorHandler";
import { ErrorHandler } from "../utils/ErrorHandler";
import { getAuthToken } from "../utils/getAuthToken";

export const isAuthenticated = asyncErrorHandler(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const token = getAuthToken(req);

    const { data, error } = await verifyToken<IUserToken>(token);
    if (error) throw new ErrorHandler(401, "Unauthorized");

    req.user_info = data || undefined;

    next();
  }
);
