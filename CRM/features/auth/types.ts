import { IResponse } from "@/types";
import { z } from "zod";
import { loginFormSchema } from "@/features/auth/validator/authValidator";

export interface LoginResponse extends IResponse<string> {}

export type TLoginForm = z.infer<typeof loginFormSchema>;

export type TForgotPassword = {
  user_email: string;
};

export interface ISidebarAccount {
  user_id: number;
  user_name: string;
  user_email: string;
  profile_image: string | null;
}
