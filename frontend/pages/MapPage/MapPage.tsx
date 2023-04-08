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
import { Grid, LineChart, XAxis, YAxis } from 'react-native-svg-charts';
import { IMUProvider, useIMUContext } from 'contexts/IMUContext';
import { GPSProvider, useGPSContext } from 'contexts/GPSContext';
import { useCarProfiles } from 'services/carProfile';
import { useAuthContext } from 'context/AuthContext';
import useDebounce from 'hooks/useDebounce';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import { SocketProvider } from 'contexts/SocketContext';
import { useSocketContext } from 'contexts/SocketContext/useSocketContext';
import { format } from 'utils/date';
import { metrics } from './constants';
import { FormattedCarProfile, MetricType } from './types';

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
  const { socket, isConnected, graphsData, setGraphsData, counters, xValues } =
    useSocketContext();

  const [startedAt, setStartedAt] = useState<Date | undefined>(undefined);
  const [openCollapsible, setOpenCollapsible] = useState<MetricType>('co2');
  const { navigate } = useNavigation();
  const [isRecording, setIsRecording] = useState(false);
  const { mutateAsync: createTrip } = useCreateTrip({
    onSuccess: (response) => {
      if (response.success) {
        navigate('SummaryPage' as never, { itemId: response.data.id } as never);
      }
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
    }, 1000);

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
      subscribeToLocationUpdates();
      setIsRecording(true);
      setStartedAt(new Date());
    }
  };

  const onPauseRecording = () => {
    unsubscribeFromLocationUpdates();
    setIsRecording(false);
  };

  const onEndRecording = () => {
    unsubscribeFromLocationUpdates();
    setIsRecording(false);

    if (selectedCar && startedAt) {
      createTrip({
        startedAt: format(startedAt, 'YYYY-MM-DDTHH:mm:ss[Z]'),
        endedAt: format(new Date(), 'YYYY-MM-DDTHH:mm:ss[Z]'),
        routeCoordinates,
        co2Emissions: counters.co2Emissions,
        averageSpeed: counters.averageSpeed,
        carProfileId: parseInt(selectedCar?.id, 10),
        fuelConsumption: counters.fuelConsumption,
      });
    }

    // SEND POST REQUEST, and on success navigate()
    setStartedAt(undefined);
    setSelectedCar(null);
    setGraphsData({
      fuel: [],
      speed: [],
      co2: [],
    });
    setRouteCoordinates([]);
  };

  const onContinueRecording = async () => {
    subscribeToLocationUpdates();
    setIsRecording(true);
  };

  const snapPoints = useMemo(
    () => ['10%', hasStartedRecording ? '70%' : '22.5%'],
    [hasStartedRecording],
  );

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
                        {metric.label}: Time vs {metric.units}
                      </Text>
                    </TouchableOpacity>
                    <Collapsible collapsed={openCollapsible !== metric.value}>
                      <View style={{ height: 150, flexDirection: 'row' }}>
                        <YAxis
                          style={{ marginRight: 4, height: '100%', width: 64 }}
                          data={graphsData[metric.value]}
                          contentInset={contentInset}
                          svg={{ fontSize: 10, fill: 'black' }}
                          formatLabel={(value) => `${value} ${metric.units}`}
                          numberOfTicks={6}
                        />
                        <LineChart
                          style={{ flex: 1 }}
                          data={graphsData[metric.value]}
                          contentInset={{ top: 20, bottom: 20 }}
                          svg={{ stroke: 'green', strokeWidth: 2 }}
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
                      title="Continue Recording"
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
                <View style={styles.actionButtons}>
                  <Button
                    title="Start recording"
                    onPress={() => onStartRecording()}
                    disabled={!selectedCar}
                  />
                </View>
              ) : (
                <View style={styles.loader}>
                  <Text>Connecting...</Text>
                </View>
              )}
            </View>
          )}
        </BottomSheet>
      </View>
    </View>
  );
};

const App = () => (
  <IMUProvider>
    <GPSProvider>
      <SocketProvider>
        <MapPage />
      </SocketProvider>
    </GPSProvider>
  </IMUProvider>
);

export default App;

const styles = StyleSheet.create({
  loader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingTop: 32,
  },
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
