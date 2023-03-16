import { createContext } from 'react';
import { IMUContextType } from './types';

export const IMUContext = createContext<IMUContextType>({} as IMUContextType);
