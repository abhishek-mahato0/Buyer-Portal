import type { LoginData } from "../../types/auth.types";
import { api } from "../axios";

export const loginApi = async (data: LoginData) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};
