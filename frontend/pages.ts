import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import IMUPage from './pages/IMUPage';
import MapPage from './pages/MapPage';

export const pages = [
  {
    page: LoginPage,
    name: 'LoginPage',
  },
  {
    page: RegisterPage,
    name: 'RegisterPage',
  },
] as const;

export const privatePages = [
  {
    page: HomePage,
    name: 'HomePage',
  },
  {
    page: MapPage,
    name: 'MapPage',
  },
  {
    page: IMUPage,
    name: 'IMUPage',
  },
] as const;

export type ParamList = {
  IMUPage: undefined;
  MapPage: undefined;
};
