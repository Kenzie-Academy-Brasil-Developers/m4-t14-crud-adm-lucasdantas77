import { client } from "../../database";
import { iUserResult } from "../../interfaces/users.interfaces";

const getUsers = async () => {
  const queryString = `
    SELECT "id", "name", "email", "admin", "active" FROM users;
    `;
  const queryResult: iUserResult = await client.query(queryString);
  
  return queryResult.rows;
};

export default getUsers;
