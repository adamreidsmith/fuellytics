import React, { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ButtonProps } from './types';

const Button: FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled,
}) => (
  <TouchableOpacity
    style={
      {
        primary: primaryStyles.button,
        secondary: secondaryStyles.button,
        danger: dangerStyles.button,
        success: successStyles.button,
      }[variant]
    }
    onPress={onPress}
    disabled={disabled}
  >
    <Text
      style={
        {
          primary: primaryStyles.text,
          secondary: secondaryStyles.text,
          danger: dangerStyles.text,
          success: successStyles.text,
        }[variant]
      }
    >
      {title}
    </Text>
  </TouchableOpacity>
);

const primaryStyles = StyleSheet.create({
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

const secondaryStyles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  text: {
    color: '#007bff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

const dangerStyles = StyleSheet.create({
  button: {
    backgroundColor: '#ff1e00',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

const successStyles = StyleSheet.create({
  button: {
    backgroundColor: '#228f42f8',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Button;
