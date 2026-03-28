import { asyncHandler } from "../../utils/asyncHandler";
import { sendError, sendSuccess } from "../../utils/response";
import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { AppError } from "../../utils/AppError";

const authService = new AuthService();

export const register = asyncHandler(async (req: Request, res: Response) => {
  const data = await authService.register(req.body);
  res.cookie("token", data.accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.cookie("refreshToken", data.refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  sendSuccess(res, data, "User registered");
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const data = await authService.login(req.body);
  res.cookie("token", data.accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.cookie("refreshToken", data.refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
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
  res.clearCookie("token");
  res.clearCookie("refreshToken");
  sendSuccess(res, null, "Logged out successfully");
});
