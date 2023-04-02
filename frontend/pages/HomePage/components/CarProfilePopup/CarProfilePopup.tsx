import React, { FC, useEffect, useState } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  TextInput,
} from 'react-native';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';
import Checkbox from 'expo-checkbox';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import { useCars } from 'services/cars';
import Header from 'components/Header';
import Button from 'components/Button';
import { useCreateCarProfile, useDeleteCarProfile } from 'services/carProfile';
import { CarProfileProps, FormattedCar } from './types';

const CarProfile: FC<CarProfileProps> = ({
  isModalVisible,
  setModalVisible,
  refetch,
}) => {
  const { navigate } = useNavigation();

  const [isChecked, setChecked] = useState(false);
  const [searchKey, setSearchKey] = useState('');

  const [carModel, setCarModel] = useState(undefined);
  const [selectedItem, setSelectedItem] = useState<FormattedCar | null>(null);
  const { cars } = useCars({ search: searchKey });
  const { mutateAsync: createCarProfile } = useCreateCarProfile({
    onSuccess: (response) => {
      setModalVisible(false);
      navigate('HomePage' as never, {} as never);
      refetch();
    },
  });

  return (
    <Modal isVisible={isModalVisible}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.contentheader}>Search for a Vehicle:</Text>
          <View style={styles.searcharea}>
            <AutocompleteDropdown
              clearOnFocus={false}
              closeOnSubmit={false}
              // @ts-ignore
              onSelectItem={setSelectedItem}
              dataSet={cars}
              onChangeText={(value) => setSearchKey(value)}
            />
          </View>
          <View style={styles.submitButton}>
            <Button
              title="Create"
              variant="primary"
              onPress={() => {
                if (selectedItem) {
                  createCarProfile({
                    carId: selectedItem?.id,
                  });
                }
              }}
            />
          </View>
          <View style={styles.submitButton}>
            <Button
              title="Enter my own vehicle"
              variant="success"
              onPress={() => {
                navigate('CreateCarProfile' as never, {} as never);
              }}
            />
          </View>
          <View style={styles.submitButton}>
            <Button
              title="Cancel"
              variant="danger"
              onPress={() => {
                setModalVisible(false);
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    position: 'relative',
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#FFFF',
    paddingTop: 24,
    paddingBottom: 24,
  },
  header: {
    position: 'absolute',
    width: 390,
    height: 152,
    left: 0,
    top: 0,
    backgroundColor: '#AAAAAA',
  },
  logo: {
    position: 'absolute',
    width: 70,
    height: 60,
    left: 26,
    top: 66,
  },
  logoname: {
    position: 'absolute',
    width: 250,
    height: 40,
    left: 126,
    top: 76,
  },
  content: {
    padding: 24,
  },
  searcharea: {
    zIndex: 999,
  },
  imgarea: {
    // position: 'absolute',
    // height: 330,
    // width: 390,
    // left: 0,
    // top: 425,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  detail: {
    // position: 'relative',
    // height: 130,
    // width: 390,
    // left: 0,
    // top: 360,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  popup: {
    // flex: 1,
    height: 500,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 1,
    backgroundColor: 'white',
  },
  button: {
    // position: 'absolute',
    // fontSize: 16,
    // color: '#6536F9',
    // left: 136,
    // top: 700,
  },
  submitButton: {
    marginTop: 16,
    // position: 'absolute',
    // width: 390,
    // height: 92,
    // left: 0,
    // top: 752,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#AAAAAA',
  },
  contentheader: {
    fontSize: 18,
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 4,
    marginTop: 4,
    width: '80%',
  },
  buttonContainer: {
    position: 'relative',
    justifyContent: 'space-around',
  },
});

export default CarProfile;
