import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { TextLinkProps } from './types';

const TextLink: React.FC<TextLinkProps> = ({
  title,
  onPress,
  style,
  ...rest
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.textLink, style]}
    {...rest}
  >
    <Text style={styles.text}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  textLink: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#007bff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TextLink;
