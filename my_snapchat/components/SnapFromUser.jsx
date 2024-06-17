import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SnapFromUser = ({ userId }) => {
  const [userData, setUserData] = useState(null);

  // Récupération de l'utilisateur ayant envoyé le snap
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const response = await fetch(`https://snapchat.epidoc.eu/user/${userId}`, {
          method: 'GET',
          headers: {
            'x-api-key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtaWxpZS5sZS1sYW5AZXBpdGVjaC5ldSIsImlhdCI6MTcxNzc2MjA2N30.tEYIPyJeBIe91tSRS4nLWSnuzHhm1v3vn5Q3Kky2QpY',
            'Authorization': `Bearer ${token}`,
          },
        });
        const userData = await response.json();
        setUserData(userData.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  if (!userData) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <Text style={styles.usernameText}>{userData.username}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
   
    usernameText: {
      fontWeight: 'bold',
      fontSize: 16,
    },
  });

export default SnapFromUser;
