import { Router } from "express";
import {
  createUsersControler,
  deleteUsersControler,
  getUsersControler,
  patchUsersControler,
} from "../controllers/user.controllers";
import { ensureTokenIsValid } from "../middlewares/ensureTokenIsValid.middleware";
import { userExistMiddlewares } from "../middlewares/userExistsMiddleware";

const useRouter: Router = Router();

useRouter.post("", createUsersControler);
useRouter.get("", ensureTokenIsValid, getUsersControler);
useRouter.delete(
  "/:id",
  ensureTokenIsValid,
  userExistMiddlewares,
  deleteUsersControler
);
useRouter.patch(
  "/:id",
  ensureTokenIsValid,
  userExistMiddlewares,
  patchUsersControler
);

export default useRouter;
