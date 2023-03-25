import { useState } from 'react';
import { Controller } from 'react-hook-form';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  Button,
  TextInput,
} from 'react-native';
import Modal from 'react-native-modal';
// import SearchableDropdown from 'react-native-searchable-dropdown';
import Checkbox from 'expo-checkbox';

const CarProfile = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isChecked, setChecked] = useState(false);
  const [selectedValues, setSelectedValues] = useState([]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const [carModel, setCarModel] = useState(undefined);

  const items = [
    {
      id: 1,
      name: 'JavaScript',
    },
    {
      id: 2,
      name: 'Java',
    },
    {
      id: 3,
      name: 'Ruby',
    },
    {
      id: 4,
      name: 'React Native',
    },
    {
      id: 5,
      name: 'PHP',
    },
    {
      id: 6,
      name: 'Python',
    },
    {
      id: 7,
      name: 'Go',
    },
    {
      id: 8,
      name: 'Swift',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={require('../../assets/logos/car-logo-removebg-preview.png')}
        />
        <Image
          style={styles.logoname}
          source={require('../../assets/logos/fuellytics-high-resolution-logo-color-on-transparent-background-2-cut.png')}
        />
      </View>
      <View style={styles.content}>
        <Text>Create Car Profile</Text>
        <View style={styles.button}>
          <Text onPress={toggleModal}>Cannot Find my car.</Text>
          <Modal isVisible={isModalVisible}>
            <View style={styles.popup}>
              <Text>Add Car Information</Text>
              <TextInput
                // style={styles.input}
                // onChangeText={onChange}
                // value={value}
                placeholder="Make"
              />
              <TextInput placeholder="Model" />
              <TextInput placeholder="Displacement" />
              <TextInput placeholder="Year" />
              <Checkbox
                // style={styles.checkbox}
                value={isChecked}
                onValueChange={setChecked}
                color={isChecked ? '#4630EB' : undefined}
              />
              <Text>Is Supercharged?</Text>
              <TextInput placeholder="Drag" />
              <TextInput placeholder="Image url" />
              <Button title="Create" />
              <Button title="Cancle" onPress={toggleModal} />
            </View>
          </Modal>
        </View>
        {/* <SearchableDropdown
          options={items}
          selectedValues={selectedValues}
          setSelectedValues={setSelectedValues}
          label="test dropdown"
          placeholder="Test placeholder"
          inputSize={300}
        /> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    position: 'relative',
    alignContent: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  filtericon: {
    position: 'absolute',
    height: 27,
    width: 27,
    left: 353,
    top: 170,
    borderRadius: 0,
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
    position: 'absolute',
    fontSize: 16,
    color: '#6536F9',
    left: 136,
    top: 700,
  },
});

export default CarProfile;
