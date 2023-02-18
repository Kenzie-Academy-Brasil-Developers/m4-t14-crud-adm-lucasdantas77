import { QueryConfig, QueryResult } from "pg";
import format from "pg-format";
import { client } from "../../database";
import { AppError } from "../../error";
import {
  iUserPassword,
  iUserRequest,
  iUserResult,
} from "../../interfaces/users.interfaces";

const createUsers = async (userData: iUserRequest): Promise<iUserPassword> => {
  const queryUsersExists: string = `
  SELECT
  *
  FROM
  users
  WHERE "email" = $1;
  
  `;
  const queryConfigUserExists: QueryConfig = {
    text: queryUsersExists,
    values: [userData.email],
  };

  const queryResultUserExists: QueryResult = await client.query(
    queryConfigUserExists
  );

  if (queryResultUserExists.rowCount > 0) {
    throw new AppError("user already exists!", 409);
  }

  const queryString: string = format(
    `
    INSERT INTO
    users(%I)
    VALUES(%L)
    RETURNING "id", "name", "email", "admin", "active" 

    `,
    Object.keys(userData),
    Object.values(userData)
  );

  const queryResult: iUserResult = await client.query(queryString);
  return queryResult.rows[0];
};

export default createUsers;
