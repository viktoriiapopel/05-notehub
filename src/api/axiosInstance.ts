import axios from "axios";
import type { AxiosInstance } from "axios";

const NOTEHUB_BEARER_TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

if (!NOTEHUB_BEARER_TOKEN) {
  console.warn("⚠️ NOTEHUB Bearer token not found. Set VITE_NOTEHUB_TOKEN in your .env");
}

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  timeout: 10000,
  headers: {
    Authorization: `Bearer ${NOTEHUB_BEARER_TOKEN}`,
  },
});

export default axiosInstance;
