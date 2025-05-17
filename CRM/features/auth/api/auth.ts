import api from "@/lib/axios";
import { TLoginForm, LoginResponse, TForgotPassword } from "../types";

export const login = async (payload: TLoginForm): Promise<LoginResponse> => {
  const response = await api.post("/api/v1/users/login", payload);
  return response.data;
};

export const requestResetPassword = async (payload: TForgotPassword) => {
  const response = await api.post("/api/v1/users/reset-password/send", payload);
  return response.data;
};

export const checkLogIn = async () => {
  const response = await api.get("/api/v1/users/account/is-login");
  return response.data;
};

export const logout = async () => {
  const response = await api.get("/api/v1/users/logout");
  return response.data;
};

export const getSidebarAccountDetails = async () => {
  const response = await api.get("/api/v1/users/account");
  return response.data;
};
