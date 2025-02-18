import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ClientHomePage from './screens/ClientHomePage';
import AdminHomePage from './screens/AdminHomePage';
import ProjectPage from './screens/ProjectPage';
import LoginScreen from './screens/LoginScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
         <Stack.Screen name="ClientHome" component={ClientHomePage} />
        <Stack.Screen name="AdminHome" component={AdminHomePage} />
        <Stack.Screen name="ProjectPages" component={ProjectPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}