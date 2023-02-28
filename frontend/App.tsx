import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Accelerometer, DeviceMotion } from 'expo-sensors';
import { Subscription } from 'expo-modules-core';
import io from 'socket.io-client';

const socket = io('http://127.0.0.1:5000');

export default function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [{ x, y, z }, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [acceleration, setSetAcceleration] = useState<{
    x: number;
    y: number;
    z: number;
  } | null>(null);
  const [{ alpha, beta, gamma }, setRotation] = useState({
    alpha: 0,
    beta: 0,
    gamma: 0,
  });
  const [subscription, setSubscription] = useState<Subscription | null>(null);

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
      socket.emit('my event', { data: "I'm connected!" });
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, []);

  const isDeviceMotionReady = async () => {
    try {
      const response = await DeviceMotion.requestPermissionsAsync();

      if (!response.granted) return;

      const isAvailable = await DeviceMotion.isAvailableAsync();

      if (!isAvailable) return;

      DeviceMotion.addListener(({ rotation, acceleration }) => {
        setRotation(rotation);
        setSetAcceleration(acceleration);
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    isDeviceMotionReady();

    return () => {
      DeviceMotion.removeAllListeners();
    };
  }, []);

  useEffect(() => {
    if (isConnected) {
      socket.on('message', (response) => {
        console.log(response);
      });
    }
  }, [isConnected]);

  const _slow = () => Accelerometer.setUpdateInterval(1000);
  const _fast = () => Accelerometer.setUpdateInterval(500);

  const _subscribe = () => {
    setSubscription(Accelerometer.addListener(setData));
  };

  const _unsubscribe = () => {
    if (subscription) {
      subscription.remove();
    }
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <Text
        style={styles.text}
        onPress={() => {
          socket.emit('message', { x, y, z });
        }}
      >
        Accelerometer: (in gs where 1g = 9.81 m/s^2)
      </Text>
      <Text style={styles.text}>x: {x}</Text>
      <Text style={styles.text}>y: {y}</Text>
      <Text style={styles.text}>z: {z}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={subscription ? _unsubscribe : _subscribe}
          style={styles.button}
        >
          <Text>{subscription ? 'On' : 'Off'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={_slow}
          style={[styles.button, styles.middleButton]}
        >
          <Text>Slow</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={_fast} style={styles.button}>
          <Text>Fast</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.text}>Rotation</Text>
      <Text style={styles.text}>roll: {gamma}</Text>
      <Text style={styles.text}>pitch: {beta}</Text>
      <Text style={styles.text}>azimouth: {alpha}</Text>
      <Text style={styles.text}>Acceleration without gravity</Text>
      <Text style={styles.text}>x: {acceleration?.x}</Text>
      <Text style={styles.text}>y: {acceleration?.y}</Text>
      <Text style={styles.text}>z: {acceleration?.z}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  text: {
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 15,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 10,
  },
  middleButton: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
});
