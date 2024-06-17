import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Button = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4cc9f0',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    width: 150,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default Button;
