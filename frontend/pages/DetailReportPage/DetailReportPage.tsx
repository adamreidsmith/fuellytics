import { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import { LocationObjectCoords } from 'expo-location';
import Header from 'components/Header/Header';
import { ParamList } from 'pages';
import { useTrip } from 'services/trips';
import Button from 'components/Button';
import { format } from 'utils/date';

const LATITUDE = 51.0447;
const LONGITUDE = -114.066666;

const DetailReportPage = () => {
  const { navigate } = useNavigation();
  const route = useRoute<RouteProp<ParamList, 'DetailReportPage'>>();
  const [routeCoordinates, setRouteCoordinates] = useState<
    LocationObjectCoords[]
  >([]);

  const { data, status } = useTrip({
    tripId: route.params?.itemId,
    onSuccess: (response) => {
      if (response) {
        setRouteCoordinates(response.routeCoordinates);
      }
    },
  });

  if (status === 'loading') {
    return null;
  }

  return (
    <View style={styles.container}>
      <Header />
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: routeCoordinates[0]?.latitude || LATITUDE,
          longitude: routeCoordinates[0]?.longitude || LONGITUDE,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Polyline coordinates={routeCoordinates} strokeWidth={5} />
      </MapView>
      <View style={styles.bottomSheet}>
        <Text style={styles.contentheader}>Trip Information</Text>
        <View style={styles.detail}>
          {data?.startedAt && (
            <Text>
              Started at: {format(data.startedAt, 'DD/MM/YYYY - HH:mm:ss')}
            </Text>
          )}
          {data?.endedAt && (
            <Text>
              Ended at: {format(data.endedAt, 'DD/MM/YYYY - HH:mm:ss')}
            </Text>
          )}
          <Text>Fuel consumption: {data?.fuelConsumption} L</Text>
          <Text>CO2 emission: {data?.co2Emissions} L</Text>
          <Text>Average speed: {data?.averageSpeed} m/s</Text>
        </View>
        <View style={styles.button}>
          <Button
            title="Back"
            onPress={() => {
              navigate('ReportsPage' as never);
              setRouteCoordinates([]);
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
    height: '50%',
    width: '100%',
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
    fontSize: 18,
    marginBottom: 16,
    fontWeight: 'bold',
  },
  bottomSheet: {
    padding: 24,
  },
  detail: {
    fontSize: 18,
    marginBottom: 16,
  },
  button: {
    borderRadius: 2,
    backgroundColor: '#AAAAAA',
  },
});

export default DetailReportPage;
