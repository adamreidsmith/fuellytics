import { AxiosError } from 'axios';
import { useInfiniteQuery, useMutation } from 'react-query';
import { createCar, getCars } from './requests';
import { CarReponse, CarVariables, CreateCarVariables } from './types';

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
      .map((el) => ({
        id: el.id.toString(),
        title: `${el.model} (${el.year})`,
        item: el,
      })) || [];

  return { cars, status, refetch, fetchNextPage, hasNextPage };
};

export const useCreateCar = ({ ...rest }: CreateCarVariables = {}) =>
  useMutation('createCar', createCar, { ...rest });
