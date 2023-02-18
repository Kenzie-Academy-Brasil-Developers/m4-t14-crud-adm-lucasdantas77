import "express-async-errors"
import express, { Application } from "express";
import useRouter from "./routers/user.routes"
import { handleErrors } from "./error";
const app: Application = express()
app.use(express.json())

app.use("/users", useRouter)

app.use(handleErrors)


export default app