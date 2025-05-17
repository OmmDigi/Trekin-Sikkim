import api from "@/lib/axios";
import { ICategoryUpdate, TCategoryForm } from "../types";

export const getAllCategories = async (category_type? : string | null) => {
  const response = await api.get("/api/v1/category" + (category_type ? `?category_type=${category_type}` : ''));
  return response.data;
};

export const addNewCategory = async (payload: TCategoryForm) => {
  const response = await api.post("/api/v1/category", payload);
  return response.data;
};

export const updateCategory = async (payload: ICategoryUpdate) => {
  const response = await api.put(
    "/api/v1/category/" + payload.category_id,
    payload
  );
  return response.data;
};

export const getSingleCategory = async (category_id : number) => {
  const response = await api.get("/api/v1/category/" + category_id);
  return response.data;
}

export const deleteACategory = async (category_id : number) => {
  const response = await api.delete("/api/v1/category/" + category_id);
  return response.data;
}