import axios from "axios";

const version = "v1";

const BASE_URL = process.env.NEXT_PUBLIC_API_URI || "http://localhost:8000";
export const tempCode = process.env.NEXT_PUBLIC_TEMP_CODE;

const API_URL = `${BASE_URL}/api/${version}`;

export const API_MERCHANT = axios.create({
  baseURL: `${API_URL}/merchant`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});
export const API_ADMIN = axios.create({
  baseURL: `${API_URL}/admin`,
});
