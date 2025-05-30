import { Request } from "express";

export const getAuthToken = (req: Request) => {
  const authHeader = req.headers["authorization"];
  
  if(!authHeader) {
    return req.cookies.refreshToken;
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return null;
  }

  return token;
};
