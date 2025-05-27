import { z } from "zod";
import { categoryFormSchema } from "./categoryValidator";

export interface ICategories {
  category_id: number;
  category_name: string;
  category_type_id: number;
  category_type: string;
  slug: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  canonical?: string;
}

export type TCategoryForm = z.infer<typeof categoryFormSchema>;

export interface ICategoryUpdate {
  category_id: number;
  new_category_name: string;
  new_category_type: number;
  new_meta_title: string;
  new_meta_description: string;
  new_meta_keywords: string;
  new_category_slug: string;
  new_canonical?: string;
}
