import { Response } from "express";
import { AppError } from "./AppError";

export const sendSuccess = (res: Response, data: any, message = "Success") => {
  return res.json({
    success: true,
    message,
    data,
  });
};

export const sendError = (
  res: Response,
  error: AppError | string,
  status = 400,
) => {
  let message = "Error";

  if (error instanceof AppError) {
    message = error.message;
    status = error.statusCode;
  } else {
    message = error;
  }

  return res.status(status).json({
    success: false,
    message,
  });
};
