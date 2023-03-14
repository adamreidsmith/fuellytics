import { useState } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import { LocationObjectCoords } from 'expo-location';

const LATITUDE = 51.0447;
const LONGITUDE = -114.066666;

const MapPage = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );
  const [isRecording, setIsRecording] = useState(false);
  const [routeCoordinates, setRouteCoordinates] = useState<
    LocationObjectCoords[]
  >([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [locationSubscription, setLocationSubscription] =
    useState<Location.LocationSubscription | null>(null);

  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      setErrorMessage('Permission to access location was denied');
    }

    return status;
  };

  const subscribeToLocationUpdates = async () => {
    const subscription = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.BestForNavigation,
        timeInterval: 1000,
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

  const onLocationUpdate: Location.LocationCallback = (location) => {
    setLocation(location);
    setRouteCoordinates((state) => [...state, location.coords]);
  };

  const onStart = () => {
    requestLocationPermission();
    subscribeToLocationUpdates();
    setIsRecording(true);
  };

  const onEnd = () => {
    unsubscribeFromLocationUpdates();
    setIsRecording(false);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location?.coords.latitude || LATITUDE,
          longitude: location?.coords.longitude || LONGITUDE,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Polyline coordinates={routeCoordinates} strokeWidth={5} />
        <Marker.Animated
          coordinate={{
            latitude: location?.coords.latitude || LATITUDE,
            longitude: location?.coords.longitude || LONGITUDE,
          }}
        />
      </MapView>
      <View style={styles.bottomSheet}>
        <Text>Fuel consumption analysis</Text>
        <Text>Time</Text>
        <Text>Latitude</Text>
        <Text>Longitude</Text>
        <Text>Current Gas consumption</Text>
        <Text>Gas emission</Text>
        <View style={styles.buttonContainer}>
          <Button
            onPress={isRecording ? onEnd : onStart}
            title={
              // eslint-disable-next-line no-nested-ternary
              isRecording
                ? 'Stop'
                : routeCoordinates.length > 0
                  ? 'Continue recording'
                  : 'Start'
            }
            color="#841584"
          />
          {routeCoordinates.length > 0 && !isRecording && (
            <Button onPress={onEnd} title="Finalize" color="#841584" />
          )}
        </View>
      </View>
    </View>
  );
};

export default MapPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  pepe: {
    color: 'red',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  bubble: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  bottomSheet: {
    padding: 24,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
    backgroundColor: 'white',
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
