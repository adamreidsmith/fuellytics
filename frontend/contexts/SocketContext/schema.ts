import z from 'zod';

export const MessageSchema = z
  .object({
    fuel_current: z.number(),
    speed: z.number(),
    co2_current: z.number(),
    co_current: z.number(),
    nox_current: z.number(),
    unburned_hc_current: z.number(),
    particulate_current: z.number(),
  })
  .transform((el) => ({
    speed: el.speed,
    fuelCurrent: el.fuel_current,
    co2Current: el.co2_current,
    coCurrent: el.co_current,
    noxCurrent: el.nox_current,
    unburnedHcCurrent: el.unburned_hc_current,
    particulateCurrent: el.particulate_current,
  }));
