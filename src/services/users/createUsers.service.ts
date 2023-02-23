import { QueryConfig, QueryResult } from "pg";
import format from "pg-format";
import { client } from "../../database";
import { AppError } from "../../error";
import { createUserSchemas } from "../../schemas/user.schema";
import {
  iUserPassword,
  iUserRequest,
  iUserResult,
} from "../../interfaces/users.interfaces";
import { hash } from "bcryptjs";

const createUsers = async (userData: iUserRequest): Promise<iUserPassword> => {
 
 const validateUserData = createUserSchemas.parse(userData)

 const hashPassword = await hash(userData.password, 10)
 userData.password = hashPassword
 
  const queryUsersExists: string = `
  SELECT
  *
  FROM
  users
  WHERE "email" = $1;
  
  `;
  const queryConfigUserExists: QueryConfig = {
    text: queryUsersExists,
    values: [validateUserData.email],
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
    RETURNING "id", "name", "email", "admin", "active";

    `,
    Object.keys(validateUserData),
    Object.values(validateUserData)
  );

  const queryResult: iUserResult = await client.query(queryString);
  return queryResult.rows[0];
};

export default createUsers;
