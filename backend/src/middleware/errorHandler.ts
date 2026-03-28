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
    sendError(res, err, err.statusCode, err.code);
  } else {
    sendError(res, "Internal Server Error", 500, "INTERNAL_SERVER_ERROR");
  }
};
