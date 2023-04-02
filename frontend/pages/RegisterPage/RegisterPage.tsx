import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Image } from 'react-native';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { useCSRFToken, useRegister } from 'services/authentication';
import { useAuthContext } from 'context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: '',
      username: '',
      password: '',
    },
  });

  const { register } = useAuthContext();
  const { navigate } = useNavigation();

  useCSRFToken();

  const onSubmit: SubmitHandler<{
    email: string;
    username: string;
    password: string;
  }> = (data) => {
    register({
      email: data.email,
      password: data.password,
      username: data.username,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.altLogoContainer}>
        <Image
          source={require('../../assets/logos/fuellytics-high-resolution-logo-color-on-transparent-background.png')}
          style={styles.altLogo}
        />
      </View>
      <Controller
        control={control}
        name="username"
        rules={{ required: { value: true, message: 'This field is required' } }}
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            onChangeText={onChange}
            value={value}
            placeholder="Username"
          />
        )}
      />
      {errors.username?.message && (
        <Text style={styles.error}>{errors.username?.message}</Text>
      )}
      <Controller
        control={control}
        name="email"
        rules={{ required: { value: true, message: 'This field is required' } }}
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            onChangeText={onChange}
            value={value}
            placeholder="Email"
          />
        )}
      />
      {errors.email?.message && (
        <Text style={styles.error}>{errors.email?.message}</Text>
      )}
      <Controller
        control={control}
        name="password"
        rules={{ required: { value: true, message: 'This field is required' } }}
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            onChangeText={onChange}
            value={value}
            placeholder="Password"
            secureTextEntry
          />
        )}
      />
      {errors.password?.message && (
        <Text style={styles.error}>{errors.password?.message}</Text>
      )}
      <View style={styles.loginTextContainer}>
        <Text style={styles.loginText}>Already have an account? </Text>
        <Text
          style={[styles.loginText, styles.loginButton]}
          onPress={() => {
            navigate('LoginPage' as never, {} as never);
          }}
        >
          Login
        </Text>
      </View>
      <Button title="Register" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '43%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 4,
    marginTop: 4,
    width: '80%',
  },
  loginText: {
    fontSize: 16,
    color: '#91919F',
  },
  loginButton: {
    color: '#6536F9',
  },
  loginTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  altLogo: {
    height: 105,
    width: 320,
  },
  altLogoContainer: {
    marginBottom: 16,
  },
  error: {
    color: '#FF0000',
  },
});

export default RegisterForm;
