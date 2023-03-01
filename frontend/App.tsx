import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Text } from 'react-native';
import { pages } from './pages';
import MapPage from './pages/MapPage';
import IMUPage from './pages/IMUPage';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const Navigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    {pages.map(({ page, name }) => (
      <Stack.Screen key={name} name={name} component={page} />
    ))}
  </Stack.Navigator>
);

const App = () => (
  <NavigationContainer>
    <Navigator />
  </NavigationContainer>
);

export default App;
