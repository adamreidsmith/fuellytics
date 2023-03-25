import { AxiosError } from 'axios';
import {
  QueryKey,
  UseInfiniteQueryOptions,
  UseMutationOptions,
} from 'react-query';
import { z } from 'zod';
import { TripResponseSchema, TripSchemaPayload } from './schema';

export type TripResponse = z.infer<typeof TripResponseSchema>;

export interface TripsVariables
  extends Omit<
    UseInfiniteQueryOptions<
      TripResponse,
      AxiosError,
      TripResponse,
      TripResponse,
      QueryKey
    >,
    'queryKey' | 'queryFn' | 'getNextPageParam' | 'getPreviousPageParam'
  > {
  userId?: number;
}

export type CreateTripPayload = z.infer<typeof TripSchemaPayload>;

export interface CreateTripVariables
  extends Omit<
    UseMutationOptions<
      TripResponse | undefined,
      AxiosError,
      CreateTripPayload,
      unknown
    >,
    'mutationFn' | 'mutationKey'
  > {}
