import { z } from "zod";

export const categoryFormSchema = z.object({
  category_name: z
    .string()
    .min(2, {
      message: "Category Name must be at least 2 characters.",
    })
    .max(50),
  category_type: z.number().min(1),
  meta_title: z.string().min(1),
  meta_description: z.string().min(1),
  meta_keywords: z.string().min(1),
  canonical: z.string().optional(),
  category_slug: z.string().min(1),
  showinhomepage: z.boolean(),
});
