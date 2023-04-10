import { CarProfileSchema } from 'services/carProfile/schema';
import { z } from 'zod';

export const RouteCoordinateSchema = z.object({
  accuracy: z.number().nullable(),
  altitude: z.number().nullable(),
  altitudeAccuracy: z.number().nullable(),
  heading: z.number().nullable(),
  latitude: z.number(),
  longitude: z.number(),
  speed: z.number().nullable(),
});

export const TripSchema = z.object({
  id: z.number(),
  startedAt: z.string(),
  endedAt: z.string(),
  routeCoordinates: RouteCoordinateSchema.array(),
  carProfile: CarProfileSchema,
  fuelConsumption: z.number(),
  co2Emissions: z.number(),
  averageSpeed: z.number(),
});

export const CreateTripSchema = z.object({
  success: z.boolean(),
  data: TripSchema,
});

export const PaginatedTripResponseSchema = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: TripSchema.array(),
});

export const TripSchemaPayload = TripSchema.extend({
  carProfileId: z.number(),
})
  .omit({ carProfile: true, id: true })
  .transform(({ fuelConsumption, co2Emissions, averageSpeed, ...rest }) => ({
    ...rest,
    fuelConsumption: parseFloat(fuelConsumption.toFixed(2)),
    co2Emissions: parseFloat(co2Emissions.toFixed(2)),
    averageSpeed: parseFloat(averageSpeed.toFixed(2)),
  }));
