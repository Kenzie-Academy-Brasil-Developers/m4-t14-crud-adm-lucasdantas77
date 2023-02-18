import { NextFunction, Request, Response } from "express";

class AppError extends Error {
  message: string;
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super();
    (this.message = message), (this.statusCode = statusCode);
  }
}

const handleErrors = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      message: error.message,
    });
  }
};

export { AppError, handleErrors };
