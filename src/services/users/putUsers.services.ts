import { QueryConfig } from "pg";
import { client } from "../../database";
import { AppError } from "../../error";

const putUsersRecover = async (userId: number): Promise<void> => {
  const queryString: string = `
    UPDATE
    users
    SET
    active = true
    WHERE
    id = $1
    RETURNING "id", "name", "email", "admin", "active"
    `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [userId],
  };

  await client.query(queryConfig);
};

export default putUsersRecover;
