import Joi from "joi";

export const VGetPackageList = Joi.object({
  category_slug: Joi.string().optional(),
  category_type: Joi.string().optional(),
  page: Joi.number().optional(),
});

export const VAddPackageBasicInfo = Joi.object({
  package_name: Joi.string()
    .min(2)
    .max(255)
    .messages({
      "string.min": "Package Name must be at least 2 characters.",
    })
    .required(),

  duration: Joi.string()
    .min(1)
    .messages({
      "string.min": "Duration must be at least 2 characters.",
    })
    .required(),

  short_description: Joi.string()
    .min(1)
    .max(255)
    .messages({
      "string.min": "Short Description is required",
    })
    .required(),

  region: Joi.string()
    .min(1)
    .max(255)
    .messages({
      "string.min": "Region is required",
    })
    .required(),

  best_time: Joi.string()
    .min(1)
    .max(255)
    .messages({
      "string.min": "Best Time is required",
    })
    .required(),

  highest_altitude: Joi.string()
    .min(1)
    .max(255)
    .messages({
      "string.min": "Highest Altitude is required",
    })
    .required(),

  suitable_for: Joi.string()
    .min(1)
    .max(255)
    .messages({
      "string.min": "Suitable For is required",
    })
    .required(),

  trek_distance: Joi.string()
    .min(1)
    .max(255)
    .messages({
      "string.min": "Trek Distance is required",
    })
    .required(),

  original_price_inr: Joi.number()
    .min(0)
    .messages({
      "number.min": " must be greater than or equal to 0",
      "number.base": "Invalid price value",
    })
    .required(),

  offer_price_inr: Joi.number()
    .min(0)
    .messages({
      "number.min": "Offer Price must be greater than or equal to 0",
      "number.base": "Invalid price value",
    })
    .required(),

  original_price_usd: Joi.number()
    .min(0)
    .messages({
      "number.min": "Original price must be greater than or equal to 0",
      "number.base": "Invalid price value",
    })
    .required(),

  offer_price_usd: Joi.number()
    .min(0)
    .messages({
      "number.min": "Offer Price must be greater than or equal to 0",
      "number.base": "Invalid price value",
    })
    .required(),

  category_id: Joi.number().required(),
  is_active: Joi.number().required(),

  additionals: Joi.array().items(Joi.number()).required(),
});

export const VUpdatePackageBasicInfo = Joi.object({
  package_id: Joi.number().required(),
  package_name: Joi.string()
    .min(2)
    .max(255)
    .messages({
      "string.min": "Package Name must be at least 2 characters.",
    })
    .required(),

  duration: Joi.string()
    .min(1)
    .messages({
      "string.min": "Duration must be at least 2 characters.",
    })
    .required(),

  short_description: Joi.string()
    .min(1)
    .max(255)
    .messages({
      "string.min": "Short Description is required",
    })
    .required(),

  region: Joi.string()
    .min(1)
    .max(255)
    .messages({
      "string.min": "Region is required",
    })
    .required(),

  best_time: Joi.string()
    .min(1)
    .max(255)
    .messages({
      "string.min": "Best Time is required",
    })
    .required(),

  highest_altitude: Joi.string()
    .min(1)
    .max(255)
    .messages({
      "string.min": "Highest Altitude is required",
    })
    .required(),

  suitable_for: Joi.string()
    .min(1)
    .max(255)
    .messages({
      "string.min": "Suitable For is required",
    })
    .required(),

  trek_distance: Joi.string()
    .min(1)
    .max(255)
    .messages({
      "string.min": "Trek Distance is required",
    })
    .required(),

  original_price_inr: Joi.number()
    .min(0)
    .messages({
      "number.min": " must be greater than or equal to 0",
      "number.base": "Invalid price value",
    })
    .required(),

  offer_price_inr: Joi.number()
    .min(0)
    .messages({
      "number.min": "Offer Price must be greater than or equal to 0",
      "number.base": "Invalid price value",
    })
    .required(),

  original_price_usd: Joi.number()
    .min(0)
    .messages({
      "number.min": "Original price must be greater than or equal to 0",
      "number.base": "Invalid price value",
    })
    .required(),

  offer_price_usd: Joi.number()
    .min(0)
    .messages({
      "number.min": "Offer Price must be greater than or equal to 0",
      "number.base": "Invalid price value",
    })
    .required(),

  category_id: Joi.number().required(),
  is_active: Joi.number().required(),

  additionals: Joi.array().items(Joi.number()).required(),
});

export const VSinglePackageInfo = Joi.object({
  package_id: Joi.number().required(),
});

export const VGetSinglePackagePageInfo = Joi.object({
  package_slug: Joi.string().required(),
});

// Departure Date

export const VDepartureFilter = Joi.object({
  for_month : Joi.string().optional(),
  max_seats_is_not_zero : Joi.boolean().optional()
})

export const VSingle = Joi.object({
  id: Joi.number().required(),
});

export const VCreateDepartureDate = Joi.object({
  package_id: Joi.number().required(),
  for_month: Joi.string().required(),
  from_date: Joi.string().required(),
  to_date: Joi.string().required(),
  max_seats: Joi.number().required(),
  avilibility_text: Joi.string().optional().allow(""),
  avilibility_color: Joi.string().valid("Red", "Green", "Yellow"),
});

export const VUpdateDepartureDate = Joi.object({
  id: Joi.number().required(),
  package_id: Joi.number().required(),
  for_month: Joi.string().required(),
  from_date: Joi.string().required(),
  to_date: Joi.string().required(),
  max_seats: Joi.number().required(),
  avilibility_text: Joi.string().optional().allow(""),
  avilibility_color: Joi.string().valid("Red", "Green", "Yellow"),
});

// Gallery
export const VAddPackageGallery = Joi.object({
  package_id: Joi.number().required(),
  media_info: Joi.array()
    .items(
      Joi.object({
        media_id: Joi.number().required(),
        item_link : Joi.string().optional(),
        alt_tag : Joi.string().optional(),
        where_to_use: Joi.string().required(),
      })
    )
    .required(),
});

// package faq
export const VAddPackageFaq = Joi.object({
  package_id: Joi.number().required(),
  faq_heading: Joi.string().required(),
  faq_detail: Joi.string().required(),
});

export const VUpdatePackageFaq = Joi.object({
  id: Joi.number().required(),
  package_id: Joi.number().required(),
  faq_heading: Joi.string().required(),
  faq_detail: Joi.string().required(),
});

// package itinerary
export const VAddPackageItinerary = Joi.object({
  package_id: Joi.number().required(),
  itinerary_heading: Joi.string().required(),
  itinerary_subheading: Joi.string().required(),
  itinerary_details: Joi.string().required(),
});

export const VUpdatePackageItinerary = Joi.object({
  id: Joi.number().required(),
  package_id: Joi.number().required(),
  itinerary_heading: Joi.string().required(),
  itinerary_subheading: Joi.string().required(),
  itinerary_details: Joi.string().required(),
});

//package overview
export const VPackageOverview = Joi.object({
  package_id: Joi.number().required(),
  overview: Joi.string().required(),
});

export const VUpdatePackageGallery = Joi.object({
  id: Joi.number().required(),
  where_to_use: Joi.string().required(),
});

// package and other
export const VPackageAndOther = Joi.object({
  package_id: Joi.number().required(),
  option_name: Joi.string().required(),
  option_content: Joi.string().required(),
});

export const VUpdatePackageAndOther = Joi.object({
  id: Joi.number().required(),
  package_id: Joi.number().required(),
  option_name: Joi.string().required(),
  option_content: Joi.string().required(),
});

// package and seo
export const VPackageAndSeo = Joi.object({
  package_id : Joi.number().required(),
  meta_title: Joi.string().required(),
  meta_description: Joi.string().required(),
  meta_keywords: Joi.string().required(),
  canonical: Joi.string().optional(),
})