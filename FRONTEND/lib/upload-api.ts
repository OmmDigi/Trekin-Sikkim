// lib/axios.ts
import axios from "axios";

const uploadApi = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_UPLOAD_BASE_URL || "http://localhost:8081",
  headers: {
    "Content-Type": "multipart/form-data",
  },
  withCredentials: true,
});

export default uploadApi;
