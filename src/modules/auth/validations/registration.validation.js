import { z } from "zod";

const completeRegistrationSchema = z.object({
  body: z.object({
    mobile: z.string().regex(/^[0-9]{10,15}$/, "Invalid mobile number"),

    firstName: z
      .string()
      .trim()
      .min(2, "First name must be at least 2 characters")
      .max(50, "First name cannot exceed 50 characters"),
  }),
});

export default {
  completeRegistrationSchema,
};
