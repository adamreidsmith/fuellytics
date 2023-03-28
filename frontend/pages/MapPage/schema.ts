import z from 'zod';

export const MessageSchema = z
  .object({
    fuel: z.number(),
    speed: z.number(),
    co2: z.number(),
    co: z.number(),
    nox: z.number(),
    unburned_hydrocarbons: z.number(),
    particulate: z.number(),
  })
  .transform((el) => ({
    ...el,
    unburnedHydrocarbons: el.unburned_hydrocarbons,
  }));
