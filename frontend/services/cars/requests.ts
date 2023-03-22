import { QueryFunction, QueryKey } from 'react-query';
import API from 'services/api';
import { CarResponseSchema } from './schema';
import { CarReponse } from './types';

export const getCars: QueryFunction<CarReponse, QueryKey> = async () =>
  API.get('api/cars').then(async (result) =>
    CarResponseSchema.parse(result.data),
  );
