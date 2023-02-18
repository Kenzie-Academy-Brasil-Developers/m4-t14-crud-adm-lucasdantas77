import client from "./config";

const conectDataBase = async (): Promise<void> => {
  await client.connect();
  console.log("Database conected!")
};

export default conectDataBase;
