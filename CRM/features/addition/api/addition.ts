import api from "@/lib/axios";
import { IAddAddition, IAddition } from "../types";

export const addNewAddition = async (payload: IAddAddition) => {
  const response = await api.post("/api/v1/addition", payload);
  return response.data;
};

export const updateAddition = async (payload: IAddition) => {
  const response = await api.put(
    "/api/v1/addition/" + payload.additional_id,
    payload
  );
  return response.data;
};

export const getAddition = async (additional_id : number) => {
  const response = await api.get("/api/v1/addition/" + additional_id);
  return response.data;
};

export const getAdditions = async (page = 1) => {
  const response = await api.get("/api/v1/addition?page=" + page);
  return response.data;
};
