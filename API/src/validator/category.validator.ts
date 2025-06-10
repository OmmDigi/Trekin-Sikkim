import Joi from "joi";

export const VCategoryPageInfo = Joi.object({
  category_slug: Joi.string().required(),
});

export const VAddCategoryPackages = Joi.object({
  category_id: Joi.number().required(),
  packages_ids: Joi.array().items(Joi.number()),
});

export const VDeleteCategoryPackage = Joi.object({
  category_id: Joi.number().required(),
  package_id: Joi.number().required(),
});

export const VAddNewCategory = Joi.object({
  category_name: Joi.string().required(),
  category_type: Joi.number().required(),
  meta_title: Joi.string().required().allow(""),
  meta_description: Joi.string().required().allow(""),
  meta_keywords: Joi.string().required().allow(""),
  category_slug: Joi.string().required(),
  showinhomepage: Joi.boolean().required(),
  canonical: Joi.string().optional(),
  add_to_footer: Joi.boolean().required(),
});

export const VUpdateACategory = Joi.object({
  category_id: Joi.number().required(),
  new_category_name: Joi.string().required(),
  new_category_type: Joi.number().required(),
  new_meta_title: Joi.string().required().allow(""),
  new_meta_description: Joi.string().required().allow(""),
  new_meta_keywords: Joi.string().required().allow(""),
  new_category_slug: Joi.string().required(),
  showinhomepage: Joi.boolean().required(),
  new_canonical: Joi.string().optional(),
  add_to_footer: Joi.boolean().required(),
});

export const VSingleCategory = Joi.object({
  category_id: Joi.number().required(),
});

// category faq
export const VAddCategoryFaq = Joi.object({
  category_id: Joi.number().required(),
  faq_heading: Joi.string().required(),
  faq_detail: Joi.string().required(),
});

export const VUpdateCategoryFaq = Joi.object({
  id: Joi.number().required(),
  category_id: Joi.number().required(),
  faq_heading: Joi.string().required(),
  faq_detail: Joi.string().required(),
});

//category gallery
export const VAddCategoryGallery = Joi.object({
  category_id: Joi.number().required(),
  media_info: Joi.array()
    .items(
      Joi.object({
        media_id: Joi.number().required(),
        item_link: Joi.string().optional(),
        alt_tag: Joi.string().optional(),
        where_to_use: Joi.string().required(),
      })
    )
    .required(),
});

export const VUpdateCategoryGallery = Joi.object({
  id: Joi.number().required(),
  where_to_use: Joi.string().required(),
});

//category page content
export const VManageCategoryPageContent = Joi.object({
  category_id: Joi.number().required(),
  page_content: Joi.string().required(),
});
