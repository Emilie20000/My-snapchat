import React, { useState, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CameraView, useCameraPermissions, Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function App() {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [selectedImage, setSelectedImage] = useState(null);
  // R éférence de la caméra
  const cameraRef = useRef(null);
  const navigation = useNavigation();

  //  Autorisation d'accès à la caméra
  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>Autorisez-vous l'application a avoir accès à votre caméra</Text>
        <Button onPress={requestPermission} title="Autoriser" />
      </View>
    );
  }

  // Changer le sens de la caméra
  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  // Prendre une photo avec la caméra
  const takePhoto = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        setSelectedImage(photo.uri);
      } catch (error) {
        console.error('Erreur lors de la prise de la photo :', error);
      }
    }
  };

  // Choisir une photo depuis la gallerie
  const pickImageFromGallery = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
      });

      if (!result.cancelled && result.assets.length > 0) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'image dans la gallerie:', error);
    }
  };

  const removeSelectedImage = () => {
    setSelectedImage(null);
  };

  const handleSendImage = () => {
    navigation.navigate('Users', { selectedImage });
  };

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
          <Ionicons name="camera-reverse" size={40} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={takePhoto}>
          <MaterialIcons name="add-a-photo" size={40} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={pickImageFromGallery}>
          <Ionicons name="images" size={40} color="white" />
          </TouchableOpacity>
        </View>
      </CameraView>
      {selectedImage && (
        <View style={styles.imagePreview}>
          <Image source={{ uri: selectedImage }} style={styles.image} />
          <TouchableOpacity style={styles.closeButton} onPress={removeSelectedImage}>
            <Ionicons name="close-circle" size={32} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.sendButton} onPress={handleSendImage}>
            <Text style={styles.text}>Envoyer</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    width: '100%'
  },
  button: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
  image: {
    flex: 1,
    alignSelf: 'stretch',
    marginTop: 20,
  },
  imagePreview: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
  sendButton: {
    position: 'absolute',
    bottom: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
});
