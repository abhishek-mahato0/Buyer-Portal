import type { RegisterData } from "../../types/auth.types";
import { api } from "../axios";

export const registerApi = async (data: RegisterData) => {
  const res = await api.post("auth/register", data);
  return res.data;
};
