import React, { useState } from 'react';
import { Modal, View, TextInput, Button, StyleSheet, Alert } from 'react-native';

const DurationModal = ({ visible, onConfirm, onCancel }) => {

    const [duration, setDuration] = useState('');

    const handleConfirm = () => {
        if (parseInt(duration) > 0 && parseInt(duration) <= 10) {
            onConfirm(parseInt(duration));
            setDuration('');
        } else {
            Alert.alert('Durée invalide, Veuillez rentrez une durée entre 1 et 10');
        }
    }

    return (
        <Modal visible={visible} transparent={true} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TextInput
                style={styles.input}
                placeholder="Entrez une durée entre 1 et 10 secondes"
                keyboardType="numeric"
                value={duration}
                onChangeText={setDuration}
              />
              <View style={styles.buttonContainer}>
                <Button title="Confirm" onPress={handleConfirm} />
                <Button title="Cancel" onPress={onCancel} />
              </View>
            </View>
          </View>
        </Modal>
      );
    };
    
    const styles = StyleSheet.create({
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
      },
      modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: 300,
      },
      input: {
        borderBottomWidth: 1,
        marginBottom: 20,
        padding: 5,
        fontSize: 16,
      },
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
    });
    
    export default DurationModal;

