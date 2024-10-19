import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, Button, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { SearchBar } from 'react-native-elements';

export default function ImageGallery() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);

  const imageData = [
    { id: '1', title: 'Andromeda Galaxy', uri: 'https://example.com/andromeda.jpg' },
    { id: '2', title: 'Milky Way', uri: 'https://example.com/milkyway.jpg' },
    { id: '3', title: 'Orion Nebula', uri: 'https://live.staticflickr.com/7927/32277489187_7cf8db80c9_b.jpg' },
    { id: '4', title: 'Whirlpool Galaxy', uri: 'https://example.com/whirlpool.jpg' },
    { id: '5', title: 'Orion Nebula', uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Orion_Nebula_-_Hubble_2006_mosaic_18000.jpg/1200px-Orion_Nebula_-_Hubble_2006_mosaic_18000.jpg' },
  ];

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const toggleImageSelection = (id) => {
    setSelectedImages((prevSelectedImages) =>
      prevSelectedImages.includes(id)
        ? prevSelectedImages.filter((imgId) => imgId !== id)
        : [...prevSelectedImages, id]
    );
  };

  const filteredImages = imageData.filter((image) =>
    image.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }) => {
    const isSelected = selectedImages.includes(item.id);
    return (
      <TouchableOpacity
        style={[styles.imageContainer, isSelected && styles.selected]}
        onPress={() => toggleImageSelection(item.id)}
      >
        <Image source={{ uri: item.uri }} style={styles.image} />
        <Text style={styles.imageTitle}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <ImageBackground
      source={{ uri: 'https://astro.ufl.edu/wp-content/uploads/sites/58/2022/08/Cosmic-Cliffs-jpg.jpg' }}
      style={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        <SearchBar
          placeholder="Search for deep sky objects..."
          onChangeText={handleSearch}
          value={searchQuery}
          lightTheme
          round
          containerStyle={styles.searchBar}
          inputStyle={styles.searchInput}
        />

        <FlatList
          data={filteredImages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2} // Show images in grid format
        />

        <Button
          title="Validate and Stack Selected Images"
          onPress={() => console.log('Selected Images:', selectedImages)}
          color="#4CAF50"
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0)',
    padding: 20,
    justifyContent: 'center',
  },
  searchBar: {
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
  searchInput: {
    backgroundColor: '#fff',
  },
  imageContainer: {
    flex: 1,
    margin: 10,
    padding: 10,
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: 'rgba(240, 240, 240, 0.8)',
  },
  selected: {
    borderColor: '#4CAF50',
    borderWidth: 3,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 8,
  },
  imageTitle: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

