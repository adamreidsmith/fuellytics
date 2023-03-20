import { z } from 'zod';
import { AxiosError } from 'axios';
import { QueryKey, UseMutationOptions, UseQueryOptions } from 'react-query';
import {
  AuthenticationSchema,
  GetCSRFTokenSchema,
  LogoutSchema,
} from './schema';

export type LoginReponse = z.infer<typeof AuthenticationSchema>;

export type RegisterReponse = z.infer<typeof AuthenticationSchema>;

export type CurrentUserReponse = z.infer<typeof AuthenticationSchema>;

export type GetCSRFTokenResponse = z.infer<typeof GetCSRFTokenSchema>;

export type LogoutReponse = z.infer<typeof LogoutSchema>;

export type LoginPayload = {
  username: string;
  password: string;
};

export type RegisterPayload = {
  email: string;
  password: string;
  username: string;
};

export interface CurrentUserVariables
  extends Omit<
    UseQueryOptions<
      CurrentUserReponse,
      AxiosError,
      CurrentUserReponse,
      QueryKey
    >,
    'queryFn'
  > {}

export interface GetCSRFTokenVariables
  extends Omit<
    UseQueryOptions<
      GetCSRFTokenResponse,
      AxiosError,
      GetCSRFTokenResponse,
      QueryKey
    >,
    'queryFn'
  > {}

export interface LoginVariables
  extends Omit<
    UseMutationOptions<LoginReponse, AxiosError, LoginPayload, unknown>,
    'mutationFn' | 'mutationKey'
  > {}

export interface RegisterVariables
  extends Omit<
    UseMutationOptions<RegisterReponse, AxiosError, RegisterPayload, unknown>,
    'mutationFn' | 'mutationKey'
  > {}

export interface LogoutVariables
  extends Omit<
    UseMutationOptions<LogoutReponse, AxiosError, unknown, unknown>,
    'mutationFn' | 'mutationKey'
  > {}
