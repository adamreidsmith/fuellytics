import { AxiosError } from 'axios';
import {
  QueryKey,
  UseInfiniteQueryOptions,
  UseMutationOptions,
} from 'react-query';
import { z } from 'zod';
import {
  CarResponseSchema,
  CreateCarSchema,
  CreateCartPayloadSchema,
} from './schema';

export type CarReponse = z.infer<typeof CarResponseSchema>;

export interface CarVariables
  extends Omit<
    UseInfiniteQueryOptions<
      CarReponse,
      AxiosError,
      CarReponse,
      CarReponse,
      QueryKey
    >,
    'queryKey' | 'queryFn' | 'getNextPageParam' | 'getPreviousPageParam'
  > {
  search?: string;
}

export type CreateCarResponse = z.infer<typeof CreateCarSchema>;

export type CreateCartPayload = z.infer<typeof CreateCartPayloadSchema>;

export interface CreateCarVariables
  extends Omit<
    UseMutationOptions<
      CreateCarResponse,
      AxiosError,
      CreateCartPayload,
      unknown
    >,
    'mutationFn' | 'mutationKey'
  > {}
