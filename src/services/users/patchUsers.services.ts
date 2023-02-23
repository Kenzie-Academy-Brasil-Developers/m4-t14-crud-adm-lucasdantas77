import { QueryConfig } from "pg";
import { client } from "../../database";

const patchUsers = async (userData: string, userid: number): Promise<void> => {
  const queryString: string = `
  UPDATE
      users
    SET 
      name = $1
    WHERE 
      id = $2
      RETURNING "id", "name", "email", "admin", "active";
     `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [userData, userid],
  };

  const queryResult = await client.query(queryConfig);

  return queryResult.rows[0];
};

export default patchUsers;
