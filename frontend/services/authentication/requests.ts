import { MutationFunction, QueryFunction, QueryKey } from 'react-query';
import API from '../api';
import {
  AuthenticationSchema,
  GetCSRFTokenSchema,
  LogoutSchema,
} from './schema';
import {
  CurrentUserReponse,
  GetCSRFTokenResponse,
  LoginPayload,
  LoginReponse,
  LogoutReponse,
  RegisterPayload,
  RegisterReponse,
} from './types';

export const getCurrentUser: QueryFunction<
  CurrentUserReponse,
  QueryKey
> = async () =>
  API.get('api/accounts/current_user').then((result) =>
    AuthenticationSchema.parse(result.data),
  );

export const getCSRFToken: QueryFunction<
  GetCSRFTokenResponse,
  QueryKey
> = async () =>
  API.get('api/accounts/csrf_cookie').then((result) =>
    GetCSRFTokenSchema.parse(result.data),
  );

export const logout: MutationFunction<LogoutReponse> = async () =>
  API.delete('api/accounts/logout').then((result) =>
    LogoutSchema.parse(result.data),
  );

export const login: MutationFunction<LoginReponse, LoginPayload> = async (
  variables,
) =>
  API.post('api/accounts/login', variables).then((result) =>
    AuthenticationSchema.parse(result.data),
  );

export const register: MutationFunction<
  RegisterReponse,
  RegisterPayload
> = async (variables) =>
  API.post('api/accounts/register', variables).then((result) =>
    AuthenticationSchema.parse(result.data),
  );
