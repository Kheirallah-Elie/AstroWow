import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import ImageUpload from '../components/ImageUpload';

export default function TabTwoScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ImageUpload />
    </SafeAreaView>
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
