import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from '../../components/Button';

const AppScreen = () => {

  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const handleRegister = () => {
    navigation.navigate('Register');
 
  };

  return (
    <View style={styles.container}>
       <Image source={require('../../assets/images/snapchat-logo.png')} style={styles.logo} />
       <View style={styles.buttonContainer}>
        <Button title="Se connecter" onPress={handleLogin} />
        <Button title="S'inscrire" onPress={handleRegister} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF59D',
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  buttonContainer: {
    marginTop: 30,
  }
});

export default AppScreen;
