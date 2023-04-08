import { DateTimePickerEvent } from '@react-native-community/datetimepicker';

export type FilterProps = {
  isModalVisible?: boolean;
  startDate?: Date;
  endDate?: Date;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onChangeStartDate: (date?: Date) => void;
  onChangeEndDate: (date?: Date) => void;
};
