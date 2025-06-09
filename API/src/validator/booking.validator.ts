import Joi from "joi";

export const VBookingData = Joi.object({
  package_id: Joi.number().required(),
  date_id: Joi.number().optional(),
  additional_ids: Joi.string().optional().allow(""),
});

export const VGetBookingListFilter = Joi.object({
  from: Joi.string().valid("account", "crm").optional(),
  phone_number: Joi.string().optional(),
  name: Joi.string().optional(),
  email: Joi.string().optional(),
  order_id: Joi.string().optional(),
  transition_id: Joi.string().optional(),
  package_id: Joi.number().optional(),
  page: Joi.number().optional(),
});
