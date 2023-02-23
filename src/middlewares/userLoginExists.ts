import { NextFunction } from "express";
import { ZodTypeAny } from "zod";
import { Request, Response } from "express";

export const VerifyLoginUser =
  (schema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => {
    const validatedData = schema.parse(req.body);

    req.body = validatedData;

    return next();
  };