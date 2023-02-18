import { QueryResult } from "pg"

interface iUserRequest{
    name:string,
    email:string,
    password:string,
    admin:boolean,
    active: boolean
}


interface iUser extends iUserRequest{
    id:number
}

type iUserPassword = Omit<iUser, "password">
type iUserResult = QueryResult<iUserPassword>

export{
    iUserRequest,
    iUser,
    iUserPassword,
    iUserResult
}