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

export const CreateCarSchema = z.object({
  success: z.boolean(),
  data: CarSchema,
});

export const CreateCartPayloadSchema = z.object({
  make: z.string(),
  model: z.string(),
  displacement: z.string(),
  year: z.string(),
  isSupercharged: z.boolean(),
  drag: z.string(),
  imageUrl: z.string().optional(),
});
