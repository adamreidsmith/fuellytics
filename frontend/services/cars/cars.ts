import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { getCars } from './requests';
import { CarReponse, CarVariables } from './types';

export const useCars = ({ ...opts }: CarVariables = {}) => {
  const { data, status, refetch } = useQuery<CarReponse, AxiosError>(
    ['getCars'],
    getCars,
    {
      ...opts,
    },
  );

  const cars = data?.results || [];

  return { cars, status, refetch };
};
