import { asyncHandler } from "../../utils/asyncHandler";
import { sendSuccess } from "../../utils/response";
import { Request, Response } from "express";
import { AuthService } from "./auth.service";

const authService = new AuthService();

export const register = asyncHandler(async (req: Request, res: Response) => {
  const data = await authService.register(req.body);
  sendSuccess(res, data, "User registered");
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const data = await authService.login(req.body);
  sendSuccess(res, data, "Login successful");
});

export const refreshToken = asyncHandler(
  async (req: Request, res: Response) => {
    const { token } = req.body;
    const data = await authService.refreshToken(token);
    sendSuccess(res, data, "Token refreshed");
  },
);

export const logout = asyncHandler(async (req: Request, res: Response) => {
  const { token } = req.body;
  await authService.logout(token);
  sendSuccess(res, null, "Logged out successfully");
});
