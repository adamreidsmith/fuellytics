import React, { useEffect, useState } from 'react';
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
import useDebounce from 'hooks/useDebounce';
import { FormattedCar } from './types';

const CarProfile = () => {
  const { navigate } = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [isChecked, setChecked] = useState(false);
  const [searchKey, setSearchKey] = useState('');

  const debouncedKey = useDebounce(searchKey);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const [carModel, setCarModel] = useState(undefined);
  const [selectedItem, setSelectedItem] = useState<FormattedCar | null>(null);
  const { cars } = useCars({ search: debouncedKey });

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Text style={styles.contentheader}>Create Car Profile</Text>
        <View style={styles.searcharea}>
          <AutocompleteDropdown
            clearOnFocus={false}
            closeOnSubmit={false}
            onSelectItem={setSelectedItem}
            dataSet={cars}
            onChangeText={(value) => setSearchKey(value)}
          />
        </View>
        {/* <View style={styles.detail}>
          {JSON.stringify(selectedItem) === 'null' ? (
            <Text> </Text>
          ) : (
            // <Text>Test</Text>
            <Text>Selected item: {JSON.stringify(selectedItem)}</Text>
          )}
        </View>
        {/* <View style={styles.detail}>
          <Text>This is image</Text>
        </View> */}
        <View style={styles.button}>
          <Text onPress={toggleModal}>Cannot find my vehicle</Text>
          <Modal isVisible={isModalVisible}>
            <View style={styles.popup}>
              <Text>Add Car Information</Text>
              <TextInput
                style={styles.input}
                // onChangeText={onChange}
                // value={value}
                placeholder="Make"
              />
              <TextInput style={styles.input} placeholder="Model" />
              <TextInput style={styles.input} placeholder="Displacement" />
              <TextInput style={styles.input} placeholder="Year" />
              <View style={styles.rowContainer}>
                <Checkbox
                  // style={styles.checkbox}
                  value={isChecked}
                  onValueChange={setChecked}
                  color={isChecked ? '#434343' : undefined}
                />
                <Text> Is Supercharged?</Text>
              </View>
              <TextInput style={styles.input} placeholder="Drag" />
              <TextInput style={styles.input} placeholder="Image url" />
              <View style={styles.rowContainer}>
                <Button title="Create" />
                <Button title="Cancel" onPress={toggleModal} />
              </View>
            </View>
          </Modal>
        </View>
        <View style={styles.submitButton}>
          <Button
            title="Create"
            variant="primary"
            onPress={() => {
              navigate('HomePage' as never, {} as never);
            }}
          />
        </View>
        <View style={styles.submitButton}>
          <Button
            title="Enter my own car"
            variant="success"
            onPress={() => {
              navigate('HomePage' as never, {} as never);
            }}
          />
        </View>
        <View style={styles.submitButton}>
          <Button
            title="Cancel"
            variant="danger"
            onPress={() => {
              navigate('HomePage' as never, {} as never);
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    position: 'relative',
    // justifyContent: 'center',
    // alignItems: 'center',
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
  rowContainer: {
    position: 'relative',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
});

export default CarProfile;
