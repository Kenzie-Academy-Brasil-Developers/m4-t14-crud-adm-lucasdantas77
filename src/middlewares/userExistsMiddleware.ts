import { NextFunction, Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../database";
import { AppError } from "../error";

export const userExistMiddlewares = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const userId = parseInt(request.params.id);

  const queryStringUserExists: string = `
    SELECT
    *
    FROM
     users
     WHERE
     id = $1;
     `;

  const queryConfigUserExists: QueryConfig = {
    text: queryStringUserExists,
    values: [userId],
  };

  const queryResult: QueryResult = await client.query(queryConfigUserExists);

  if (queryResult.rowCount === 0) {
    throw new AppError("user not found", 404);
  }
  return next()
};
