import { QueryFunction, QueryKey } from 'react-query';
import API from 'services/api';
import { CarResponseSchema } from './schema';
import { CarReponse } from './types';

export const getCars: QueryFunction<CarReponse, QueryKey> = async ({
  queryKey,
  pageParam = 1,
}) => {
  const [_, variables] = queryKey as [unknown, {}];

  return API.get('api/cars', {
    params: { ...variables, page: pageParam },
  }).then(async (result) => CarResponseSchema.parse(result.data));
};
