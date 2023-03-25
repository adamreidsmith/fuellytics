import { AxiosError } from 'axios';
import { useInfiniteQuery, useMutation } from 'react-query';
import { createTrip, getTrips } from './requests';
import { CreateTripVariables, TripResponse, TripsVariables } from './types';

export const useTrips = ({ userId, ...opts }: TripsVariables = {}) => {
  const { data, status, refetch, fetchNextPage, hasNextPage } =
    useInfiniteQuery<TripResponse, AxiosError>(
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

export const useCreateTrip = ({ ...opts }: CreateTripVariables = {}) =>
  useMutation('createtrip', createTrip, { ...opts });
