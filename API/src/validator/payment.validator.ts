import Joi from "joi";

export const VPayToPackage = Joi.object({
  full_name: Joi.string().required(),
  email: Joi.string().email().required(),
  contact_number: Joi.string().required(),
  address: Joi.string().optional().allow(""),

  group_type: Joi.string().required(),
  number_of_people: Joi.number().required(),

  participant_info: Joi.array().items(
    Joi.object({
      full_name: Joi.string().required(),
      email: Joi.string().email().required(),
      contact_number: Joi.string().required(),
      dial_code: Joi.string().required(),
    })
      .optional()
      .allow(null)
  ),

  departure_date_id: Joi.number().optional(),

  from_date : Joi.string().optional(),
  to_date : Joi.string().optional(),

  addon_ids: Joi.array().items(Joi.number()).optional().allow(null),

  package_id: Joi.number().required(),
  currency: Joi.string().required().valid("USD", "INR"),
});

export const VCheckPhonePeStatus = Joi.object({
  order_id: Joi.string().required(),
});
