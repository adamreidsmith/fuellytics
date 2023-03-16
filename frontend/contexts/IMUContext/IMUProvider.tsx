import React, {
  PropsWithChildren,
  FC,
  useMemo,
  useEffect,
  useState,
} from 'react';
import { Accelerometer, DeviceMotion } from 'expo-sensors';
import { Subscription } from 'expo-sensors/build/Pedometer';
import { IMUContext } from './IMUContext';
import { IMUContextType } from './types';

export const IMUProvider: FC<PropsWithChildren> = ({ children }) => {
  const [acceletometerWithGravity, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [accelerometer, setSetAcceleration] = useState<{
    x: number;
    y: number;
    z: number;
  } | null>(null);
  const [gyroscope, setRotation] = useState({
    alpha: 0,
    beta: 0,
    gamma: 0,
  });
  const [subscription, setSubscription] = useState<Subscription | null>(null);

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

  const _subscribe = () => {
    Accelerometer.setUpdateInterval(750);
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

  const value: IMUContextType = useMemo(
    () => ({
      accelerometer,
      gyroscope,
      acceletometerWithGravity,
    }),
    [accelerometer, acceletometerWithGravity, gyroscope],
  );

  return <IMUContext.Provider value={value}>{children}</IMUContext.Provider>;
};
