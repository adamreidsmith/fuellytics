import { useContext } from 'react';
import { GPSContext } from './GPSContext';

export const useGPSContext = () => {
  const gpsContext = useContext(GPSContext);

  if (gpsContext === undefined || GPSContext === null) {
    throw new Error('useGPSContext must be used within an GPSProvider');
  }

  return gpsContext;
};
