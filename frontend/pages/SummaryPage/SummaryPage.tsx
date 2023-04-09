import { Text, View, StyleSheet, Image } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import Header from 'components/Header';
import Button from 'components/Button/Button';
import { ParamList } from 'pages';
import { useTrip } from 'services/trips';
import { format } from 'utils/date';

const SummaryPage = () => {
  const route = useRoute<RouteProp<ParamList, 'DetailReportPage'>>();
  const { navigate } = useNavigation();

  const { data, status } = useTrip({
    tripId: route.params?.itemId,
  });

  if (status === 'loading') return null;

  return (
    <>
      <Header />
      <View style={styles.container}>
        <View style={styles.content}>
          <Image
            style={styles.pic}
            source={require('../../assets/icons/tick.png')}
          />
          <View>
            <Text style={styles.contentheader}>Trip Summary</Text>
          </View>
          <View style={styles.line} />
          <View style={styles.details}>
            {data?.startedAt && (
              <Text style={styles.text}>
                Started at: {format(data.startedAt, 'DD/MM/YYYY - HH:mm:ss')}
              </Text>
            )}
            {data?.endedAt && (
              <Text style={styles.text}>
                Ended at: {format(data.endedAt, 'DD/MM/YYYY - HH:mm:ss')}
              </Text>
            )}
            <Text style={styles.text}>
              Car used: {data?.carProfile.car.model} -{' '}
              {data?.carProfile.car.make}
            </Text>
            <Text style={styles.text}>
              Fuel consumption: {data?.fuelConsumption} L
            </Text>
            <Text style={styles.text}>
              CO2 emission: {data?.co2Emissions} L
            </Text>
            <Text style={styles.text}>
              Average speed: {data?.averageSpeed} km/h
            </Text>
          </View>
          <View style={styles.button}>
            <Button
              title="Back"
              onPress={() => {
                navigate('HomePage' as never);
              }}
            />
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  pic: {
    height: 240,
    width: 240,
    marginBottom: 24,
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentheader: {
    width: 330,
    fontSize: 24,
    color: '#000000',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  line: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#000000',
    borderStyle: 'solid',
    marginBottom: 16,
    marginTop: 16,
  },
  details: {
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    marginBottom: 4,
  },
  button: {
    width: '100%',
  },
});

export default SummaryPage;
