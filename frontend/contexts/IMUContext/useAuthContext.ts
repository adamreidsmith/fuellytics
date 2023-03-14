import { useContext } from 'react';
import { IMUContext } from './IMUContext';

export const useIMUContext = () => {
  const imuContext = useContext(IMUContext);

  if (imuContext === undefined || imuContext === null) {
    throw new Error('useimuContext must be used within an IMUProvider');
  }

  return imuContext;
};
