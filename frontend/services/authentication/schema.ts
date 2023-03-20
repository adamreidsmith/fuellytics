import { z } from 'zod';

export const AuthenticationSchema = z.object({
  success: z.boolean(),
  data: z
    .object({
      id: z.number(),
      password: z.string(),
      lastLogin: z.string(),
      isSuperuser: z.boolean(),
      username: z.string(),
      firstName: z.string(),
      lastName: z.string(),
      email: z.string(),
      isStaff: z.boolean(),
      isActive: z.boolean(),
      dateJoined: z.string(),
      groups: z.array(z.any()),
      userPermissions: z.array(z.any()),
    })
    .nullable(),
});

export const LogoutSchema = z.object({
  success: z.boolean(),
});

export const GetCSRFTokenSchema = z.object({
  success: z.boolean(),
  data: z.string(),
});
