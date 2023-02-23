import { hashSync } from "bcryptjs";
import { z } from "zod";

const createUserSchemas = z.object({
  name: z.string().min(3).max(45),
  email: z.string().email(),
  password: z.string().transform((pass) => {
    return hashSync(pass, 10);
  }),
  admin: z.boolean().optional(),
  active: z.boolean().optional(),
});

const returnUserSchema = createUserSchemas.extend({
  id: z.number(),
});

export { createUserSchemas, returnUserSchema };
