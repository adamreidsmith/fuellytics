import { MutationFunction, QueryFunction, QueryKey } from 'react-query';
import API from 'services/api';
import { CarProfileResponseSchema } from './schema';
import { CarProfileReponse, CreateCartPayload } from './types';

export const getCarProfiles: QueryFunction<
  CarProfileReponse,
  QueryKey
> = async ({ queryKey, pageParam = 1 }) => {
  const [_, variables] = queryKey as [unknown, {}];

  return API.get('api/car_profiles', {
    params: { ...variables, page: pageParam },
  }).then(async (result) => CarProfileResponseSchema.parse(result.data));
};

export const createCarProfile: MutationFunction<
  CarProfileReponse,
  CreateCartPayload
> = async (payload) =>
  API.post('api/car_profiles', payload).then((result) => result.data);
