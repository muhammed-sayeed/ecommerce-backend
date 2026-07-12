import { z } from "zod";

const createAddressSchema = z.object({
  body: z.object({
    
    label: z.string().trim().min(2).max(30).optional(),
    fullName: z.string().trim().min(2).max(100),
    mobile: z.string().regex(/^[6-9]\d{9}$/, "Invalid mobile number"),
    addressLine1: z.string().trim().min(5).max(200),
    addressLine2: z.string().trim().max(200).optional(),
    city: z.string().trim().min(2).max(100),
    state: z.string().trim().min(2).max(100),
    postalCode: z.string().regex(/^\d{6}$/, "Invalid postal code"),
    country: z.string().trim().min(2).max(100).default("India"),
    landmark: z.string().trim().max(200).optional(),
    addressType: z.enum(["HOME", "WORK", "OTHER"]).default("HOME"),
    isDefault: z.boolean().optional(),
    
  }),
});

export default {
  createAddressSchema,
};
