import React from 'react';
import { Tabs } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ImageBackground, StyleSheet } from 'react-native';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  // Define your colors
  const inactiveColor = 'white'; // Striking white color for inactive state
  const activeColor = 'cyan'; // Striking yellow color for active state

  return (
    <ImageBackground 
      source={require('../assets/images/astro.jpg')} // Path to your background image
      style={styles.background} // Apply styles
    >
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: activeColor, // Set active tint color
          tabBarInactiveTintColor: inactiveColor, // Set inactive tint color
          headerShown: false,
          tabBarStyle: { 
            backgroundColor: 'rgba(255, 255, 255, 0)', // Set a semi-transparent background for the tab bar
            height: 100, // Set the desired height for the tab bar
          },
        }}>
        
        {/* User Profile Tab */}
        <Tabs.Screen
          name="index"
          options={{
            title: 'User',
            tabBarIcon: ({ color }) => (
              <AntDesign name="user" size={24} color={color} />
            ),
          }}
        />

        {/* Images Tab */}
        <Tabs.Screen
          name="images"
          options={{
            title: 'Images',
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="images" size={24} color={color} />
            ),
          }}
        />

        {/* Weather Tab */}
        <Tabs.Screen
          name="weather"
          options={{
            title: 'Weather',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="weather-cloudy" size={24} color={color} />
            ),
          }}
        />
      </Tabs>
    </ImageBackground>
  );
}

// Styles for the background
const styles = StyleSheet.create({
  background: {
    flex: 1, // Ensure it takes up the whole screen
    resizeMode: 'cover', // Cover the entire screen
    justifyContent: 'center', // Center children
  },
});
