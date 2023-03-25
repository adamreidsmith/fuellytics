import { AxiosError } from 'axios';
import {
  QueryKey,
  UseInfiniteQueryOptions,
  UseMutationOptions,
} from 'react-query';
import { z } from 'zod';
import {
  CarProfileResponseSchema,
  CreateCarProfileSchema,
  CreateCartPayloadSchema,
} from './schema';

export type CarProfileReponse = z.infer<typeof CarProfileResponseSchema>;

export interface CarProfileVariables
  extends Omit<
    UseInfiniteQueryOptions<
      CarProfileReponse,
      AxiosError,
      CarProfileReponse,
      CarProfileReponse,
      QueryKey
    >,
    'queryKey' | 'queryFn' | 'getNextPageParam' | 'getPreviousPageParam'
  > {
  userId?: number;
}

export type CreateCarProfileResponse = z.infer<typeof CreateCarProfileSchema>;

export type CreateCartPayload = z.infer<typeof CreateCartPayloadSchema>;

export interface CreateCarProfileVariables
  extends Omit<
    UseMutationOptions<
      CreateCarProfileResponse,
      AxiosError,
      CreateCartPayload,
      unknown
    >,
    'mutationFn' | 'mutationKey'
  > {}

export type DeleteCarProfileResponse = z.infer<typeof CreateCarProfileSchema>;

export type DeleteCartPayload = z.infer<typeof CreateCartPayloadSchema>;

export interface DeleteCarProfileVariables
  extends Omit<
    UseMutationOptions<
      DeleteCarProfileResponse,
      AxiosError,
      DeleteCartPayload,
      unknown
    >,
    'mutationFn' | 'mutationKey'
  > {}
