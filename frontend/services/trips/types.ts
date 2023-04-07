import { AxiosError } from 'axios';
import {
  QueryKey,
  UseInfiniteQueryOptions,
  UseMutationOptions,
  UseQueryOptions,
} from 'react-query';
import { z } from 'zod';
import {
  PaginatedTripResponseSchema,
  TripSchemaPayload,
  CreateTripSchema,
  TripSchema,
} from './schema';

export type TripResponse = z.infer<typeof TripSchema>;

export interface TripVariables
  extends Omit<
    UseQueryOptions<TripResponse, AxiosError, TripResponse, QueryKey>,
    'queryFn'
  > {
  tripId?: number;
}

export type PaginatedTripResponse = z.infer<typeof PaginatedTripResponseSchema>;

export type CreateTripResponse = z.infer<typeof CreateTripSchema>;

export interface TripsVariables
  extends Omit<
    UseInfiniteQueryOptions<
      PaginatedTripResponse,
      AxiosError,
      PaginatedTripResponse,
      PaginatedTripResponse,
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
