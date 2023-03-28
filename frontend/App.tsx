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
import { publicPages, navigatorPages, pages } from './pages';

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
            iconName = focused ? 'ios-navigate' : 'ios-navigate-outline';
          } else if (route.name === 'ReportsPage') {
            iconName = focused ? 'ios-document' : 'ios-document-outline';
          } else if (route.name === 'SummaryPage') {
            iconName = focused
              ? 'ios-checkmark-circle'
              : 'ios-checkmark-circle-outline';
          } else if (route.name === 'RTTrackPage') {
            iconName = focused ? 'ios-search' : 'ios-search-outline';
          }

          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6536F9',
        tabBarInactiveTintColor: '#9FA5C0',
      })}
    >
      {navigatorPages.map(({ page, name }) => (
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
        <>
          <Stack.Screen name="HomePage" component={PrivateTabs} />
          {pages.map(({ page, name }) => (
            <Stack.Screen key={name} name={name} component={page} />
          ))}
        </>
      ) : (
        publicPages.map(({ page, name }) => (
          <Stack.Screen key={name} name={name} component={page} />
        ))
      )}
    </Stack.Navigator>
  );
};

const App = () => (
  <GestureHandlerRootView style={{ flex: 1 }}>
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <AuthProvider>
          <Navigator />
        </AuthProvider>
      </NavigationContainer>
    </QueryClientProvider>
  </GestureHandlerRootView>
);

export default App;
