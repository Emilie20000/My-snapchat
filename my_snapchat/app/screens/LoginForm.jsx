import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../../components/Button';

const LoginForm = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
  
    try {
      const response = await fetch('https://snapchat.epidoc.eu/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtaWxpZS5sZS1sYW5AZXBpdGVjaC5ldSIsImlhdCI6MTcxNzc2MjA2N30.tEYIPyJeBIe91tSRS4nLWSnuzHhm1v3vn5Q3Kky2QpY',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
    
      if (!response.ok) {
        throw new Error('Erreur lors de la connexion');
      }

      const responseData = await response.json();

      const { _id, token, email: userEmail, username } = responseData.data;

      await AsyncStorage.setItem('userId', _id);
      await AsyncStorage.setItem('userToken', token);
      await AsyncStorage.setItem('userEmail', userEmail);
      await AsyncStorage.setItem('username', username);
      setIsAuthenticated(true); 
      navigation.replace('Home');
    } catch (error) {
      Alert.alert('Error', 'Connexion échouée. Veuillez réessayer');
      console.error('Error:', error);
    }
  };

  const handleBack = async () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
    <TouchableOpacity onPress={handleBack} style={styles.backButton}>
      <AntDesign name="doubleleft" size={24} color="grey" />
    </TouchableOpacity>
      <Image source={require('../../assets/images/snapchat.png')} style={styles.logo} />
      <Text style={styles.title}>Connexion</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Se connecter" onPress={handleLogin} />
    </View>
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
    fontSize: 30,
    marginBottom: 25,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
    borderRadius: 50,
    width: 300,
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
});

export default LoginForm;