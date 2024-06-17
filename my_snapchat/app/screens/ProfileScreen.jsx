import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from '../../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({ setIsAuthenticated }) => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const userUsername = await AsyncStorage.getItem('username');
        const userEmail = await AsyncStorage.getItem('userEmail');
        setUsername(userUsername);
        setEmail(userEmail);
      } catch (error) {
        console.error('Erreur lors du chargement des données utilisateur:', error);
      }
    };

    getUserInfo();
  }, []);

  const handleLogout = () => {
    navigation.navigate('Logout', { setIsAuthenticated });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.username}>{username}</Text>
      <Text style={styles.email}>{email}</Text>
      <Button title="Déconnexion" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  email: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4cc9f0',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
});

export default ProfileScreen;
