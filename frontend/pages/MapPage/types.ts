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
