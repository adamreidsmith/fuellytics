import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Checkbox from 'expo-checkbox';
import Header from 'components/Header';
import Button from 'components/Button';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useCreateCar } from 'services/cars';
import { useCarProfiles, useCreateCarProfile } from 'services/carProfile';
import { useAuthContext } from 'context/AuthContext';
import { FormData } from './types';

const CarProfile = () => {
  const { navigate } = useNavigation();
  const { user } = useAuthContext();
  const { refetch } = useCarProfiles({
    userId: user?.id,
  });
  const { mutateAsync: createCarProfile } = useCreateCarProfile({
    onSuccess: (response) => {
      if (response.success) {
        navigate('HomePage' as never);
        refetch();
      }
    },
  });

  const { mutateAsync: createCar } = useCreateCar({
    onSuccess: (response) => {
      if (response.success) {
        createCarProfile({ carId: response.data.id.toString() });
      }
    },
  });

  const { control, handleSubmit } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      make: '',
      model: '',
      displacement: '',
      year: '',
      isSupercharged: false,
      drag: '',
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    createCar(data);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View>
        <Header />
        <View style={styles.content}>
          <Text style={styles.contentheader}>Add Car Information</Text>
          <Controller
            control={control}
            name="make"
            rules={{
              required: { value: true, message: 'This field is required' },
            }}
            defaultValue=""
            render={({ field: { onChange, value }, formState: { errors } }) => (
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Make"
                  onChangeText={onChange}
                  value={value}
                />
                {errors.make?.message && (
                  <Text style={styles.formErrors}>{errors.make?.message}</Text>
                )}
              </View>
            )}
          />
          <Controller
            control={control}
            name="model"
            rules={{
              required: { value: true, message: 'This field is required' },
            }}
            defaultValue=""
            render={({ field: { onChange, value }, formState: { errors } }) => (
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Model"
                  onChangeText={onChange}
                  value={value}
                />
                {errors.model?.message && (
                  <Text style={styles.formErrors}>{errors.model?.message}</Text>
                )}
              </View>
            )}
          />
          <Controller
            control={control}
            name="displacement"
            rules={{
              required: { value: true, message: 'This field is required' },
            }}
            defaultValue=""
            render={({ field: { onChange, value }, formState: { errors } }) => (
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Displacement"
                  onChangeText={onChange}
                  value={value}
                  keyboardType="numeric"
                />
                {errors.displacement?.message && (
                  <Text style={styles.formErrors}>
                    {errors.displacement?.message}
                  </Text>
                )}
              </View>
            )}
          />
          <Controller
            control={control}
            name="year"
            rules={{
              required: { value: true, message: 'This field is required' },
            }}
            defaultValue=""
            render={({ field: { onChange, value }, formState: { errors } }) => (
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Year"
                  onChangeText={onChange}
                  value={value}
                  keyboardType="numeric"
                />
                {errors.year?.message && (
                  <Text style={styles.formErrors}>{errors.year?.message}</Text>
                )}
              </View>
            )}
          />
          <Controller
            control={control}
            name="isSupercharged"
            rules={{
              required: false,
            }}
            render={({ field: { onChange, value } }) => (
              <View style={styles.rowContainer}>
                <Checkbox
                  style={{ marginRight: 8 }}
                  value={value}
                  onValueChange={onChange}
                  color={value ? '#434343' : undefined}
                />
                <Text>Is Supercharged?</Text>
              </View>
            )}
          />
          <Controller
            control={control}
            name="drag"
            rules={{
              required: { value: true, message: 'This field is required' },
            }}
            defaultValue=""
            render={({ field: { onChange, value }, formState: { errors } }) => (
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Drag"
                  value={value}
                  onChangeText={onChange}
                  keyboardType="numeric"
                />
                {errors.drag?.message && (
                  <Text style={styles.formErrors}>{errors.drag?.message}</Text>
                )}
              </View>
            )}
          />
          <View>
            <View style={styles.submitButton}>
              <Button title="Create" onPress={handleSubmit(onSubmit)} />
            </View>
            <Button
              title="Cancel"
              variant="danger"
              onPress={() => {
                navigate('HomePage' as never);
              }}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 24,
  },
  submitButton: {
    marginBottom: 16,
  },
  contentheader: {
    fontSize: 18,
    marginBottom: 16,
    fontWeight: 'bold',
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginTop: 4,
    width: '100%',
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'center',
  },
  formErrors: {
    fontSize: 12,
    marginTop: 4,
    color: 'red',
  },
});

export default CarProfile;
