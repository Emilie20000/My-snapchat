import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const LoadingIndicator = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="blue" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingIndicator;

