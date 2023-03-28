import { createContext } from 'react';
import { GPSContextType } from './types';

export const GPSContext = createContext<GPSContextType>({} as GPSContextType);
