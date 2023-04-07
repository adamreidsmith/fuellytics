import React, { FC, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import Button from 'components/Button/Button';
import { FilterProps } from './types';

type DateInnerType = {
  event: DateTimePickerEvent;
  date?: Date;
};

const FiltersPopup: FC<FilterProps> = ({
  isModalVisible,
  startDate,
  endDate,
  setModalVisible,
  onChangeStartDate,
  onChangeEndDate,
}) => {
  const [startDateInner, setStartDateInner] = useState<DateInnerType>();
  const [endDateInner, setEndDateInner] = useState<DateInnerType>();

  useEffect(() => {
    if (!isModalVisible) {
      setStartDateInner(undefined);
      setEndDateInner(undefined);
    }
  }, [isModalVisible]);

  return (
    <Modal isVisible={isModalVisible}>
      <View style={styles.popup}>
        <Text style={[styles.bold, styles.marginBottom]}>
          Filter trips by date range
        </Text>
        <View style={[styles.flex, styles.marginBottom]}>
          <Text style={styles.bold}>Start Date: </Text>
          <DateTimePicker
            testID="dateTimePicker"
            value={startDate}
            mode="date"
            onChange={(event, date) => {
              setStartDateInner({
                event,
                date,
              });
            }}
          />
        </View>
        <View style={[styles.flex, styles.marginBottom]}>
          <Text style={styles.bold}>End Date:</Text>
          <DateTimePicker
            testID="dateTimePicker"
            value={endDate}
            mode="date"
            onChange={(event, date) => {
              setEndDateInner({
                event,
                date,
              });
            }}
          />
        </View>
        <View style={styles.marginBottom}>
          <Button
            title="Apply"
            onPress={() => {
              if (startDateInner && endDateInner) {
                onChangeStartDate(startDateInner);
                onChangeEndDate(endDateInner);
              }
            }}
          />
        </View>
        <View style={styles.marginBottom}>
          <Button
            title="Cancel"
            variant="danger"
            onPress={() => {
              setModalVisible(false);
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  popup: {
    padding: 24,
    borderRadius: 1,
    backgroundColor: 'white',
    width: '100%',
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  marginBottom: {
    marginBottom: 16,
  },
  bold: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default FiltersPopup;
