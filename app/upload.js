import React from 'react';
import { View, StyleSheet } from 'react-native';
import ImageUpload from '../components/ImageUpload';

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <ImageUpload />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
