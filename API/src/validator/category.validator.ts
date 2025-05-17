import Joi from "joi";

export const VCategoryPageInfo = Joi.object({
  category_slug: Joi.string().required(),
});

export const VAddNewCategory = Joi.object({
  category_name: Joi.string().required(),
  category_type: Joi.number().required(),
});

export const VUpdateACategory = Joi.object({
  category_id: Joi.number().required(),
  new_category_name: Joi.string().required(),
  new_category_type: Joi.number().required(),
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
  page_content : Joi.string().required()
})