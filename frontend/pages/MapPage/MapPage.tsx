import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { WEBSOCKET_URL } from '@env';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import Collapsible from 'react-native-collapsible';
import { LocationObjectCoords } from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import BottomSheet from '@gorhom/bottom-sheet';
import Button from 'components/Button';
import { useCreateTrip } from 'services/trips';
import { io } from 'socket.io-client';
import { LineChart, Grid, YAxis } from 'react-native-svg-charts';
import { metrics } from './constants';
import { MetricType } from './types';

const LATITUDE = 51.0447;
const LONGITUDE = -114.066666;

const MapPage = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [openCollapsible, setOpenCollapsible] =
    useState<MetricType>('co2Emissions');
  const { navigate } = useNavigation();
  const { mutateAsync: createTrip } = useCreateTrip();
  const [isConnected, setIsConnected] = useState(false);
  const [response, setResponse] = useState<any>(undefined);

  useEffect(() => {
    const newSocket = new WebSocket(WEBSOCKET_URL);

    newSocket.onopen = () => {
      setSocket(newSocket);
      setIsConnected(true);
    };

    newSocket.onmessage = (event) => {
      setResponse(event.data);
    };

    newSocket.onerror = (error) => {
      // eslint-disable-next-line no-console
      console.error('WebSocket error:', error);
    };

    newSocket.onclose = () => {
      setSocket(null);
      setIsConnected(false);
    };

    return () => {
      newSocket.close();
    };
  }, []);

  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );
  const [isRecording, setIsRecording] = useState(false);
  const [routeCoordinates, setRouteCoordinates] = useState<
    LocationObjectCoords[]
  >([]);
  const hasStartedRecording = routeCoordinates.length > 0;
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

  const onStartRecording = () => {
    requestLocationPermission();
    subscribeToLocationUpdates();
    setIsRecording(true);
  };

  const onPauseRecording = () => {
    unsubscribeFromLocationUpdates();
    setIsRecording(false);
  };

  const onEndRecording = () => {
    unsubscribeFromLocationUpdates();
    setIsRecording(false);
    // SEND POST REQUEST, and on success navigate()
  };

  const onContinueRecording = () => {
    subscribeToLocationUpdates();
    setIsRecording(true);
  };

  const snapPoints = useMemo(
    () => ['10%', hasStartedRecording ? '75%' : '50%'],
    [hasStartedRecording],
  );
  const data = [
    50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, 10, 40, 95, -4, -24,
    85, 91, 35, 53, -53, 24, 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24,
    50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, 10, 40, 95, -4, -24,
    85, 91, 35, 53, -53, 24, 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24,
    50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 0, 10, 40, 95, -4, -24,
    85, 91, 35, 53, -53, 24, 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24,
    50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, 10, 40, 95, -4, -24,
    85, 91, 35, 53, -53, 24, 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24,
  ];
  const contentInset = { top: 20, bottom: 20 };

  return (
    <View>
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
        <BottomSheet ref={bottomSheetRef} index={1} snapPoints={snapPoints}>
          {hasStartedRecording ? (
            <>
              <View style={styles.detailsTitleContainer}>
                <Text style={styles.detailsFont}>
                  Fuel consumption analysis
                </Text>
              </View>
              <View style={styles.details}>
                {metrics.map((metric) => (
                  <View key={metric.value} style={styles.collapsibleContainer}>
                    <TouchableOpacity
                      style={styles.collapsible}
                      onPress={() => {
                        setOpenCollapsible(metric.value);
                      }}
                    >
                      <Text
                        style={[styles.detailsFont, styles.collapsibleTitle]}
                      >
                        {metric.label}:
                      </Text>
                    </TouchableOpacity>
                    <Collapsible collapsed={openCollapsible !== metric.value}>
                      <View style={{ height: 150, flexDirection: 'row' }}>
                        <YAxis
                          data={data}
                          contentInset={contentInset}
                          svg={{
                            fill: 'grey',
                            fontSize: 10,
                          }}
                          numberOfTicks={10}
                          formatLabel={(value) => `${value}L`}
                        />
                        <LineChart
                          style={{ flex: 1, marginLeft: 16 }}
                          data={data}
                          svg={{ stroke: 'rgb(134, 65, 244)' }}
                          contentInset={contentInset}
                          animate
                          animationDuration={300}
                        >
                          <Grid />
                        </LineChart>
                      </View>
                    </Collapsible>
                  </View>
                ))}
                <View style={styles.buttonsContainer}>
                  {isRecording ? (
                    <Button
                      title="Pause Recording"
                      variant="secondary"
                      onPress={() => onPauseRecording()}
                    />
                  ) : (
                    <Button
                      title="Continue recording"
                      variant="success"
                      onPress={() => onContinueRecording()}
                    />
                  )}
                  <View style={styles.buttonsContainer}>
                    <Button
                      title="End Recording & Save"
                      variant="danger"
                      onPress={() => onEndRecording()}
                    />
                  </View>
                </View>
              </View>
            </>
          ) : (
            <View style={styles.detailsTitleContainer}>
              <Text>Select a car to start: {JSON.stringify(isConnected)}</Text>
              <Button
                title="Start recording"
                onPress={() => onStartRecording()}
              />
              <Text>Response: {JSON.stringify(response)}</Text>
              <Button
                title="Send event"
                variant="secondary"
                onPress={() => {
                  const payload = {
                    requestContext: {
                      routeKey: '$default',
                    },
                    body: {
                      hi: 'testing 123',
                    },
                  };

                  socket?.send(JSON.stringify(payload));
                }}
              />
            </View>
          )}
        </BottomSheet>
      </View>
    </View>
  );
};

export default MapPage;

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: 'center',
  },
  container: {
    position: 'relative',
    height: '100%',
  },
  pepe: {
    color: 'red',
  },
  map: {
    position: 'absolute',
    width: '100%',
    height: Dimensions.get('window').height,
    left: 0,
    top: 0,
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
    borderWidth: 1,
    borderColor: '#000000',
    borderStyle: 'solid',
  },
  detailsTitleContainer: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
  details: {
    padding: 16,
  },
  detailsFont: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  collapsible: {
    padding: 12,
    backgroundColor: '#AAAAAA',
    borderRadius: 8,
  },
  collapsibleTitle: {
    color: '#FFFF',
  },
  collapsibleContainer: {
    paddingBottom: 8,
  },
  buttonsContainer: {
    paddingTop: 12,
  },
});
