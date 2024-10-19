// app/screens/TabTwoScreen.js
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import ImageGallery from '../components/ImageGallery';
import ImageUpload from '../components/ImageUpload'; // Ensure this component exists

const Stack = createStackNavigator(); // Create Stack Navigator

export default function TabTwoScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Navigator initialRouteName="ImageGallery">
        <Stack.Screen name="ImageGallery" component={ImageGallery} />
        <Stack.Screen name="ImageUpload" component={ImageUpload} />
      </Stack.Navigator>
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
