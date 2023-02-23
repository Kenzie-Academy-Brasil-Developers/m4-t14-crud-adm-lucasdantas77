import { NextFunction, Request, Response } from "express";
import Jwt from "jsonwebtoken";
import { AppError } from "../error";

const ensureTokenIsValid = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  let token = request.headers.authorization;
  
  if (!token) {
    throw new AppError("Token is not valid", 401);
  }

  token = token.split(" ")[1];

  Jwt.verify(token, "CHAVE SECRETA", (error, decoded: any) => {
    if (error) {
      throw new AppError(error.message, 401);
    }

   request.user  = {
      id: parseInt(decoded.sub),
      role: decoded.role,
    };
    return next();
  });
};

export { ensureTokenIsValid };
