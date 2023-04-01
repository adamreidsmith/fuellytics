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
import MapView, { Marker, Polyline } from 'react-native-maps';
import Collapsible from 'react-native-collapsible';
import { useNavigation } from '@react-navigation/native';
import BottomSheet from '@gorhom/bottom-sheet';
import Button from 'components/Button';
import { useCreateTrip } from 'services/trips';
import { LineChart, Grid, YAxis, XAxis } from 'react-native-svg-charts';
import { IMUProvider, useIMUContext } from 'contexts/IMUContext';
import { GPSProvider, useGPSContext } from 'contexts/GPSContext';
import { useCarProfiles } from 'services/carProfile';
import { useAuthContext } from 'context/AuthContext';
import useDebounce from 'hooks/useDebounce';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import { SocketProvider } from 'contexts/SocketContext';
import { useSocketContext } from 'contexts/SocketContext/useSocketContext';
import { metrics } from './constants';
import { FormattedCarProfile, GraphsData, MetricType } from './types';
import { MessageSchema } from './schema';

const LATITUDE = 51.0447;
const LONGITUDE = -114.066666;

const MapPage = () => {
  const [count, setCount] = useState(0);
  const { user } = useAuthContext();
  const {
    accelerometerWithoutGravity,
    accelerometerWithGravity,
    gyroscope,
    setEnabled,
    enabled,
    magnetometer,
  } = useIMUContext();
  const {
    location,
    hasStartedRecording,
    subscribeToLocationUpdates,
    unsubscribeFromLocationUpdates,
    requestLocationPermission,
    routeCoordinates,
    setRouteCoordinates,
  } = useGPSContext();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const {
    socket,
    isConnected,
    graphsData,
    xValues,
    setGraphsData,
    numberOfPoints,
  } = useSocketContext();

  const [startedAt, setStartedAt] = useState<Date | undefined>(undefined);
  const [endedAt, setEndedAt] = useState<Date | undefined>(undefined);
  const [openCollapsible, setOpenCollapsible] = useState<MetricType>('co2');
  const { navigate } = useNavigation();
  const [isRecording, setIsRecording] = useState(false);
  const { mutateAsync: createTrip } = useCreateTrip({
    onSuccess: (response) => {
      navigate('SummaryPage' as never, {} as never);
    },
  });
  const [searchKey, setSearchKey] = useState('');
  const debouncedKey = useDebounce(searchKey);
  const [selectedCar, setSelectedCar] = useState<FormattedCarProfile | null>(
    null,
  );

  const { formattedCarsProfiles } = useCarProfiles({
    userId: user?.id,
    search: debouncedKey,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (socket && selectedCar && isRecording && isConnected) {
      const payload = {
        isSupercharged: selectedCar?.car.isSupercharged,
        displacement: selectedCar?.car.displacement,
        drag: selectedCar?.car.drag,
        accelerometerWithoutGravity,
        accelerometerWithGravity,
        gyroscope,
        magnetometer,
        location,
        time: new Date().getTime(),
      };

      socket.send(JSON.stringify(payload));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, count, selectedCar, isRecording, isConnected]);

  useEffect(() => {
    if (isConnected && hasStartedRecording) {
      setEnabled(true);
    } else {
      setEnabled(false);
    }
  }, [hasStartedRecording, isConnected, setEnabled]);

  const onStartRecording = async () => {
    const response = await requestLocationPermission();

    if (response === 'granted') {
      await subscribeToLocationUpdates();
      setIsRecording(true);
      setStartedAt(new Date());
    }
  };

  const onPauseRecording = () => {
    unsubscribeFromLocationUpdates();
    setIsRecording(false);
    setEndedAt(new Date());
  };

  const onEndRecording = () => {
    unsubscribeFromLocationUpdates();
    setIsRecording(false);

    if (selectedCar && startedAt && endedAt) {
      // createTrip({
      //   startedAt: startedAt.toISOString(),
      //   endedAt: endedAt.toISOString(),
      //   carId: selectedCar?.id,
      //   routeCoordinates,
      //   co2Emissions: 0,
      // });
    }

    // SEND POST REQUEST, and on success navigate()
    setStartedAt(undefined);
    setEndedAt(undefined);
    setSelectedCar(null);
    setGraphsData({
      fuel: [],
      speed: [],
      co2: [],
    });
    setRouteCoordinates([]);
  };

  const onContinueRecording = async () => {
    await subscribeToLocationUpdates();
    setIsRecording(true);
  };

  const snapPoints = useMemo(
    () => ['10%', hasStartedRecording ? '70%' : '30%'],
    [hasStartedRecording],
  );

  const contentInset = { top: 20, bottom: 20 };

  return (
    <View>
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={{
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
                        <LineChart
                          style={{ flex: 1 }}
                          data={graphsData[metric.value]}
                          contentInset={{ top: 20, bottom: 20 }}
                          svg={{ stroke: 'green', strokeWidth: 2 }}
                        />
                        <YAxis
                          style={{ marginLeft: 10, height: 200 }}
                          data={graphsData[metric.value]}
                          contentInset={contentInset}
                          svg={{ fontSize: 10, fill: 'black' }}
                          formatLabel={(value) => `${value} L`}
                          numberOfTicks={10}
                        />
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
              <AutocompleteDropdown
                clearOnFocus={false}
                closeOnSubmit={false}
                textInputProps={{
                  placeholder: 'Select a car before recording',
                }}
                // @ts-ignore
                onSelectItem={setSelectedCar}
                dataSet={formattedCarsProfiles}
                onChangeText={(value) => setSearchKey(value)}
                onBlur={() => setSearchKey('')}
              />
              {socket ? (
                <>
                  <View style={styles.actionButtons}>
                    <Button
                      title="Start recording"
                      onPress={() => onStartRecording()}
                      disabled={!selectedCar}
                    />
                  </View>
                  <View style={styles.actionButtons}>
                    <Button
                      title="Send event"
                      variant="secondary"
                      onPress={() => {
                        const payload = {
                          isSupercharged: selectedCar?.car.isSupercharged,
                          displacement: selectedCar?.car.displacement,
                          drag: selectedCar?.car.id,
                          accelerometerWithoutGravity,
                          accelerometerWithGravity,
                          gyroscope,
                        };

                        socket?.send(JSON.stringify(payload));
                      }}
                    />
                  </View>
                </>
              ) : (
                <Text>Connecting...</Text>
              )}
            </View>
          )}
        </BottomSheet>
      </View>
    </View>
  );
};

const App = () => (
  <SocketProvider>
    <GPSProvider>
      <IMUProvider>
        <MapPage />
      </IMUProvider>
    </GPSProvider>
  </SocketProvider>
);

export default App;

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: 'center',
  },
  actionButtons: {
    marginTop: 12,
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
