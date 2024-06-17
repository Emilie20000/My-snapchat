import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import SnapFromUser from './SnapFromUser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Snap from './Snap';

const SnapList = () => {
  const [snaps, setSnaps] = useState([]);
  const [accessToken, setAccessToken] = useState(null);
  const [selectedSnap, setSelectedSnap] = useState(null);
  const [newSnapCount, setNewSnapCount] = useState(0);

  // Récupération des snap non lus
  useEffect(() => {
    const fetchSnaps = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        setAccessToken(token);

        const response = await fetch('https://snapchat.epidoc.eu/snap', {
          method: 'GET',
          headers: {
            'x-api-key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtaWxpZS5sZS1sYW5AZXBpdGVjaC5ldSIsImlhdCI6MTcxNzc2MjA2N30.tEYIPyJeBIe91tSRS4nLWSnuzHhm1v3vn5Q3Kky2QpY',
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();

        if (data.data.length > snaps.length) {
       
          setNewSnapCount(data.data.length - snaps.length);
        } else {
          setNewSnapCount(0);
        }

        setSnaps(data.data.reverse());
      } catch (error) {
        console.error('Erreur lors de la récupération des snap:', error);
      }
    };

    fetchSnaps();
    const interval = setInterval(() => {
      fetchSnaps();
    },1000);

    return () => clearInterval(interval);
  }, []);

  const handleSnapClick = (snap) => {
    setSelectedSnap(snap._id);
    setNewSnapCount(0);

  };

  const handleCloseSnap = () => {
    setSelectedSnap(null);
  };
 
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {newSnapCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{newSnapCount} nouveaux snaps</Text>
          </View>
        )}
      </View>
      <FlatList
        data={snaps}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSnapClick(item)}>
            <View style={styles.snapContainer}>
              <SnapFromUser userId={item.from} />
              <Text>Date : {new Date(item.date).toLocaleString()}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item._id}
      />
      {selectedSnap && (
        <View style={styles.selectedSnapContainer}>
          <Snap snapId={selectedSnap} onClose={handleCloseSnap} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  snapContainer: {
    flex: 1,
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    width: '100%',
  },
  selectedSnapContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    width: '100%',
  },
  
});

export default SnapList;
