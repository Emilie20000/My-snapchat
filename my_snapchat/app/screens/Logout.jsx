import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Logout = ({ setIsAuthenticated }) => {
  const navigation = useNavigation();

  useEffect(() => {
    const logout = async () => {
      try {
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('userId');
        await AsyncStorage.removeItem('userEmail');
        await AsyncStorage.removeItem('username');
        setIsAuthenticated(false);
        navigation.replace('AppScreen');
      } catch (error) {
        console.error('Error:', error);
      }
    };

    logout();
  }, []);

};

export default Logout;
