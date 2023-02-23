import { createLoginSchema } from "../schemas/login.schemas";
import { z } from "zod";

type iloginRequest = z.infer<typeof createLoginSchema>;

export{
    iloginRequest
}