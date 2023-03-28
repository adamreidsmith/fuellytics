import { CarProfileSchema } from 'services/carProfile/schema';
import { z } from 'zod';

export const TripSchema = z.object({
  startedAt: z.string(),
  endedAt: z.string(),
  routeCoordinates: z.tuple([z.number(), z.number()]).array(),
  carProfile: CarProfileSchema,
  fuelConsumption: z.number(),
  co2Emissions: z.number(),
  n2oEmissions: z.number(),
  ch4Emissions: z.number(),
});

export const PaginatedTripResponseSchema = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: TripSchema.array(),
});

export const TripSchemaPayload = TripSchema.extend({
  carId: z.string(),
}).omit({ carProfile: true });
