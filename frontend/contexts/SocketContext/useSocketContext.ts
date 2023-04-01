import { useContext } from 'react';
import { SocketContext } from './SocketContext';

export const useSocketContext = () => {
  const socketContext = useContext(SocketContext);

  if (socketContext === undefined || SocketContext === null) {
    throw new Error('useSocketContext must be used within an SocketProvider');
  }

  return socketContext;
};
