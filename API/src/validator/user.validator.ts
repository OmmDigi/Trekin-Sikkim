import Joi from "joi";

export const VLoginUser = Joi.object({
  user_email: Joi.string().email().required(),
  user_password: Joi.string().min(6).required(),
});

export const VSignupUser = Joi.object({
  user_name: Joi.string().required(),
  user_email: Joi.string().email().required(),
  user_password: Joi.string().min(6).required(),
});

export const VVerifyOtp = Joi.object({
  token: Joi.string().required(),
});

export const VResetPassword = Joi.object({
  user_email: Joi.string().email().required(),
});

export const VGetResetPassPage = Joi.object({
  token: Joi.string().required(),
});

export const VChangePassword = Joi.object({
  token: Joi.string().required(),
  new_password: Joi.string().required(),
});

export const VUpdateAccountInfo = Joi.object({
  user_id : Joi.number().required(),
  user_name: Joi.string().optional(),
  user_email: Joi.string().email().optional(),
  user_contact_number: Joi.string().optional(),
  profile_image : Joi.string().optional()
})