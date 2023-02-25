import { Request, Response, NextFunction } from "express";
import { AppError } from "../error";

const ensureIsAdmin = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const authenticatedUser = request.user.id;
  const admin = request.user.admin;
  const idParam = request.params.id;

  if (parseInt(idParam) === authenticatedUser || admin === true) {
    return next();
  } else {
    return response.status(403).json({
      message: "Insufficient permission",
    });
  }
};

const verifyToken = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const authentication = request.user.admin;

  if (authentication === false) {
    throw new AppError("Insufficient Permission", 403);
  }

  return next();
};

const verifyActive = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const isActive = request.user.active;
  console.log(isActive);

  if (isActive === true) {
    throw new AppError("user already active", 404);
  } else {
    return next();
  }
};

const verifyActiveFalse = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const isActive = request.user.active;

  if (isActive === false) {
    throw new AppError("user already active", 404);
  } else {
    return next();
  }
};

export { ensureIsAdmin, verifyToken, verifyActive, verifyActiveFalse };
