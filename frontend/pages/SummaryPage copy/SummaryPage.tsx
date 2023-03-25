import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  Alert,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { Component } from 'react';

const SummaryPage = () => {
  const { navigate } = useNavigation();

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
        <Image
          style={styles.pic}
          source={require('../../assets/icons/tick.png')}
        />
        <Text style={styles.contentheader}>Fuellytics Summary</Text>
        <View style={styles.line} />
        <View style={styles.details}>
          <Text>Time:</Text>
          <Text>Gas consumption:</Text>
          <Text>Gas emission:</Text>
        </View>
        <View style={styles.button}>
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
  pic: {
    position: 'absolute',
    height: 251,
    width: 251,
    left: 70,
    top: 235,
    borderRadius: 0,
  },
  contentheader: {
    position: 'absolute',
    height: 50,
    width: 330,
    left: 31,
    top: 506,
    fontSize: 20,
    color: '#000000',
    textAlign: 'center',
  },
  line: {
    position: 'absolute',
    width: 350,
    height: 0,
    left: 20,
    top: 541,
    borderWidth: 1,
    borderColor: '#000000',
    borderStyle: 'solid',
  },
  details: {
    position: 'absolute',
    width: 148,
    height: 54,
    left: 47,
    top: 556,
    fontSize: 18,
    alignItems: 'flex-end',
  },
  button: {
    position: 'absolute',
    height: 40,
    width: 120,
    left: 136,
    top: 650,
    borderRadius: 2,
    backgroundColor: '#AAAAAA',
  },
});

export default SummaryPage;
