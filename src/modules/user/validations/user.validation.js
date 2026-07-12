import { z } from "zod";

const updateProfileSchema = z.object({
  body: z.object({

    firstName: z.string().trim().min(2).max(50).optional(),
    lastName: z.string().trim().max(50).optional(),
    email: z.string().trim().email().optional(),
    
  }),
});

export default updateProfileSchema;
