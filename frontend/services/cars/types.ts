import { AxiosError } from 'axios';
import { QueryKey, UseQueryOptions } from 'react-query';
import { z } from 'zod';
import { CarResponseSchema } from './schema';

export type CarReponse = z.infer<typeof CarResponseSchema>;

export interface CarVariables
  extends Omit<
    UseQueryOptions<CarReponse, AxiosError, CarReponse, QueryKey>,
    'queryFn'
  > {}
