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
import { format } from 'utils/date';
import { FlashList } from '@shopify/flash-list';
import FiltersPopup from './components/FiltersPopup/FiltersPopup';

const ReportsPage = () => {
  const { navigate } = useNavigation();
  const { user } = useAuthContext();
  const { trips, status, fetchNextPage } = useTrips({ userId: user?.id });
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
        <View style={styles.tripList}>
          <FlashList
            data={trips}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.tripItem}
                key={item.id}
                onPress={() => {
                  navigate(
                    'DetailReportPage' as never,
                    { itemId: item.id } as never,
                  );
                }}
              >
                <Text style={styles.tripTitle}>Trip id: #{item.id}</Text>
                <Text>
                  Started at: {format(item.startedAt, 'DD/MM/YYYY - HH:mm:ss')}
                </Text>
                <Text>
                  Ended at:{format(item.endedAt, 'DD/MM/YYYY - HH:mm:ss')}
                </Text>
              </TouchableOpacity>
            )}
            onEndReached={fetchNextPage}
            estimatedItemSize={100}
          />
        </View>
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
    padding: 16,
    height: '75%',
    backgroundColor: '#D9D9D9',
    borderRadius: 8,
  },
  tripItem: {
    justifyContent: 'center',
    backgroundColor: '#FFFF',
    borderRadius: 8,
    borderColor: '#fffff',
    marginTop: 10,
    padding: 16,
    width: '100%',
  },
  tripTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ReportsPage;
