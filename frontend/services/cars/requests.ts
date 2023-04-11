import { MutationFunction, QueryFunction, QueryKey } from 'react-query';
import API from 'services/api';
import { CarResponseSchema, CreateCartPayloadSchema } from './schema';
import { CarReponse, CreateCarResponse, CreateCartPayload } from './types';

export const getCars: QueryFunction<CarReponse, QueryKey> = async ({
  queryKey,
  pageParam,
}) => {
  const [_, variables] = queryKey as [unknown, {}];

  return API.get(pageParam || 'api/cars', {
    params: { ...variables },
  }).then(async (result) => CarResponseSchema.parse(result.data));
};

export const createCar: MutationFunction<
  CreateCarResponse,
  CreateCartPayload
> = async (payload) =>
  API.post('api/cars/', CreateCartPayloadSchema.parse(payload)).then(
    (result) => result.data,
  );
