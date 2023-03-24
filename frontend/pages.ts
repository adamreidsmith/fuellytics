import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import IMUPage from './pages/IMUPage';
import MapPage from './pages/MapPage';
import ReportsPage from './pages/ReportsPage';
import SummaryPage from './pages/SummaryPage';
import RTTrackPage from './pages/RTTrackPage';
import CarProfilePage from './pages/CarProfilePage';
import DetailReportPage from './pages/DetailReportPage';

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
  // {
  //   page: IMUPage,
  //   name: 'IMUPage',
  // },
  {
    page: ReportsPage,
    name: 'ReportsPage',
  },
  // {
  //   page: SummaryPage,
  //   name: 'SummaryPage',
  // },
  {
    page: RTTrackPage,
    name: 'RTTrackPage',
  },
  {
    page: CarProfilePage,
    name: 'CarProfilePage',
  },
  {
    page: DetailReportPage,
    name: 'DetailReportPage',
  },
] as const;

export type ParamList = {
  IMUPage: undefined;
  MapPage: undefined;
};
