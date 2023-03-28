import { GestureResponderEvent } from 'react-native';

export type ButtonProps = {
  onPress: (event: GestureResponderEvent) => void;
  title: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  disabled?: boolean;
};
