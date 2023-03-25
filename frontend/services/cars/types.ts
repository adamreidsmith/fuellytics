import { AxiosError } from 'axios';
import { QueryKey, UseInfiniteQueryOptions } from 'react-query';
import { z } from 'zod';
import { CarResponseSchema } from './schema';

export type CarReponse = z.infer<typeof CarResponseSchema>;

export interface CarVariables
  extends Omit<
    UseInfiniteQueryOptions<
      CarReponse,
      AxiosError,
      CarReponse,
      CarReponse,
      QueryKey
    >,
    'queryKey' | 'queryFn' | 'getNextPageParam' | 'getPreviousPageParam'
  > {}
