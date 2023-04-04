import { MutationFunction, QueryFunction, QueryKey } from 'react-query';
import API from 'services/api';
import { decamelizeKeys } from 'humps';
import {
  PaginatedTripResponseSchema,
  CreateTripSchema,
  TripSchemaPayload,
} from './schema';
import { CreateTripPayload, CreateTripResponse, TripResponse } from './types';

export const getTrips: QueryFunction<TripResponse, QueryKey> = async ({
  queryKey,
  pageParam = 1,
}) => {
  const [_, variables] = queryKey as [unknown, {}];

  return API.get('api/trips/', {
    params: { ...variables, page: pageParam },
  }).then(async (result) => PaginatedTripResponseSchema.parse(result.data));
};

export const createTrip: MutationFunction<
  CreateTripResponse,
  CreateTripPayload
> = async (payload) =>
  API.post('api/trips/', TripSchemaPayload.parse(payload)).then((result) =>
    CreateTripSchema.parse(result.data),
  );
