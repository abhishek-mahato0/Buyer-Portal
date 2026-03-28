import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
import { sendError } from "../utils/response";

type SchemaResponse = {
  success: boolean;
  value: any;
  errors: {
    message: string;
  }[];
};

export const validate =
  (schema: any) => (req: Request, res: Response, next: NextFunction) => {
    const result: SchemaResponse = schema.safeParse(req.body);

    if (!result.success) {
      const message = result.errors.map((e: any) => e.message).join(", ");
      console.log(message, result.errors, "result");
      sendError(res, message, 400);
      return;
    }
    req.body = result.value;
    next();
  };
