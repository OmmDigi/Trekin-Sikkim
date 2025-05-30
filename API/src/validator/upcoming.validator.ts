import Joi from "joi";

export const VModifyUpcomingPackage = Joi.array().items(Joi.number()).required()
