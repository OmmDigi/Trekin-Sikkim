import { NextFunction, Response } from "express";
import { CustomRequest, IUserToken } from "../types";
import { verifyToken } from "../utils/jwt";
import asyncErrorHandler from "./asyncErrorHandler";
import { getAuthToken } from "../utils/getAuthToken";

export const checkUser = asyncErrorHandler(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const token = getAuthToken(req);

    const { data } = await verifyToken<IUserToken>(token);

    req.user_info = data || undefined;

    next();
  }
);
