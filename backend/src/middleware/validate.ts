import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";

export const validate =
  (schema: any) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const message = result.error.errors.map((e: any) => e.message).join(", ");

      throw new AppError(message, 400);
    }
    req.body = result.data;
    next();
  };
