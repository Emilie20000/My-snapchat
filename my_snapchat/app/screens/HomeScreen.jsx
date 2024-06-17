import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import CameraScreen from './CameraScreen';
import ProfileScreen from './ProfileScreen';
import MessagerieScreen from './MessagerieScreen';

const Tab = createBottomTabNavigator();

const HomeScreen = () => {

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          
          let iconName;
          if (route.name === 'Camera') {
            iconName = focused ? 'camera' : 'camera-outline';
          } else if (route.name === 'Profil') {
            iconName = focused ? 'person-circle' : 'person-circle-outline';
          } else if (route.name === 'Messagerie') {
            iconName = focused ? 'chatbubble' : 'chatbubble-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'blue',
        inactiveTintColor: 'gray',
      }}>
    
      <Tab.Screen name="Profil" component={ProfileScreen} />
      <Tab.Screen name="Camera" component={CameraScreen} />
      <Tab.Screen name="Messagerie" component={MessagerieScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFF59D',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});


export default HomeScreen;
