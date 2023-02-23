import { QueryConfig } from "pg";
import { client } from "../../database";
import format from "pg-format";

const getProfile = async (profile: number) => {
  const queryString: string = format(`

SELECT "id", "name", "email", "admin", "active" 
FROM 
users
WHERE id= $1;
`);

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [profile],
  };

  const { rows } = await client.query(queryConfig.text, queryConfig.values);

  return rows[0];
};

export default getProfile;
