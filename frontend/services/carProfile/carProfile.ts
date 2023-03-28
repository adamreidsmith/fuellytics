import { AxiosError } from 'axios';
import { useInfiniteQuery, useMutation } from 'react-query';
import { createCarProfile, deleteCarProfile, getCarProfiles } from './requests';
import {
  CarProfileReponse,
  CarProfileVariables,
  CreateCarProfileVariables,
  DeleteCarProfileVariables,
} from './types';

export const useCarProfiles = ({
  userId,
  search,
  ...opts
}: CarProfileVariables = {}) => {
  const { data, status, refetch, fetchNextPage, hasNextPage } =
    useInfiniteQuery<CarProfileReponse, AxiosError>(
      ['getCarProfiles', { userId, search }],
      getCarProfiles,
      {
        getNextPageParam: (lastPage) => lastPage?.next ?? undefined,
        getPreviousPageParam: (firstPage) => firstPage?.previous ?? undefined,
        ...opts,
      },
    );

  const carsProfiles = data?.pages.flatMap((el) => el.results) || [];
  const formattedCarsProfiles = carsProfiles.map((el) => ({
    ...el,
    title: `${el.car.make} ${el.car.model}`,
    id: el.id.toString(),
  }));

  return {
    carsProfiles,
    formattedCarsProfiles,
    status,
    refetch,
    fetchNextPage,
    hasNextPage,
  };
};

export const useCreateCarProfile = ({
  ...opts
}: CreateCarProfileVariables = {}) =>
  useMutation('createCarProfile', createCarProfile, { ...opts });

export const useDeleteCarProfile = ({
  ...opts
}: DeleteCarProfileVariables = {}) =>
  useMutation('deleteCarProfile', deleteCarProfile, { ...opts });
