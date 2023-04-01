import { createContext } from 'react';
import { SocketContextType } from './types';

export const SocketContext = createContext<SocketContextType>(
  {} as SocketContextType,
);
