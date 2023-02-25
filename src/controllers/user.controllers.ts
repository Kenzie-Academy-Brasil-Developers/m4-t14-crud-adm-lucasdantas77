import { Request, Response } from "express";
import { iUserRequest } from "../interfaces/users.interfaces";
import createUsers from "../services/users/createUsers.service";
import getUsers from "../services/users/getUsers.service";
import deleteUsers from "../services/users/deleteUsers.service";
import patchUsers from "../services/users/patchUsers.services";
import putUsersRecover from "../services/users/putUsers.services";
import getProfile from "../services/users/getUsersProfile.services";

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

export const deleteUsersControler = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const userId = parseInt(request.params.id);

  await deleteUsers(userId);
  return response.status(204).send();
};

export const patchUsersControler = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const userId = parseInt(request.params.id);
  const userData = request.body.name;

  const newUser = await patchUsers(userData, userId);

  return response.json(newUser);
};

export const putUsersControler = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const userId = parseInt(request.params.id);

  const newUser = await putUsersRecover(userId);
  return response.json(newUser);
};

export const getProfileControler = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const profile = request.user.id;

  const newUser = await getProfile(profile);

  return response.json(newUser);
};
