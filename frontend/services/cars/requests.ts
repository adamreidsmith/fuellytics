import { QueryFunction, QueryKey } from 'react-query';
import API from 'services/api';
import { CarResponseSchema } from './schema';
import { CarReponse } from './types';

export const getCars: QueryFunction<CarReponse, QueryKey> = async ({
  queryKey,
  pageParam,
}) => {
  const [_, variables] = queryKey as [unknown, {}];

  return API.get(pageParam || 'api/cars', {
    params: { ...variables },
  }).then(async (result) => CarResponseSchema.parse(result.data));
};
