import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../../components/Button';
import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';
import DurationModal from '../../components/DurationModal';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native';

const Users = ({ route }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        setAccessToken(token);

        const response = await fetch('https://snapchat.epidoc.eu/user', {
          method: 'GET',
          headers: {
            'x-api-key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtaWxpZS5sZS1sYW5AZXBpdGVjaC5ldSIsImlhdCI6MTcxNzc2MjA2N30.tEYIPyJeBIe91tSRS4nLWSnuzHhm1v3vn5Q3Kky2QpY',
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = await response.json();
        
        setUsers(data.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
        Alert.alert('Erreur', 'Erreur lors de la récupération des utilisateurs');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const sendSnap = async (userId, duration) => {
    try {
      // Resize l'image
      const { selectedImage } = route.params;
      const resizedImage = await ImageManipulator.manipulateAsync(
        selectedImage,
        [{ resize: { width: 200, height: 200 } }],
        { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
      );
      // Converti l'image en base 64
      const base64Image = await FileSystem.readAsStringAsync(resizedImage.uri, { encoding: FileSystem.EncodingType.Base64 });

      const response = await fetch('https://snapchat.epidoc.eu/snap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtaWxpZS5sZS1sYW5AZXBpdGVjaC5ldSIsImlhdCI6MTcxNzc2MjA2N30.tEYIPyJeBIe91tSRS4nLWSnuzHhm1v3vn5Q3Kky2QpY',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          to: userId,
          image: `data:image/jpeg;base64,${base64Image}`,
          duration: duration,
        }),
      });

      const data = await response.json();
      console.log(data);
      navigation.replace('Home');
    } catch (error) {
      console.error('Erreur lors de l\'envoi du snap : ', error);
      Alert.alert('Erreur', 'Une erreur s\'est produite lors de l\'envoi du snap. Veuillez réessayer.');
    }
  };

  const handleSendSnap = (userId) => {
    setSelectedUser(userId);
    setModalVisible(true);
  };

  const handleModalConfirm = (duration) => {
    setModalVisible(false);
    sendSnap(selectedUser, duration);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <TouchableOpacity style={styles.CloseButton} onPress={() => navigation.goBack()}>
          <Ionicons name="close-circle" size={24} color="grey" />
      </TouchableOpacity>
      <DurationModal
        visible={modalVisible}
        onConfirm={handleModalConfirm}
        onCancel={handleModalCancel}
      />
      {users.map(user => (
        <View key={user._id} style={styles.userItem}>
        {user.profilePicture ? (
          <Image
          source={{ uri: user.profilePicture }}
          style={[styles.profileImage, { width: 50, height: 50 }]}
          />
        ) : (
          <Image
            source={require('../../assets//images/profile.png')}
            style={[styles.profileImage, { width: 50, height: 50 }]}
          />
        )}
        <Text style={styles.userText}>{user.username}</Text>
        <Button
          title="Envoyer"
          onPress={() => handleSendSnap(user._id)}
        />
      </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 1,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  userText: {
    fontSize: 18,
    flex: 1,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Users;