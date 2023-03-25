import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import IMUPage from './pages/IMUPage';
import MapPage from './pages/MapPage';
import ReportsPage from './pages/ReportsPage';
import SummaryPage from './pages/SummaryPage';
import RTTrackPage from './pages/RTTrackPage';
import CreateCarProfilePage from './pages/CreateCarProfilePage';
import DetailReportPage from './pages/DetailReportPage';

export const publicPages = [
  {
    page: LoginPage,
    name: 'LoginPage',
  },
  {
    page: RegisterPage,
    name: 'RegisterPage',
  },
] as const;

export const navigatorPages = [
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
] as const;

export const pages = [
  {
    page: SummaryPage,
    name: 'SummaryPage',
  },
  {
    page: CreateCarProfilePage,
    name: 'CreateCarProfilePage',
  },
  {
    page: DetailReportPage,
    name: 'DetailReportPage',
  },
  {
    page: RTTrackPage,
    name: 'RTTrackPage',
  },
];

export type ParamList = {
  IMUPage: undefined;
  MapPage: undefined;
};
