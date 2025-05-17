import Joi from "joi";

export const VAdditional = Joi.object({
  additional_name: Joi.string().required(),
  price_inr: Joi.number().required(),
  price_usd: Joi.number().required(),
});

export const VUpdateAdditional = Joi.object({
  additional_id: Joi.number().required(),
  additional_name: Joi.string().required(),
  price_inr: Joi.number().required(),
  price_usd: Joi.number().required(),
});

export const VDeleteAdditional = Joi.object({
  additional_id: Joi.number().required(),
});
