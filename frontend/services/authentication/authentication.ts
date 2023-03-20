import { AxiosError } from 'axios';
import { useMutation, useQuery } from 'react-query';
import {
  getCSRFToken,
  getCurrentUser,
  login,
  register,
  logout,
} from './requests';
import {
  LoginPayload,
  GetCSRFTokenResponse,
  CurrentUserReponse,
  GetCSRFTokenVariables,
  LoginReponse,
  LoginVariables,
  CurrentUserVariables,
  RegisterVariables,
  RegisterPayload,
  LogoutVariables,
  LogoutReponse,
} from './types';

export const useCurrentUser = ({ ...opts }: CurrentUserVariables = {}) => {
  const { data, status, refetch } = useQuery<CurrentUserReponse, AxiosError>(
    ['getCurrentUser'],
    getCurrentUser,
    {
      ...opts,
    },
  );

  const user = data?.data;

  return { user, status, refetch };
};

export const useLogin = ({ ...opts }: LoginVariables = {}) =>
  useMutation<LoginReponse, AxiosError, LoginPayload>('login', login, {
    ...opts,
  });

export const useRegister = ({ ...opts }: RegisterVariables = {}) =>
  useMutation<LoginReponse, AxiosError, RegisterPayload>('register', register, {
    ...opts,
  });

export const useLogout = ({ ...opts }: LogoutVariables = {}) =>
  useMutation<LogoutReponse, AxiosError>('register', logout, {
    ...opts,
  });

export const useCSRFToken = ({ ...opts }: GetCSRFTokenVariables = {}) => {
  const { status, refetch } = useQuery<GetCSRFTokenResponse, AxiosError>(
    ['getCSRFToken'],
    getCSRFToken,
    {
      ...opts,
    },
  );

  return { status, refetch };
};
