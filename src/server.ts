import app from "./app";
import { conectDataBase } from "./database";

app.listen(3000, async () => {
  await conectDataBase();
  console.log("Server is running!");
});
