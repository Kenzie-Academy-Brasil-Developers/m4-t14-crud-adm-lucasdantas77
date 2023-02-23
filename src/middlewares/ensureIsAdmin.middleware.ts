import { Request, Response, NextFunction } from "express";

const ensureIsAdmin = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const authenticatedUser = request.user.id;
  const admin = request.user.admin;
  const idParam = request.params.id;

  if (admin) {
    return next();
  } else if (parseInt(idParam) != authenticatedUser) {
    return response.status(403).json({
      message: "Insufficient permission",
    });
  }

  next();
};

export { ensureIsAdmin };
