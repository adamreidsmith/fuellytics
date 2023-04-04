import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import DateTimePicker from '@react-native-community/datetimepicker';
import Button from 'components/Button/Button';
import { FilterProps } from './types';

const FiltersPopup: FC<FilterProps> = ({
  isModalVisible,
  startDate,
  endDate,
  setModalVisible,
  onChangeStartDate,
  onChangeEndDate,
}) => (
  <Modal isVisible={isModalVisible}>
    <View style={styles.popup}>
      <Text> Select Date Range</Text>
      <Text>Start Date: </Text>
      <DateTimePicker
        testID="dateTimePicker"
        value={startDate}
        mode="date"
        onChange={onChangeStartDate}
      />
      <Text>Stop Date: </Text>
      <DateTimePicker
        testID="dateTimePicker"
        value={endDate}
        mode="date"
        onChange={onChangeEndDate}
      />
      <Button title="Apply" onPress={() => {}} />
      <Button
        title="Cancel"
        onPress={() => {
          setModalVisible(false);
        }}
      />
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  popup: {
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 1,
    backgroundColor: 'white',
    width: '100%',
  },
});

export default FiltersPopup;
