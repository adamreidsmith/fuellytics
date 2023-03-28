export type IMUContextType = {
  accelerometerWithoutGravity: {
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
  setEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  enabled: boolean;
};
