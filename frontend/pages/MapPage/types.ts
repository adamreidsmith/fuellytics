// export type MetricType =
//   | 'fuelConsumption'
//   | 'co2Emissions'
//   | 'n2oEmissions'
//   | 'ch4Emissions';

export type MetricType = 'fuelConsumption' | 'co2Emissions' | 'velocty';

export type MetricOption = {
  label: string;
  value: MetricType;
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
