import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
import { verifyAccessToken } from "../utils/jwt";

interface AuthRequest extends Request {
  user?: any;
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(new AppError("Unauthorized", 401, "UNAUTHORIZED"));
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return next(new AppError("Unauthorized", 401, "UNAUTHORIZED"));
    }

    const decoded = verifyAccessToken(token);
    req.user = decoded;

    next();
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      return next(new AppError("Token expired", 401, "TOKEN_EXPIRED"));
    }

    return next(new AppError("Invalid token", 401, "INVALID_TOKEN"));
  }
};

export const adminMiddleWare = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  if (req.user.role !== "ADMIN") {
    return next(new AppError("Unauthorized", 401, "UNAUTHORIZED"));
  }
  next();
};
