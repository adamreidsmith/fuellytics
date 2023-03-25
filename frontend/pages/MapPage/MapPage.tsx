import { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
  Image,
  TouchableOpacity,
} from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import { LocationObjectCoords } from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import Header from 'components/Header';

const LATITUDE = 51.0447;
const LONGITUDE = -114.066666;

const MapPage = () => {
  const { navigate } = useNavigation();

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
    navigate('SummaryPage' as never, {} as never);
  };

  return (
    <View style={styles.container}>
      <Header />
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
        <Text style={styles.contentheader}>Fuel consumption analysis</Text>
        <View style={styles.line} />
        <View style={styles.detail}>
          <Text>Time:</Text>
          <Text>Latitude:</Text>
          <Text>Longitude:</Text>
          <Text>Current Gas consumption:</Text>
          <Text>Gas emission:</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigate('RTTrackPage' as never, {} as never);
          }}
        >
          <Image
            style={styles.zoominicon}
            source={require('../../assets/icons/zoom-in.png')}
          />
        </TouchableOpacity>
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
    position: 'absolute',
    width: 390,
    height: 398,
    left: 0,
    top: 152,
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
    // padding: 24,
    // position: 'absolute',
    // bottom: 0,
    // left: 0,
    // right: 0,
    // zIndex: 9999,
    // backgroundColor: 'white',
    position: 'relative',
    // height: 254,
    // width: 390,
    // left: 0,
    // top: 550,
  },
  buttonContainer: {
    position: 'absolute',
    height: 64,
    width: 390,
    left: 0,
    top: 690,
    justifyContent: 'space-around',
  },
  header: {
    position: 'absolute',
    width: 390,
    height: 152,
    left: 0,
    top: 0,
    backgroundColor: '#AAAAAA',
  },
  logo: {
    position: 'absolute',
    width: 70,
    height: 60,
    left: 26,
    top: 66,
  },
  logoname: {
    position: 'absolute',
    width: 250,
    height: 40,
    left: 126,
    top: 76,
  },
  contentheader: {
    position: 'absolute',
    height: 40,
    width: 319,
    left: 11,
    top: 560,
    fontSize: 20,
    color: '#000000',
    textAlign: 'left',
  },
  zoominicon: {
    position: 'absolute',
    height: 24,
    width: 24,
    left: 356,
    top: 560,
  },
  line: {
    position: 'absolute',
    width: 370,
    height: 0,
    left: 10,
    top: 590,
    borderWidth: 1,
    borderColor: '#000000',
    borderStyle: 'solid',
  },
  detail: {
    position: 'absolute',
    height: 140,
    width: 390,
    left: 11,
    top: 600,
  },
});
