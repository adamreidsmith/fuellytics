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

const CarProfile = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

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
        <TouchableOpacity onPress={toggleModal}>
          <Image
            style={styles.filtericon}
            source={require('../../assets/icons/Filter-alt.png')}
          />
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
              <TextInput placeholder="Is Supercharged" />
              <TextInput placeholder="Drag" />
              <TextInput placeholder="Image url" />
              <Button title="Create" />
              <Button title="Cancle" onPress={toggleModal} />
            </View>
          </Modal>
        </TouchableOpacity>
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
});

export default CarProfile;
