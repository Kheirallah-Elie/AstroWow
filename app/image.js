// app/screens/TabTwoScreen.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import ImageGallery from '../components/ImageGallery';

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <ImageGallery />
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
