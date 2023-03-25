import { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import { LocationObjectCoords } from 'expo-location';

const LATITUDE = 51.0447;
const LONGITUDE = -114.066666;

const DetailReportPage = () => {
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={require('../../assets/logos/car-logo-removebg-preview.png')}
        />
        <Image
          style={styles.logoname}
          source={require('../../assets/logos/fuellytics-high-resolution-logo-color-on-transparent-background-2-cut.png')}
        />
      </View>
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
        <Text style={styles.contentheader}>Trip Information</Text>
        <View style={styles.detail}>
          <Text>Total Time:</Text>
          <Text>Departure:</Text>
          <Text>Destination:</Text>
          <Text>Gas consumption:</Text>
          <Text>Approximate Expense:</Text>
          <Text>CO2 emission:</Text>
          <Text>Methane emission:</Text>
          <Text>N2O emission:</Text>
        </View>
        <View style={styles.button}>
          <Button
            title="Back"
            onPress={() => {
              navigate('ReportsPage' as never, {} as never);
            }}
          />
        </View>
      </View>
    </View>
  );
};

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
    height: 310,
    width: 389,
    top: 200,
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
  content: {
    position: 'relative',
  },
  filtericon: {
    position: 'absolute',
    height: 27,
    width: 27,
    left: 353,
    top: 170,
    borderRadius: 0,
  },
  contentheader: {
    position: 'absolute',
    height: 27,
    width: 163,
    left: 11,
    top: 170,
    fontSize: 18,
  },
  bottomSheet: {
    position: 'relative',
  },
  detail: {
    position: 'absolute',
    height: 144,
    width: 161,
    left: 35,
    top: 530,
    fontSize: 18,
    alignItems: 'flex-end',
  },
  button: {
    position: 'absolute',
    height: 40,
    width: 120,
    left: 136,
    top: 700,
    borderRadius: 2,
    backgroundColor: '#AAAAAA',
  },
});

export default DetailReportPage;
