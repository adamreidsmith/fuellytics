import { AxiosError } from 'axios';
import { useInfiniteQuery, useMutation, useQuery } from 'react-query';
import { createTrip, getTrip, getTrips } from './requests';
import {
  CreateTripVariables,
  TripResponse,
  PaginatedTripResponse,
  TripsVariables,
  TripVariables,
} from './types';

export const useTrips = ({ userId, ...opts }: TripsVariables = {}) => {
  const { data, status, refetch, fetchNextPage, hasNextPage } =
    useInfiniteQuery<PaginatedTripResponse, AxiosError>(
      ['getTrips', { userId }],
      getTrips,
      {
        getNextPageParam: (lastPage) => lastPage?.next ?? undefined,
        getPreviousPageParam: (firstPage) => firstPage?.previous ?? undefined,
        ...opts,
      },
    );

  const trips = data?.pages.flatMap((el) => el.results) || [];

  return { trips, status, refetch, fetchNextPage, hasNextPage };
};

export const useTrip = ({ tripId, ...opts }: TripVariables) => {
  const { data, status, refetch } = useQuery<TripResponse, AxiosError>(
    ['getTrip', { tripId }],
    getTrip,
    {
      ...opts,
      enabled: !!tripId,
    },
  );

  return { data, status, refetch };
};

export const useCreateTrip = ({ ...opts }: CreateTripVariables = {}) =>
  useMutation('createtrip', createTrip, { ...opts });
