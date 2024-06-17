import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SplashScreen from './screens/SplashScreen';
import AppScreen from './screens/AppScreen';
import RegisterForm from './screens/RegisterForm';
import LoginForm from './screens/LoginForm';
import HomeScreen from './screens/HomeScreen';
import Users from './screens/UsersList';
import ProfileScreen from './screens/ProfileScreen';
import Logout from './screens/Logout';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = await AsyncStorage.getItem('userToken');

      if (token) {
        setIsAuthenticated(true);
      }
      
    };

    checkAuthentication();
  }, []);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <>
          {/* Routes utilisateur connecté */}
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Users" component={Users} />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
          <Stack.Screen name="Logout">
            {props => <Logout {...props} setIsAuthenticated={setIsAuthenticated} />}
          </Stack.Screen>
        </>
      ) : (
        <>
          {/* Routes utilisateur non connecté */}
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="AppScreen" component={AppScreen} />
          <Stack.Screen name="Register" component={RegisterForm} />
          <Stack.Screen name="Login">
            {props => <LoginForm {...props} setIsAuthenticated={setIsAuthenticated} />}
          </Stack.Screen>
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
