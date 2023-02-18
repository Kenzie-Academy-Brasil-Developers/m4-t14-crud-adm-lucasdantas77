import { Request, Response } from "express";
import { iUserRequest } from "../interfaces/users.interfaces";
import createUsers from "../services/users/createUsers.service";
import getUsers from "../services/users/getUsers.service";
import deleteUsers from "../services/users/deleteUsers.service";
export const createUsersControler = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const userData: iUserRequest = request.body;

  const newUser = await createUsers(userData);
  return response.status(201).json(newUser);
};

export const getUsersControler = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const userData = await getUsers();
  return response.status(200).json(userData);
};


export const deleteUsersControler  = async (
  request: Request,
  response: Response
): Promise<Response> => {

  const userId= parseInt(request.params.id)

  await deleteUsers(userId)

  return response.status(204).send()
}