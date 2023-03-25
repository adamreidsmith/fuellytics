import { AxiosError } from 'axios';
import { useInfiniteQuery } from 'react-query';
import { getCars } from './requests';
import { CarReponse, CarVariables } from './types';

export const useCars = ({ ...opts }: CarVariables = {}) => {
  const { data, status, refetch, fetchNextPage, hasNextPage } =
    useInfiniteQuery<CarReponse, AxiosError>(['getCars'], getCars, {
      getNextPageParam: (lastPage) => lastPage?.next ?? undefined,
      getPreviousPageParam: (firstPage) => firstPage?.previous ?? undefined,
      ...opts,
    });

  const cars = data?.pages.flatMap((el) => el.results) || [];

  return { cars, status, refetch, fetchNextPage, hasNextPage };
};
