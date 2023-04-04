import { DateTimePickerEvent } from '@react-native-community/datetimepicker';

export type FilterProps = {
  isModalVisible?: boolean;
  startDate: Date;
  endDate: Date;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onChangeStartDate: (event: DateTimePickerEvent, date?: Date) => void;
  onChangeEndDate: (event: DateTimePickerEvent, date?: Date) => void;
};
