import React, {
  PropsWithChildren,
  FC,
  useMemo,
  useEffect,
  useState,
} from 'react';
import { Accelerometer, DeviceMotion } from 'expo-sensors';
import { Subscription } from 'expo-sensors/build/Pedometer';
import { frequency } from '../contants';
import { IMUContext } from './IMUContext';
import { IMUContextType } from './types';

export const IMUProvider: FC<PropsWithChildren> = ({ children }) => {
  const [enabled, setEnabled] = useState(false);
  const [acceletometerWithGravity, setAccelerationWithGravity] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [accelerometerWithoutGravity, setAccelerationWithoutGravity] =
    useState<{
      x: number;
      y: number;
      z: number;
    }>({
      x: 0,
      y: 0,
      z: 0,
    });
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

      DeviceMotion.setUpdateInterval(frequency);
      DeviceMotion.addListener(({ rotation, acceleration }) => {
        setRotation(rotation);
        if (acceleration) {
          setAccelerationWithoutGravity(acceleration);
        }
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  useEffect(() => {
    if (enabled) {
      isDeviceMotionReady();

      return () => {
        DeviceMotion.removeAllListeners();
      };
    }
    return () => {};
  }, [enabled]);

  const _subscribe = () => {
    Accelerometer.setUpdateInterval(frequency);
    setSubscription(Accelerometer.addListener(setAccelerationWithGravity));
  };

  const _unsubscribe = () => {
    if (subscription) {
      subscription.remove();
    }
    setSubscription(null);
  };

  useEffect(() => {
    if (enabled) {
      _subscribe();

      return () => _unsubscribe();
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);

  const value: IMUContextType = useMemo(
    () => ({
      accelerometerWithoutGravity,
      gyroscope,
      acceletometerWithGravity,
      setEnabled,
      enabled,
    }),
    [accelerometerWithoutGravity, acceletometerWithGravity, enabled, gyroscope],
  );

  return <IMUContext.Provider value={value}>{children}</IMUContext.Provider>;
};
