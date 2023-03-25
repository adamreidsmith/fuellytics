import Header from 'components/Header';
import { useAuthContext } from 'context/AuthContext';
import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import { useTrips } from 'services/trips';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';

const ReportsPage = () => {
  const { navigate } = useNavigation();
  const { user } = useAuthContext();
  const { trips, status } = useTrips({ userId: user?.id });
  const [selectedRange, setRange] = useState({});
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const [startdate, setstartDate] = useState(new Date(1598051730000));
  const [stopdate, setstopDate] = useState(new Date(1598051730000));
  const [show, setShow] = useState(true);

  const onChangeStart = (event, selectedDate) => {
    const currentDate = selectedDate;

    setShow(true);
    setstartDate(currentDate);
  };

  const onChangeStop = (event, selectedDate) => {
    const currentDate = selectedDate;

    setShow(true);
    setstopDate(currentDate);
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Text style={styles.contentheader}>My Trips</Text>
        <TouchableOpacity onPress={toggleModal}>
          <Image
            style={styles.filtericon}
            source={require('../../assets/icons/Timesheet.png')}
          />
          <Modal isVisible={isModalVisible}>
            <View style={styles.popup}>
              <Text> Select Date Range</Text>
              <Text>Start Date: </Text>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={startdate}
                  mode="date"
                  onChange={onChangeStart}
                />
              )}
              <Text>Stop Date: </Text>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={stopdate}
                  mode="date"
                  onChange={onChangeStop}
                />
              )}
              <Button title="Apply" />
              <Button title="Cancel" onPress={toggleModal} />
            </View>
          </Modal>
        </TouchableOpacity>

        <ScrollView style={styles.triplist}>
          <View style={styles.tripItem}>
            <Button
              title="Trip1"
              onPress={() => {
                navigate('DetailReportPage' as never, {} as never);
              }}
            />
          </View>
          <View style={styles.tripItem}>
            <Button
              title="Trip2"
              onPress={() => {
                navigate('DetailReportPage' as never, {} as never);
              }}
            />
          </View>
          <View style={styles.tripItem}>
            <Button
              title="Trip3"
              onPress={() => {
                navigate('DetailReportPage' as never, {} as never);
              }}
            />
          </View>
          <View style={styles.tripItem}>
            <Button
              title="Trip4"
              onPress={() => {
                navigate('DetailReportPage' as never, {} as never);
              }}
            />
          </View>
        </ScrollView>
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
    left: 20,
    top: 170,
    fontSize: 24,
  },
  triplist: {
    height: 520,
    width: 370,
    left: 10,
    top: 210,
  },
  tripItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 370,
    height: 60,
    backgroundColor: '#D9D9D9',
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#fffff',
    marginTop: 10,
  },
  popup: {
    // flex: 1,
    height: 500,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 1,
    backgroundColor: 'white',
  },
});

export default ReportsPage;
