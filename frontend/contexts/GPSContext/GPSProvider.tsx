import { FC, PropsWithChildren, useState } from 'react';
import * as Location from 'expo-location';
import { LocationObjectCoords } from 'expo-location';
import { frequency } from '../contants';
import { GPSContext } from './GPSContext';
import { GPSContextType } from './types';

export const GPSProvider: FC<PropsWithChildren> = ({ children }) => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );
  const [routeCoordinates, setRouteCoordinates] = useState<
    LocationObjectCoords[]
  >([]);
  const hasStartedRecording = routeCoordinates.length > 0;
  const [locationSubscription, setLocationSubscription] =
    useState<Location.LocationSubscription | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      setErrorMessage('Permission to access location was denied');
    }

    return status;
  };

  const onLocationUpdate: Location.LocationCallback = (location) => {
    setLocation(location);
    setRouteCoordinates((state) => [...state, location.coords]);
  };

  const subscribeToLocationUpdates = async () => {
    const subscription = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.BestForNavigation,
        timeInterval: frequency,
        distanceInterval: 1,
      },
      onLocationUpdate,
    );

    setLocationSubscription(subscription);
  };

  const unsubscribeFromLocationUpdates = () => {
    if (locationSubscription) {
      locationSubscription.remove();
      setLocationSubscription(null);
    }
  };

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value: GPSContextType = {
    hasStartedRecording,
    subscribeToLocationUpdates,
    unsubscribeFromLocationUpdates,
    requestLocationPermission,
    location,
    routeCoordinates,
    setRouteCoordinates,
  };

  return <GPSContext.Provider value={value}>{children}</GPSContext.Provider>;
};
