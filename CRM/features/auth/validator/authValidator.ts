import { z } from "zod";

export const loginFormSchema = z.object({
  user_email: z.string().email().min(1),
  user_password: z.string().min(6),
});

export const resetPasswordFormSchema = z.object({
  user_email: z.string().email().min(1),
});
