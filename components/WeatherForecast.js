import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TextInput, Button, ImageBackground } from 'react-native';
import moment from 'moment';

const OPENWEATHER_API_KEY = '05b3febf43626403000b9d3d905c6164';

export default function WeatherForecast() {
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState(''); // Default city
  const [error, setError] = useState('');

  // Fetch weather forecast for a specific city
  const fetchWeatherForecast = async (cityName) => {
    setLoading(true);
    setError(''); // Reset error message
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${OPENWEATHER_API_KEY}`);
      const data = await response.json();
      if (data.cod !== '200') {
        throw new Error(data.message); // Handle error if city not found
      }
      const dailyForecast = groupForecastByDay(data.list);
      setForecastData(dailyForecast);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Group forecast data by day
  const groupForecastByDay = (list) => {
    const days = {};
    list.forEach(item => {
      const date = moment(item.dt_txt).format('YYYY-MM-DD');
      if (!days[date]) {
        days[date] = [];
      }
      days[date].push(item);
    });

    return Object.keys(days).map(date => ({
      date,
      data: days[date]
    }));
  };

  // Render each day's forecast
  const renderItem = ({ item }) => {
    const day = moment(item.date).format('dddd, MMMM D');
    const dayForecast = item.data.map((forecast, index) => {
      let textColor;

      // Determine text color based on weather description
      const description = forecast.weather[0].description.toLowerCase();
      if (description.includes('clear')) {
        textColor = 'green'; // Clear conditions in green
      } else if (description.includes('clouds')) {
        textColor = 'blue'; // Cloud conditions in blue
      } else if (description.includes('rain') || description.includes('thunder')) {
        textColor = 'red'; // Rain or thunder conditions in red
      } else {
        textColor = 'black'; // Default color for other conditions
      }

      return (
        <View key={index} style={styles.forecastItem}>
          <Text style={{ color: textColor }}>
            {moment(forecast.dt_txt).format('HH:mm')} - {description}
          </Text>
          <Text style={{ color: textColor }}>{forecast.main.temp}°C</Text>
        </View>
      );
    });

    return (
      <View style={styles.dayContainer}>
        <Text style={styles.dayTitle}>{day}</Text>
        {dayForecast}
      </View>
    );
  };

  // Loading indicator
  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.overlay}>
    <TextInput
        style={styles.input}
        placeholder="Choose your city"
        value={city}
        onChangeText={setCity}
    />
    <Button title="OK" textColor="white" onPress={() => fetchWeatherForecast(city)} />
    {error ? <Text style={styles.errorText}>{error}</Text> : null}
    <FlatList
        data={forecastData}
        renderItem={renderItem}
        keyExtractor={(item) => item.date}
    />
    </View>
  );
}

const styles = StyleSheet.create({
    backgroundImage: {
      flex: 1,
      resizeMode: 'cover',   // Ensures the image covers the full screen
      width: '100%',         // Full width of the screen
      height: '100%',        // Full height of the screen
      position: 'absolute',
    },
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(255, 255, 255, 0.2)', 
      blurradius: 0.5, // Semi-transparent overlay
      padding: 20,
      width: '100%',         // Make sure overlay takes full width
      height: '100%',        // Full height to match the background
    },
    input: {
      borderColor: '#ccc',
      borderWidth: 1,
      padding: 10,
      marginBottom: 10,
      width: '100%',         // Ensure the input spans the entire width
      backgroundColor: 'white', // Set the background color to white
    },
    dayContainer: {
      padding: 10,
      marginVertical: 10,
      backgroundColor: '#f0f0f0',
      borderRadius: 8,
      opacity: 0.9,
      width: '100%',         // Full width for the day container
    },
    dayTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    forecastItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 3,
    },
    loader: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    errorText: {
      color: 'red',
      textAlign: 'center',
      marginVertical: 10,
    },
  });
  
