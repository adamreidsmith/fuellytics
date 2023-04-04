// export type MetricType =
//   | 'fuelConsumption'
//   | 'co2Emissions'
//   | 'n2oEmissions'
//   | 'ch4Emissions';

export type MetricType = 'fuel' | 'co2' | 'speed';

export type MetricOption = {
  label: string;
  value: MetricType;
  units: string;
};

export type FormattedCarProfile = {
  title: string;
  id: string;
  imageUrl: string | null;
  car: {
    id: number;
    make: string;
    model: string;
    displacement: number;
    year: number;
    isSupercharged: boolean;
    drag: number;
    imageUrl: string | null;
  };
};

export type GraphsData = {
  fuel: number[];
  speed: number[];
  co2: number[];
  co: number[];
  nox: number[];
  unburnedHydrocarbons: number[];
  particulate: number[];
};
