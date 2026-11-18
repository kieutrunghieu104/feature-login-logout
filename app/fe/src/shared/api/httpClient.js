import axios from "axios";

import env from "~/config/env";
import setupInterceptors from "./interceptors";

const httpClient = axios.create({
  baseURL: env.VITE_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
setupInterceptors(httpClient);
export default httpClient;