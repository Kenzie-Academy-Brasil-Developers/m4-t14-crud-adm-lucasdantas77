import { Router } from "express";
import {
  createUsersControler,
  deleteUsersControler,
  getProfileControler,
  getUsersControler,
  patchUsersControler,
  putUsersControler,
} from "../controllers/user.controllers";
import { ensureTokenIsValid } from "../middlewares/ensureTokenIsValid.middleware";
import { userExistMiddlewares } from "../middlewares/userExistsMiddleware";
import {
  ensureIsAdmin,
  verifyToken,
  verifyActive,
  verifyActiveFalse
} from "../middlewares/ensureIsAuthenticatedUser.middleware";

const useRouter: Router = Router();

useRouter.post("", createUsersControler);
useRouter.get("", ensureTokenIsValid, verifyToken, getUsersControler);
useRouter.delete(
  "/:id",
  ensureTokenIsValid,
  userExistMiddlewares,
  ensureIsAdmin,
  verifyToken,
  verifyActiveFalse,
  deleteUsersControler
);
useRouter.patch(
  "/:id",
  ensureTokenIsValid,
  userExistMiddlewares,
  ensureIsAdmin,
  patchUsersControler
);

useRouter.get("/profile", ensureTokenIsValid, getProfileControler);

useRouter.put(
  "/:id/recover",
  userExistMiddlewares,
  ensureTokenIsValid,
  verifyActive,
  putUsersControler
);

export default useRouter;
