import { Router } from "express";
import { loginControler } from "../controllers/login.controler";
import { VerifyLoginUser } from "../middlewares/userLoginExists";
import { createLoginSchema } from "../schemas/login.schemas";

const loginRouter: Router = Router();

loginRouter.post("", VerifyLoginUser(createLoginSchema), loginControler);

export { loginRouter };
