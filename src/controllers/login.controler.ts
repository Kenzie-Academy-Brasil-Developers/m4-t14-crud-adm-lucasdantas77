import { Request, Response } from "express";
import { createLoginService } from "../services/login/createLogin.server";

export const loginControler = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const token = await createLoginService(request.body);
  return response.json({ token: token });
};
