// lib/axios.ts
import axios from "axios";

const api = axios.create({
  baseURL:
    (typeof window !== "undefined"
      ? process.env.NEXT_PUBLIC_API_BASE_URL
      : process.env.INNER_API_BASE_URL) || "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default api;
