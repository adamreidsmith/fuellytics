import { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useNavigation } from '@react-navigation/native';

const ReportsPage = () => {
  const { navigate } = useNavigation();

  const data = {
    labels: ['1', '2', '3', '4', '5', '6'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => '#000000',
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = () => {
    // console.warn('A date has been picked: ', date);
    hideDatePicker();
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
      <View style={styles.content}>
        <Text style={styles.contentheader}>March</Text>
        <TouchableOpacity onPress={showDatePicker}>
          <Image
            style={styles.calendaricon}
            source={require('../../assets/icons/Timesheet.png')}
          />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </TouchableOpacity>
        <View style={styles.graphbox}>
          <BarChart
            style={styles.barchart}
            data={data}
            height={300}
            width={389}
            yAxisSuffix="k"
            yAxisLabel="$"
            chartConfig={chartConfig}
            verticalLabelRotation={30}
          />
        </View>
        <View style={styles.amountbox}>
          <Text style={styles.boxheader}>Amount</Text>
          <Text style={styles.boxcontent}>158.76 L</Text>
        </View>
        <View style={styles.expensebox}>
          <Text style={styles.boxheader}>Expense</Text>
          <Text style={styles.boxcontent}>$ 158.76</Text>
        </View>
        <View style={styles.gasemissionbox}>
          <Image
            style={styles.CO2icon}
            source={require('../../assets/icons/CO2.png')}
          />
          <Text style={styles.gasemissionheader}>Gas Emission</Text>
        </View>
        <View style={styles.gasconsumptionbox}>
          <Image
            style={styles.gasicon}
            source={require('../../assets/icons/Gas.png')}
          />
          <Text style={styles.gasemissionheader}>Gas Consumption</Text>
        </View>
        <View style={styles.button}>
          <Button
            title="Back"
            onPress={() => {
              navigate('HomePage' as never, {} as never);
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
    // justifyContent: 'center',
    // alignItems: 'center',
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
  calendaricon: {
    position: 'absolute',
    height: 41,
    width: 32,
    left: 351,
    top: 160,
    borderRadius: 0,
  },
  contentheader: {
    position: 'absolute',
    height: 27,
    width: 130,
    left: 10,
    top: 173,
    fontSize: 18,
    color: '#000000',
    textAlign: 'left',
  },
  graphbox: {
    height: 310,
    width: 389,
    left: 1,
    top: 200,
    borderRadius: 0,
    alignItems: 'center',
  },
  barchart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  amountbox: {
    position: 'absolute',
    height: 60,
    width: 130,
    left: 52,
    top: 524,
  },
  expensebox: {
    position: 'absolute',
    height: 60,
    width: 130,
    left: 210,
    top: 524,
  },
  boxheader: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  boxcontent: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  gasemissionbox: {
    position: 'absolute',
    width: 119,
    height: 100,
    left: 76,
    top: 600,
    borderWidth: 1.5,
    borderStyle: 'solid',
    borderColor: '#000000',
  },
  gasemissionheader: {
    position: 'absolute',
    height: 30,
    width: 80,
    left: 88,
    top: 667,
    fontSize: 12,
  },
  gasconsumptionbox: {
    position: 'absolute',
    width: 119,
    height: 100,
    left: 191,
    top: 600,
    borderWidth: 1.5,
    borderStyle: 'solid',
    borderColor: '#000000',
  },
  CO2icon: {
    // position: 'absolute',
    height: 62,
    width: 45,
    left: 137,
    top: 592,
    borderRadius: 0,
  },
  gasicon: {
    // position: 'absolute',
    height: 40,
    width: 40,
    left: 265,
    top: 602,
  },
  button: {
    position: 'absolute',
    height: 40,
    width: 120,
    left: 136,
    top: 712,
    borderRadius: 2,
    backgroundColor: '#AAAAAA',
  },
});

export default ReportsPage;
