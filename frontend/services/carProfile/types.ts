import { AxiosError } from 'axios';
import {
  QueryKey,
  UseInfiniteQueryOptions,
  UseMutationOptions,
} from 'react-query';
import { z } from 'zod';
import { CarProfileResponseSchema, CreateCartPayloadSchema } from './schema';

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

export type CreateCartPayload = z.infer<typeof CreateCartPayloadSchema>;

export interface CreateCarProfileVariables
  extends Omit<
    UseMutationOptions<
      CarProfileReponse | undefined,
      AxiosError,
      CreateCartPayload,
      unknown
    >,
    'mutationFn' | 'mutationKey'
  > {}
