import * as Location from 'expo-location';

export type GPSContextType = {
  routeCoordinates: Location.LocationObjectCoords[];
  location: Location.LocationObject | null;
  hasStartedRecording: boolean;
  subscribeToLocationUpdates: () => Promise<void>;
  unsubscribeFromLocationUpdates: () => void;
  requestLocationPermission: () => Promise<Location.PermissionStatus>;
  setRouteCoordinates: React.Dispatch<
    React.SetStateAction<Location.LocationObjectCoords[]>
  >;
};
