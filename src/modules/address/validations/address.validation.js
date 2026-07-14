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

const getAddressSchema = z.object({
  params: z.object({
    id: z.coerce.number().int().positive(),
  }),
});

const updateAddressSchema = z.object({
  params: z.object({
    id: z.coerce.number().int().positive(),
  }),

  body: z
    .object({
      label: z.string().trim().min(2).max(30).optional(),

      fullName: z.string().trim().min(2).max(100).optional(),

      mobile: z
        .string()
        .regex(/^[6-9]\d{9}$/, "Invalid mobile number")
        .optional(),

      addressLine1: z.string().trim().min(5).max(200).optional(),

      addressLine2: z.string().trim().max(200).optional(),

      city: z.string().trim().min(2).max(100).optional(),

      state: z.string().trim().min(2).max(100).optional(),

      postalCode: z
        .string()
        .regex(/^\d{6}$/, "Invalid postal code")
        .optional(),

      country: z.string().trim().min(2).max(100).optional(),

      landmark: z.string().trim().max(200).optional(),

      addressType: z.enum(["HOME", "WORK", "OTHER"]).optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
      message: "At least one field must be provided for update.",
    }),
});

const setDefaultAddressSchema = z.object({
  params: z.object({
    id: z.coerce.number().int().positive(),
  }),
});

export default {
  createAddressSchema,
  getAddressSchema,
  updateAddressSchema,
  setDefaultAddressSchema
};
