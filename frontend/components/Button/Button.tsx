import React, { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ButtonProps } from './types';

const Button: FC<ButtonProps> = ({ title, onPress, variant = 'primary' }) => (
  <TouchableOpacity
    style={
      variant === 'primary' ? primaryStyles.button : secondaryStyles.button
    }
    onPress={onPress}
  >
    <Text
      style={variant === 'primary' ? primaryStyles.text : secondaryStyles.text}
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
    borderRadius: 4,
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
    borderRadius: 4,
    alignItems: 'center',
  },
  text: {
    color: '#007bff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Button;
