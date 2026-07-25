import { z } from "zod";

const createCategorySchema = z.object({
  body: z.object({
    name: z.string().trim().min(2).max(100),

    description: z.string().trim().max(500).optional(),

    image: z.string().url("Image must be a valid URL").optional(),

    displayOrder: z.number().int().min(0).optional(),
  }),
});

const getCategorySchema = z.object({
  params: z.object({
    id: z.coerce.number().int().positive(),
  }),
});

const updateCategorySchema = z.object({
  params: z.object({
    id: z.coerce.number().int().positive(),
  }),

  body: z
    .object({
      name: z.string().trim().min(2).max(100).optional(),

      description: z.string().trim().max(500).optional(),

      image: z.string().url("Image must be a valid URL").optional(),

      displayOrder: z.number().int().min(0).optional(),

      isActive: z.boolean().optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
      message: "At least one field must be provided for update.",
    }),
});

export default {
  createCategorySchema,
  getCategorySchema,
  updateCategorySchema,
};
