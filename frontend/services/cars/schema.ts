import z from 'zod';

export const CarSchema = z.object({
  id: z.number(),
  make: z.string(),
  model: z.string(),
  displacement: z.number(),
  year: z.number(),
  isSupercharged: z.boolean(),
  drag: z.number(),
  imageUrl: z.string().nullable(),
});

export const CarResponseSchema = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: CarSchema.array(),
});
