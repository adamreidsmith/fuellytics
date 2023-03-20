import z from 'zod';

const CarSchema = z.object({});

export const CarResponseSchema = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: CarSchema.array(),
});
