import { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, Button, Paragraph } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import { LocationObjectCoords } from 'expo-location';

const LATITUDE = 51.0447;
const LONGITUDE = -114.066666;

//Nine

const tableData = {
  tableHead: ['Crypto Name', 'Value', 'Mkt Cap'],
  tableData: [
      ['Time:', ''],
      ['Latitude:', ''],
      ['Longitude:', ''],
      ['Current gas consumption:', ''],
      ['Cumulative gas emission:', ''],
  ],
};

const Header = () => {
return (
    <View style={styles.header}>
      <Image
      style={styles.logo}
      source={require('../../assets/logos/car-logo-removebg-preview.png')}
      />
      <Image
      style={styles.logo_name}
      source={require('../../assets/logos/fuellytics-high-resolution-logo-color-on-transparent-background-2-cut.png')}
      />
    </View>
  
  );
};

const Content = () => {
const [data, setData] = useState(tableData);
return (
  <View style={styles.content}>
    <Text>
      Fuellytics Analysis
    </Text>
    <View>
      <Table borderStyle={{ borderWidth: 4, borderColor: 'teal' }}>
        <Rows data={data.tableData} textStyle={styles.text} />
      </Table>
    </View>
     <Button
        title="Start"
        color="#000000"
        onPress={() => Alert.alert('Button with adjusted color pressed')}
      />
      <Button
        title="Stop"
        color="#000000"
        onPress={() => Alert.alert('Button with adjusted color pressed')}
      />
  </View>
  
  );
};

const MapPage = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );
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

  useEffect(() => {
    requestLocationPermission();
    subscribeToLocationUpdates();

    return () => {
      unsubscribeFromLocationUpdates();
    };
  }, []);

  return (
    <>
      <Header />
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
      </View>
      <Content />
    </>
  );
};


export default MapPage;

const styles = StyleSheet.create({
  container: {
    width: 390,
    height: 398,
    left: 0,
    top: 152,
  },
  pepe: {
    color: 'red'
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
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
  header: {
    position: 'absolute',
    width: 390,
    height: 152,
    left: 0,
    top: 0,
    backgroundColor: "#AAAAAA",
  },
  logo: {
    position: 'absolute',
    width: 70,
    height: 60,
    left: 26,
    top: 66,
  },
  logo_name: {
    position: 'absolute',
    width: 250,
    height: 40,
    left: 126,
    top: 76,
  },
  content: {
    position: 'absolute',
    width: 390,
    height: 294,
    left: 0,
    top: 550,
    backgroundColor: "#AAAAAA",
  },
  text_header: {
    position: 'absolute',
    width: 319,
    height: 40,
    left: 11,
    top: 560,
    fontSize: 20,
    //lineHeight: 20,
    //letterSpacing: '0.02',
    color: '#000000',
  }
});
