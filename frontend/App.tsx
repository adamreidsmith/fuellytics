/* eslint-disable react/no-unstable-nested-components */
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Font from 'expo-font';
import { useEffect, useState } from 'react';
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

          return <Ionicons name={iconName} size={size} color={color} />;
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

const Navigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="HomePage" component={PrivateTabs} />
    {/* {pages.map(({ page, name }) => (
      <Stack.Screen key={name} name={name} component={page} />
    ))} */}
  </Stack.Navigator>
);

const App = () => (
  <GestureHandlerRootView style={{ flex: 1 }}>
    <NavigationContainer>
      <Navigator />
    </NavigationContainer>
  </GestureHandlerRootView>
);

export default App;
