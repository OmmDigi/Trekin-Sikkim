import { z } from "zod";

export const categoryFormSchema = z.object({
  category_name: z
    .string()
    .min(2, {
      message: "Category Name must be at least 2 characters.",
    })
    .max(50),
  category_type: z.number().min(1),
});
