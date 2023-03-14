export type IMUContextType = {
  accelerometer: {
    x: number;
    y: number;
    z: number;
  } | null;
  gyroscope: {
    alpha: number;
    beta: number;
    gamma: number;
  };
  acceletometerWithGravity: {
    x: number;
    y: number;
    z: number;
  };
};
