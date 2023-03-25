import { AxiosError } from 'axios';
import { useInfiniteQuery } from 'react-query';
import { getCars } from './requests';
import { CarReponse, CarVariables } from './types';

export const useCars = ({ search, ...opts }: CarVariables = {}) => {
  const { data, status, refetch, fetchNextPage, hasNextPage } =
    useInfiniteQuery<CarReponse, AxiosError>(['getCars', { search }], getCars, {
      getNextPageParam: (lastPage) => lastPage?.next ?? undefined,
      getPreviousPageParam: (firstPage) => firstPage?.previous ?? undefined,
      ...opts,
    });

  const cars =
    data?.pages
      .flatMap((el) => el.results)
      .map((el) => ({ id: el.id.toString(), title: el.model, item: el })) || [];

  return { cars, status, refetch, fetchNextPage, hasNextPage };
};
