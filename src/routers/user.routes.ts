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
import { ensureIsAdmin, verify } from "../middlewares/ensureIsAuthenticatedUser.middleware";

const useRouter: Router = Router();

useRouter.post("", createUsersControler);
useRouter.get("", ensureTokenIsValid, verify, getUsersControler);
useRouter.delete(
  "/:id",
  ensureTokenIsValid,
  userExistMiddlewares,
  ensureIsAdmin,
  verify,
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

useRouter.put("/:id/recover", userExistMiddlewares, putUsersControler);

export default useRouter;
