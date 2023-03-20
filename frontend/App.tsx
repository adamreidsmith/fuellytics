/* eslint-disable react/no-unstable-nested-components */
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';
import { QueryClientProvider } from 'react-query';
import queryClient from 'services/queryClient';
import { AuthProvider } from 'context/AuthContext/AuthProvider';
import { useAuthContext } from 'context/AuthContext';
import { pages, privatePages } from './pages';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function PrivateTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarIcon: ({ focused, color, size }) => {
          let iconName = '';

          if (route.name === 'HomePage') {
            iconName = focused ? 'ios-home' : 'ios-home-outline';
          } else if (route.name === 'MapPage') {
            iconName = focused ? 'ios-search' : 'ios-search-outline';
          } else if (route.name === 'IMUPage') {
            iconName = focused ? 'ios-basket' : 'ios-basket-outline';
          }

          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6536F9',
        tabBarInactiveTintColor: '#9FA5C0',
      })}
    >
      {privatePages.map(({ page, name }) => (
        <Tab.Screen key={name} name={name} component={page} />
      ))}
    </Tab.Navigator>
  );
}

const Navigator = () => {
  const { user, status } = useAuthContext();

  if (status === 'loading') return null;

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {user ? (
        <Stack.Screen name="HomePage" component={PrivateTabs} />
      ) : (
        pages.map(({ page, name }) => (
          <Stack.Screen key={name} name={name} component={page} />
        ))
      )}
    </Stack.Navigator>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <AuthProvider>
          <Navigator />
        </AuthProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  </QueryClientProvider>
);

export default App;
