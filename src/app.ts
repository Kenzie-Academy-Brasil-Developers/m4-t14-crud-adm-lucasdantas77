import "express-async-errors"
import express, { Application } from "express";
import useRouter from "./routers/user.routes"
import { handleErrors } from "./error";
import {loginRouter} from "./routers/login.routes"
const app: Application = express()
app.use(express.json())

app.use("/users", useRouter)
app.use("/login", loginRouter)

app.use(handleErrors)


export default app