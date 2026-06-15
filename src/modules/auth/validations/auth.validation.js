import { z } from "zod";

const sendOtpSchema = z.object({
  body: z.object({
    mobile: z.string().regex(/^[0-9]{10,15}$/, "Invalid mobile number"),
  }),
});

const verifyOtpSchema = z.object({
  body: z.object({
    mobile: z.string().regex(/^[0-9]{10,15}$/),

    otp: z.string().length(6),
  }),
});

const refreshTokenSchema = z.object({
  body: z.object({
    refreshToken: z.string(),
  }),
});

export default {
  sendOtpSchema,
  verifyOtpSchema,
  refreshTokenSchema
};
