import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import SnapsList from '../../components/SnapsList';
import Snap from '../../components/Snap';

const MessagerieScreen = () => {
  const [selectedSnapId, setSelectedSnapId] = useState(null);

  const handleSnapSelect = (snapId) => {
    setSelectedSnapId(snapId);
  };

  return (
    <View style={styles.container}>
      {selectedSnapId ? (
        <Snap snapId={selectedSnapId} />
      ) : (
        <SnapsList onSelectSnap={handleSnapSelect} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default MessagerieScreen;
