import { Router } from "express";
import {
  createUsersControler,
  deleteUsersControler,
  getUsersControler,
} from "../controllers/user.controllers";

const useRouter: Router = Router();

useRouter.post("", createUsersControler);
useRouter.get("", getUsersControler);
useRouter.delete("/:id", deleteUsersControler)

export default useRouter;
