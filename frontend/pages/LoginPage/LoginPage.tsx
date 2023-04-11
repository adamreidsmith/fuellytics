import React from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { useCSRFToken } from 'services/authentication';
import { useAuthContext } from 'context/AuthContext';

const LoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      username: '',
      password: '',
    },
  });
  const { login } = useAuthContext();
  const { navigate } = useNavigation();

  useCSRFToken();

  const onSubmit: SubmitHandler<{ username: string; password: string }> = (
    data,
  ) => {
    login({
      username: data.username,
      password: data.password,
    });
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.altLogoContainer}>
          <Image
            source={require('../../assets/logos/fuellytics-high-resolution-logo-black-red-on-transparent-background.png')}
            style={styles.altLogo}
          />
        </View>
        <Controller
          control={control}
          name="username"
          rules={{
            required: { value: true, message: 'This field is required' },
          }}
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
          name="password"
          rules={{
            required: { value: true, message: 'This field is required' },
          }}
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
        <View style={styles.registerTextContainer}>
          <Text style={styles.registerText}>Do not have an account yet? </Text>
          <Text
            style={[styles.registerText, styles.registerButton]}
            onPress={() => {
              navigate('RegisterPage' as never, {} as never);
              clearErrors();
              reset();
            }}
          >
            Register
          </Text>
        </View>
        <Button title="Login" onPress={handleSubmit(onSubmit)} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '44%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    width: '80%',
    marginBottom: 4,
    marginTop: 4,
  },
  registerText: {
    fontSize: 16,
    color: '#91919F',
  },
  registerButton: {
    color: '#6536F9',
  },
  registerTextContainer: {
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

export default LoginForm;
