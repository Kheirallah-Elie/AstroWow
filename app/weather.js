import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import WeatherForecast from '../components/WeatherForecast';

export default function TabTwoScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <WeatherForecast />
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
