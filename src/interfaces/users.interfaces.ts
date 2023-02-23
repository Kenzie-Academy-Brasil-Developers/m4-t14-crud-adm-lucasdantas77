import { QueryResult } from "pg"
import {z} from "zod"
import { createUserSchemas, returnUserSchema } from "../schemas/user.schema"

type iUserRequest= z.infer<typeof createUserSchemas>
type iUser = z.infer<typeof returnUserSchema>
type iUserWithPassword = QueryResult<iUser>

type iUserPassword = Omit<iUser, "password">
type iUserResult = QueryResult<iUserPassword>
type iUserEdit = Omit<iUser,"id admin active">
type iUserResultEdit = QueryResult<iUserEdit>

export{
    iUserRequest,
    iUser,
    iUserPassword,
    iUserResult,
    iUserResultEdit,
    iUserWithPassword
}