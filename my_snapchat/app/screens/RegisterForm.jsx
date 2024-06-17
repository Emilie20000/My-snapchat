import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Button from '../../components/Button';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  // Enregistrement des données utilisateur dans l'API
  const handleRegister = async () => {

    try {
      const response = await fetch('https://snapchat.epidoc.eu/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtaWxpZS5sZS1sYW5AZXBpdGVjaC5ldSIsImlhdCI6MTcxNzc2MjA2N30.tEYIPyJeBIe91tSRS4nLWSnuzHhm1v3vn5Q3Kky2QpY',
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
        
      });
   
      if (!response.ok) {
        throw new Error('Erreur lors de l\'inscription');
      }
      
      const data = await response.json();
     
      Alert.alert('Success', 'Inscription réussie');
    
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Error', 'Une erreur s\'est produite lors de l\'inscription. Veuillez réessayer');
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
      <Text style={styles.title}>Inscription</Text>
      <TextInput
        style={styles.input}
        placeholder="Nom"
        value={username}
        onChangeText={setUsername}
      />
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
      <Button title="S'inscrire" onPress={handleRegister} />
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

export default RegisterForm;