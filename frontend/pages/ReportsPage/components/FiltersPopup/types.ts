import { DateTimePickerEvent } from '@react-native-community/datetimepicker';

export type FilterProps = {
  isModalVisible?: boolean;
  startDate: Date;
  endDate: Date;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onChangeStartDate: (event: {
    event: DateTimePickerEvent;
    date?: Date | undefined;
  }) => void;
  onChangeEndDate: (event: {
    event: DateTimePickerEvent;
    date?: Date | undefined;
  }) => void;
};
