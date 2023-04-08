import { MutationFunction, QueryFunction, QueryKey } from 'react-query';
import API from 'services/api';
import { decamelizeKeys } from 'humps';
import {
  PaginatedTripResponseSchema,
  CreateTripSchema,
  TripSchemaPayload,
  TripSchema,
} from './schema';
import {
  CreateTripPayload,
  CreateTripResponse,
  TripResponse,
  PaginatedTripResponse,
} from './types';

export const getTrips: QueryFunction<PaginatedTripResponse, QueryKey> = async ({
  queryKey,
  pageParam,
}) => {
  const [_, variables] = queryKey as [unknown, {}];

  return API.get(pageParam || 'api/trips/', {
    params: { ...variables },
  }).then(async (result) => PaginatedTripResponseSchema.parse(result.data));
};

export const createTrip: MutationFunction<
  CreateTripResponse,
  CreateTripPayload
> = async (payload) =>
  API.post('api/trips/', TripSchemaPayload.parse(payload)).then((result) =>
    CreateTripSchema.parse(result.data),
  );

export const getTrip: QueryFunction<TripResponse, QueryKey> = async ({
  queryKey,
}) => {
  const [_, { tripId }] = queryKey as [unknown, { tripId: number }];

  return API.get(`api/trips/${tripId}/`).then((result) =>
    TripSchema.parse(result.data),
  );
};
