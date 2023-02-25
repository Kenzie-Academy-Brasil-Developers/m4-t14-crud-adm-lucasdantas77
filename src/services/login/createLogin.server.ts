import { client } from "../../database";
import { iloginRequest } from "../../interfaces/login.interfaces";
import { iUserWithPassword } from "../../interfaces/users.interfaces";
import { AppError } from "../../error";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import { QueryConfig } from "pg";

const createLoginService = async (
  loginData: iloginRequest
): Promise<string> => {
  const queryString: string = `
    SELECT
    *
    FROM
    users   
    WHERE
    "email" = $1;
    
    `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [loginData.email],
  };

  const queryResult: iUserWithPassword = await client.query(queryConfig);

  if (queryResult.rowCount === 0) {
    throw new AppError("wrong email or password", 401);
  }

  const matchPassword: boolean = await compare(
    loginData.password,
    queryResult.rows[0].password
  );

  if (!matchPassword) {
    throw new AppError("wrong email or password", 401);
  }

  const token: string = jwt.sign(
    {
      admin: queryResult.rows[0].admin,
    },
    "CHAVE SECRETA",
    {
      expiresIn: "24h",
      subject: queryResult.rows[0].id.toString(),
    }
  );

  return token;
};

export { createLoginService };
