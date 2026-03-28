import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
import { sendError } from "../utils/response";

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof AppError) {
    sendError(res, err, err.statusCode);
  } else {
    sendError(res, "Internal Server Error", 500);
  }
};
