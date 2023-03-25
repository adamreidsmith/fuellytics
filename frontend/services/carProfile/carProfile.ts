import { AxiosError } from 'axios';
import { useInfiniteQuery, useMutation } from 'react-query';
import { createCarProfile, getCarProfiles } from './requests';
import {
  CarProfileReponse,
  CarProfileVariables,
  CreateCarProfileVariables,
} from './types';

export const useCarProfiles = ({
  userId,
  ...opts
}: CarProfileVariables = {}) => {
  const { data, status, refetch, fetchNextPage, hasNextPage } =
    useInfiniteQuery<CarProfileReponse, AxiosError>(
      ['getCarProfiles', { userId }],
      getCarProfiles,
      {
        getNextPageParam: (lastPage) => lastPage?.next ?? undefined,
        getPreviousPageParam: (firstPage) => firstPage?.previous ?? undefined,
        ...opts,
      },
    );

  const carsProfiles = data?.pages.flatMap((el) => el.results) || [];

  return { carsProfiles, status, refetch, fetchNextPage, hasNextPage };
};

export const useCreateCart = ({ ...opts }: CreateCarProfileVariables = {}) =>
  useMutation('createCarProfile', createCarProfile, { ...opts });
