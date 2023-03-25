import { MutationFunction, QueryFunction, QueryKey } from 'react-query';
import API from 'services/api';
import { CarProfileResponseSchema } from './schema';
import {
  CarProfileReponse,
  CreateCarProfileResponse,
  CreateCartPayload,
  DeleteCarProfileResponse,
  DeleteCartPayload,
} from './types';

export const getCarProfiles: QueryFunction<
  CarProfileReponse,
  QueryKey
> = async ({ queryKey, pageParam = 1 }) => {
  const [_, variables] = queryKey as [unknown, {}];

  return API.get('api/car_profiles/', {
    params: { ...variables, page: pageParam },
  }).then(async (result) => CarProfileResponseSchema.parse(result.data));
};

export const createCarProfile: MutationFunction<
  CreateCarProfileResponse,
  CreateCartPayload
> = async (payload) =>
  API.post('api/car_profiles/', payload).then((result) => result.data);

export const deleteCarProfile: MutationFunction<
  DeleteCarProfileResponse,
  DeleteCartPayload
> = async ({ carId }) =>
  API.delete(`api/car_profiles/${carId}`).then((result) => result.data);
