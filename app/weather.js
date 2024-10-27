import React from 'react';
import { View, StyleSheet } from 'react-native';
import WeatherForecast from '../components/WeatherForecast';

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <WeatherForecast />
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
