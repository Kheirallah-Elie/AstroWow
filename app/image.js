// app/screens/TabTwoScreen.js
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import ImageGallery from '../components/ImageGallery';

const Stack = createStackNavigator(); // Create Stack Navigator

export default function TabTwoScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ImageGallery />
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
