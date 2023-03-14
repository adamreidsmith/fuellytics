import LoginPage from 'pages/LoginPage';
import RegisterPage from 'pages/RegisterPage';
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
  {
    page: LoginPage,
    name: 'LoginPage',
  },
  {
    page: RegisterPage,
    name: 'RegisterPage',
  },
] as const;

export const privatePages = [] as const;

export type ParamList = {
  IMUPage: undefined;
  MapPage: undefined;
};
