// app/layout.tsx or RootLayout.js
import React from 'react';
import { Tabs } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ImageBackground, StyleSheet } from 'react-native';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const inactiveColor = 'white';
  const activeColor = 'cyan';

  return (
    <ImageBackground 
      source={require('../assets/images/astro.jpg')}
      style={styles.background}
    >
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: activeColor,
          tabBarInactiveTintColor: inactiveColor,
          headerShown: false,
          tabBarStyle: { 
            backgroundColor: 'rgba(255, 255, 255, 0)',
            height: 100,
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

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});
