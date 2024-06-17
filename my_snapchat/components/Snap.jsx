import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Snap = ({ snapId, onClose }) => {
  const [snapDetails, setSnapDetails] = useState(null);
  const [remainingTime, setRemainingTime] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  
    
  useEffect(() => {
    fetchSnapById(snapId);
  }, [snapId]);

  useEffect(() => {
    if (snapDetails) {
      const timer = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime === 0) {
            handleSnapSeen(snapId);
            clearInterval(timer);
            onClose();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [snapDetails]);

  const fetchSnapById = async (id) => {
    try {

        const token = await AsyncStorage.getItem('userToken');
        setAccessToken(token);
      const response = await fetch(`https://snapchat.epidoc.eu/snap/${id}`, {
        method: 'GET',
          headers: {
            'x-api-key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtaWxpZS5sZS1sYW5AZXBpdGVjaC5ldSIsImlhdCI6MTcxNzc2MjA2N30.tEYIPyJeBIe91tSRS4nLWSnuzHhm1v3vn5Q3Kky2QpY',
            'Authorization': `Bearer ${token}`,
          },
      });
      const data = await response.json();
      setSnapDetails(data.data);
      setRemainingTime(data.data.duration);
    } catch (error) {
      console.error('Erreur lors de la récupération du snap:', error);
    }
  };

  const handleSnapSeen = async (id) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      await fetch(`https://snapchat.epidoc.eu/snap/seen/${id}`, {
        method: 'PUT',
        headers: {
          'x-api-key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtaWxpZS5sZS1sYW5AZXBpdGVjaC5ldSIsImlhdCI6MTcxNzc2MjA2N30.tEYIPyJeBIe91tSRS4nLWSnuzHhm1v3vn5Q3Kky2QpY',
            'Authorization': `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error('Erreur lors de l\'envoie du snap:', error);
    }
  };

  return (
    <View style={styles.container}>
      {snapDetails && (
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: snapDetails.image }}
            style={styles.image}
          />
          <View style={styles.timerOverlay}>
            <Text style={styles.timerText}>{remainingTime} </Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      imageContainer: {
        flex: 1,
        minWidth: '100%',
      },
      image: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
      },
      timerOverlay: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
      },
      timerText: {
        color: 'white',
        fontSize: 16,
      },
  });

export default Snap;
