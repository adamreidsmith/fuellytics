import { CarSchema } from 'services/cars';
import { z } from 'zod';

export const CarProfileSchema = z.object({
  id: z.number(),
  car: CarSchema,
  imageUrl: z.string().nullable(),
});

export const CarProfileResponseSchema = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: CarProfileSchema.array(),
});

export const CreateCartPayloadSchema = z.object({
  carId: z.string(),
});

export const CreateCarProfileSchema = z.object({
  success: z.boolean(),
  data: z.object({
    id: z.number(),
    car: CarProfileSchema,
    imageUrl: z.string().nullable(),
  }),
});
