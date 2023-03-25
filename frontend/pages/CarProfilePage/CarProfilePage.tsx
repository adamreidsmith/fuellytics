import React, { useEffect, useState } from 'react';
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
import { useNavigation } from '@react-navigation/native';
import Checkbox from 'expo-checkbox';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';

const CarProfile = () => {
  const { navigate } = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [isChecked, setChecked] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const [carModel, setCarModel] = useState(undefined);
  const [selectedItem, setSelectedItem] = useState(null);
  const items = [
    {
      id: '1',
      title: 'JavaScript',
      detail: 'Another line of data',
    },
    {
      id: '2',
      title: 'Java',
      detail: 'Another line of data',
    },
    {
      id: '3',
      title: 'Ruby',
      detail: 'Another line of data',
    },
    {
      id: '4',
      title: 'React Native',
      detail: 'Another line of data',
    },
    {
      id: '5',
      title: 'PHP',
      detail: 'Another line of data',
    },
    {
      id: '6',
      title: 'Python',
      detail: 'Another line of data',
    },
    {
      id: '7',
      title: 'Go',
      detail: 'Another line of data',
    },
    {
      id: '8',
      title: 'Swift',
      detail: 'Another line of data',
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
        <Text style={styles.contentheader}>Select Car Profile</Text>
        <View style={styles.searcharea}>
          <AutocompleteDropdown
            clearOnFocus={false}
            closeOnSubmit={false}
            onSelectItem={setSelectedItem}
            // containerStyle={{ flexGrow: 1, flexShrink: 1 }}
            dataSet={items}
          />
        </View>
        <View style={styles.detail}>
          {JSON.stringify(selectedItem) === 'null' ? (
            <Text> </Text>
          ) : (
            // <Text>Test</Text>
            <Text>Selected item: {JSON.stringify(selectedItem)}</Text>
          )}
        </View>
        <View style={styles.imgarea}>
          <Text>This is image</Text>
        </View>
        <View style={styles.button}>
          <Text onPress={toggleModal}>Cannot Find my car.</Text>
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
              <Checkbox
                // style={styles.checkbox}
                value={isChecked}
                onValueChange={setChecked}
                color={isChecked ? '#4630EB' : undefined}
              />
              <Text>Is Supercharged?</Text>
              <TextInput style={styles.input} placeholder="Drag" />
              <TextInput style={styles.input} placeholder="Image url" />
              <View style={styles.buttonContainer}>
                <Button title="Create" />
                <Button title="Cancle" onPress={toggleModal} />
              </View>
            </View>
          </Modal>
        </View>
        <View style={styles.buttom}>
          <Button
            title="Back"
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
    position: 'relative',
    alignContent: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  searcharea: {
    position: 'absolute',
    height: 40,
    width: 345,
    left: 23,
    top: 220,
  },
  imgarea: {
    position: 'absolute',
    height: 330,
    width: 390,
    left: 0,
    top: 425,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detail: {
    position: 'relative',
    height: 130,
    width: 390,
    left: 0,
    top: 360,
    justifyContent: 'center',
    alignItems: 'center',
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
  buttom: {
    position: 'absolute',
    width: 390,
    height: 92,
    left: 0,
    top: 752,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#AAAAAA',
  },
  contentheader: {
    position: 'absolute',
    height: 27,
    width: 163,
    left: 11,
    top: 170,
    fontSize: 18,
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
