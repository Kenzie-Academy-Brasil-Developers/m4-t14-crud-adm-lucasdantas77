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
import { ensureIsAdmin } from "../middlewares/ensureIsAdmin.Middleware";

const useRouter: Router = Router();

useRouter.post("", createUsersControler);
useRouter.get("", ensureTokenIsValid, getUsersControler);
useRouter.delete(
  "/:id",
  ensureTokenIsValid,
  userExistMiddlewares,
  ensureIsAdmin,
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

useRouter.put("/:id/recover", putUsersControler);

export default useRouter;
