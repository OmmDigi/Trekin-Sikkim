import { z } from "zod";
import { categoryFormSchema } from "./categoryValidator";

export interface ICategories {
  category_id: number;
  category_name: string;
  category_type_id: number;
  category_type: string;
  slug : string;
}

export type TCategoryForm = z.infer<typeof categoryFormSchema>;

export interface ICategoryUpdate {
  category_id: number;
  new_category_name : string;
  new_category_type : number;
}
