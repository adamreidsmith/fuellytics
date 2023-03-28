import { AxiosError } from 'axios';
import {
  QueryKey,
  UseInfiniteQueryOptions,
  UseMutationOptions,
} from 'react-query';
import { z } from 'zod';
import {
  PaginatedTripResponseSchema,
  TripSchemaPayload,
  TripSchema,
} from './schema';

export type TripResponse = z.infer<typeof PaginatedTripResponseSchema>;

export type CreateTripResponse = z.infer<typeof TripSchema>;

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
      CreateTripResponse,
      AxiosError,
      CreateTripPayload,
      unknown
    >,
    'mutationFn' | 'mutationKey'
  > {}
