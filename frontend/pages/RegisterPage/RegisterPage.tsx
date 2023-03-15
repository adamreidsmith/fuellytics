import React from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';

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

  const onSubmit: SubmitHandler<{
    email: string;
    username: string;
    password: string;
  }> = (data) => {
    console.log(data);
  };

  return (
    <View style={styles.container}>
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
      {errors.username?.message && <Text>{errors.username?.message}</Text>}
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
      {errors.email?.message && <Text>{errors.email?.message}</Text>}
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
      {errors.password?.message && <Text>{errors.password?.message}</Text>}
      <Button title="Register" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    width: '80%',
  },
});

export default RegisterForm;