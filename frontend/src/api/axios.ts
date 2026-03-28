import axios from "axios";
import { getItem, removeItem } from "../utils/localstorage";

export const api = axios.create({
  baseURL: "http://localhost:3000/api/",
});

api.interceptors.request.use((config) => {
  const token = getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const isAuthRoute =
        window.location.pathname.includes("/login") ||
        window.location.pathname.includes("/register");

      if (!isAuthRoute) {
        removeItem("token");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  },
);
