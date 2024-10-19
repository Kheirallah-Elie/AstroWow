import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import * as Location from 'expo-location'; // Import Location from expo-location
import moment from 'moment';
import styles from './LayoutStyle';

// Using OpenWeatherAPI to fetch weather date
const OPENWEATHER_API_KEY = '05b3febf43626403000b9d3d905c6164';
// Using another Geoname API to fetch city names for filtering (not ideal, some cities won't be found in OpenWeatherAPI)
// It's either that, either risking exceeding the limit request of OpenWeather, either hard coding the cities here or caching them
// This is the best approach while using free API's
const GEONAMES_USERNAME = 'eliekhopter';

export default function WeatherForecast() {
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState('');
  const [error, setError] = useState('');
  const [filteredCities, setFilteredCities] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(null); // Track highlighted index

  const fetchWeatherForecast = async (cityName) => {
    setLoading(true);
    setError('');
    setShowSuggestions(false);
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${OPENWEATHER_API_KEY}`);
      const data = await response.json();
      if (data.cod !== '200') {
        throw new Error(data.message);
      }
      const dailyForecast = groupForecastByDay(data.list);
      setForecastData(dailyForecast);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByGeolocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      const reverseGeocode = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      const closestCity = reverseGeocode[0]?.city;
      if (closestCity) {
        setCity(closestCity);
        fetchWeatherForecast(closestCity);
      } else {
        setError('Could not determine the closest city');
      }
    } catch (error) {
      setError(error.message);
    }
  };

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
      data: days[date],
    }));
  };

  const handleCityChange = async (input) => {
    setCity(input);
    if (input.length > 0) {
      try {
        const response = await fetch(`http://api.geonames.org/searchJSON?q=${input}&maxRows=10&username=${GEONAMES_USERNAME}`);
        const data = await response.json();
        if (data.geonames) {
          const filtered = data.geonames.map(city => city.name); // Extract city names
          setFilteredCities(filtered);
          setShowSuggestions(true);
        }
      } catch (error) {
        console.error("Error fetching city names:", error);
      }
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionPress = (suggestion) => {
    setCity(suggestion);
    fetchWeatherForecast(suggestion);
    setShowSuggestions(false);
    setHighlightedIndex(null); // Reset highlighted index
  };

  const renderItem = ({ item }) => {
    const day = moment(item.date).format('dddd, MMMM D');
    const dayForecast = item.data.map((forecast, index) => {
      let textColor;

      const description = forecast.weather[0].description.toLowerCase();
      if (description.includes('clear')) {
        textColor = 'green';
      } else if (description.includes('clouds')) {
        textColor = 'blue';
      } else if (description.includes('rain') || description.includes('thunder')) {
        textColor = 'red';
      } else {
        textColor = 'black';
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

  return (
    <ImageBackground
      source={{ uri: 'https://astro.ufl.edu/wp-content/uploads/sites/58/2022/08/Cosmic-Cliffs-jpg.jpg' }}
      style={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Choose your city"
            value={city}
            onChangeText={handleCityChange}
            onSubmitEditing={() => fetchWeatherForecast(city)}
            returnKeyType="done"
          />

          <TouchableOpacity style={styles.geoButton} onPress={fetchWeatherByGeolocation}>
            <Text style={styles.buttonText}>Auto-locate</Text>
          </TouchableOpacity>
        </View>

        {/* Display city suggestions */}
        {showSuggestions && (
          <ScrollView style={styles.suggestionsContainer}>
            {filteredCities.map((suggestion, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.suggestionItem,
                  highlightedIndex === index && styles.highlightedSuggestion, // Highlight if selected
                ]}
                onPress={() => handleSuggestionPress(suggestion)}
                onMouseEnter={() => setHighlightedIndex(index)} // Optional for mouse users
                onMouseLeave={() => setHighlightedIndex(null)} // Optional for mouse users
              >
                <Text style={styles.suggestionText}>{suggestion}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <FlatList
          data={forecastData}
          renderItem={renderItem}
          keyExtractor={(item) => item.date}
        />
      </View>
    </ImageBackground>
  );
}
