import { z } from 'zod';

const healthCheckSchema = z.object({
    body: z.object({}).optional(),
    query: z.object({}).optional(),
    params: z.object({}).optional(),
});

export default {
    healthCheckSchema,
};