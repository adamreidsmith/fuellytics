import IMUPage from './pages/IMUPage';
import MapPage from './pages/MapPage';

export const pages = [
  {
    page: MapPage,
    name: 'MapPage',
  },
  {
    page: IMUPage,
    name: 'IMUPage',
  },
] as const;

export const privatePages = [] as const;

export type ParamList = {
  IMUPage: undefined;
  MapPage: undefined;
};
