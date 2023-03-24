import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';

const ReportsPage = () => {
  const [selectedRange, setRange] = useState({});
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
        <Text style={styles.contentheader}>My Trips</Text>
        <TouchableOpacity onPress={toggleModal}>
          <Image
            style={styles.filtericon}
            source={require('../../assets/icons/Timesheet.png')}
          />
          <Modal isVisible={isModalVisible}>
            <View style={styles.popup}>
              <Text>Hey</Text>
              <Button title="Hide modal" onPress={toggleModal} />
            </View>
          </Modal>
        </TouchableOpacity>

        <ScrollView style={styles.triplist}>
          <View style={styles.tripitem}>
            <Text>Trip 1</Text>
          </View>
          <View style={styles.tripitem}>
            <Text>Trip 2</Text>
          </View>
          <View style={styles.tripitem}>
            <Text>Trip 3</Text>
          </View>
          <View style={styles.tripitem}>
            <Text>Trip 4</Text>
          </View>
        </ScrollView>
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
  contentheader: {
    position: 'absolute',
    height: 27,
    width: 163,
    left: 20,
    top: 170,
    fontSize: 24,
  },
  triplist: {
    height: 520,
    width: 370,
    left: 10,
    top: 210,
  },
  tripitem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 370,
    height: 60,
    backgroundColor: '#D9D9D9',
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#fffff',
    marginTop: 10,
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

export default ReportsPage;
