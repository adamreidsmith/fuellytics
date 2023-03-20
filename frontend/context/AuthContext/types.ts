import { AxiosError } from 'axios';
import { QueryStatus, UseMutateAsyncFunction } from 'react-query';
import {
  LoginPayload,
  CurrentUserReponse,
  LoginReponse,
  RegisterReponse,
  RegisterPayload,
} from '../../services/authentication';

export type AuthContextType = {
  user?: CurrentUserReponse['data'];
  login: UseMutateAsyncFunction<LoginReponse, unknown, LoginPayload, unknown>;
  register: UseMutateAsyncFunction<
    RegisterReponse,
    unknown,
    RegisterPayload,
    unknown
  >;
  logout: UseMutateAsyncFunction<
    {
      success: boolean;
    },
    AxiosError<unknown, any>,
    void,
    unknown
  >;
  status: QueryStatus;
};
