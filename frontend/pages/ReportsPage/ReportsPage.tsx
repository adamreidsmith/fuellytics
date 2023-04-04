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
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import FiltersPopup from './components/FiltersPopup/FiltersPopup';

const ReportsPage = () => {
  const { navigate } = useNavigation();
  const { user } = useAuthContext();
  const { trips, status } = useTrips({ userId: user?.id });
  const [selectedRange, setRange] = useState({});
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

  const onChangeStartDate = (
    event: DateTimePickerEvent,
    selectedDate?: Date | undefined,
  ) => {
    if (selectedDate) {
      setStartDate(selectedDate);
    }
  };

  const onChangeEndDate = (
    event: DateTimePickerEvent,
    selectedDate?: Date | undefined,
  ) => {
    if (selectedDate) {
      setEndDate(selectedDate);
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.contentheader}>My Trips</Text>
          <TouchableOpacity onPress={toggleModal}>
            <Image source={require('../../assets/icons/Timesheet.png')} />
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.tripList}>
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
      <FiltersPopup
        isModalVisible={isModalVisible}
        startDate={startDate}
        endDate={endDate}
        setModalVisible={setModalVisible}
        onChangeStartDate={onChangeStartDate}
        onChangeEndDate={onChangeEndDate}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  contentContainer: {
    padding: 24,
  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    marginBottom: 24,
  },
  contentheader: {
    fontSize: 24,
  },
  tripList: {
    width: '100%',
  },
  tripItem: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D9D9D9',
    borderRadius: 8,
    borderWidth: 3,
    borderColor: '#fffff',
    marginTop: 10,
  },
});

export default ReportsPage;
