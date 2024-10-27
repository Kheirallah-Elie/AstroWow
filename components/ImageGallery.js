import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, ImageBackground, Image, TouchableOpacity, Modal, ScrollView, Alert } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { getDatabase, ref as dbRef, onValue, set, remove } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import styles from './LayoutStyle';

export default function ImageGallery() {
  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [likesByImage, setLikesByImage] = useState({});
  const [imageData, setImageData] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);

  // Get the logged-in user's ID from Firebase Authentication
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUserId(user.uid);
      } else {
        setCurrentUserId(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Fetch images and likes from Firebase Database
  useEffect(() => {
    const db = getDatabase();
    const imagesRef = dbRef(db, 'images');

    const unsubscribe = onValue(imagesRef, (snapshot) => {
      const imagesArray = [];
      const likes = {};
      snapshot.forEach((childSnapshot) => {
        const imageData = { id: childSnapshot.key, ...childSnapshot.val() };
        imagesArray.push(imageData);
        
        // Get the likes data for each image
        likes[imageData.id] = imageData.likes || {}; // Default to empty object if no likes
      });
      setImageData(imagesArray);
      setLikesByImage(likes);
    });

    return () => unsubscribe();
  }, []);

  const handleSearch = (text) => {
    setSearchQuery(text);
    setSelectedImageIndex(null);
  };

  const handleImagePress = (index) => {
    setSelectedImageIndex(index);
    setModalVisible(true);
  };

  const handleLike = () => {
    if (!currentUserId) {
      Alert.alert("Login required", "You need to be logged in to like images.");
      return;
    }
  
    const imageId = filteredImages[selectedImageIndex]?.id;
    if (imageId) {
      const db = getDatabase();
      const likeRef = dbRef(db, `images/${imageId}/likes/${currentUserId}`);
      const currentLikes = likesByImage[imageId] || {};
  
      if (currentLikes[currentUserId]) {
        // If the user already liked the image, remove the like
        remove(likeRef).catch((error) => console.error("Error unliking image:", error));
      } else {
        // If the user hasn't liked the image, add the like
        set(likeRef, true).catch((error) => console.error("Error liking image:", error));
      }
    }
  };
  

  // Delete image if current user is the author and confirms deletion
  const handleDelete = () => {
    Alert.alert(
      "Delete Image",
      "Are you sure you want to delete this image?",
      [
        {
          text: "No",
          style: "cancel"
        },
        {
          text: "Yes",
          onPress: () => {
            const imageId = filteredImages[selectedImageIndex]?.id;
            if (imageId) {
              const db = getDatabase();
              const imageRef = dbRef(db, `images/${imageId}`);
              remove(imageRef)
                .then(() => {
                  setImageData((prevData) => prevData.filter((image) => image.id !== imageId));
                  setModalVisible(false);
                })
                .catch((error) => console.error("Error deleting image:", error));
            }
          },
          style: "destructive"
        }
      ]
    );
  };

  const goToPreviousImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : filteredImages.length - 1));
  };

  const goToNextImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex < filteredImages.length - 1 ? prevIndex + 1 : 0));
  };

  // Filter images based on search query
  const filteredImages = imageData.filter(
    (image) => image.title && image.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item, index }) => (
    <TouchableOpacity style={styles.imageContainer} onPress={() => handleImagePress(index)}>
      <Image source={{ uri: item.uri }} style={styles.image} />
      <Text style={styles.imageTitle}>{item.title}</Text>
      <Text style={styles.likesCount}>{Object.keys(item.likes || {}).length} likes</Text>
    </TouchableOpacity>
  );

  return (
    <ImageBackground
      source={{ uri: 'https://media.newyorker.com/photos/64cd6b833f0ea61101b7e2a9/master/pass/Brown-James-Webb-1.jpg' }}
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
          numColumns={2}
        />

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              {selectedImageIndex !== null && selectedImageIndex < filteredImages.length && (
                <>
                  <Image source={{ uri: filteredImages[selectedImageIndex].uri }} style={styles.modalImage} />
                  <ScrollView>
                    <View style={styles.titleContainer}>
                      <Text style={styles.modalTitle} numberOfLines={1}>
                        {filteredImages[selectedImageIndex].title}
                      </Text>
                    </View>

                    <View style={styles.descriptionContainer}>
                      <ScrollView>
                        <Text style={styles.descriptionText}>
                          {filteredImages[selectedImageIndex].description}
                        </Text>
                      </ScrollView>
                    </View>
                  </ScrollView>

                  {/* Like/Unlike button with emoji change based on like status */}
                  <TouchableOpacity onPress={handleLike}>
                    <Text style={{ fontSize: 24 }}>
                      {likesByImage[filteredImages[selectedImageIndex].id]?.[currentUserId] ? '❤️' : '🤍'}
                    </Text>
                  </TouchableOpacity>
                  <Text style={styles.likesCount}>
                    {Object.keys(likesByImage[filteredImages[selectedImageIndex].id] || {}).length} likes
                  </Text>

                  <View style={styles.navigationButtons}>
                    <Button title="Previous" onPress={goToPreviousImage} />
                    <Button title="Next" onPress={goToNextImage} />
                  </View>

                  {/* Show delete button only if current user is the author of the image */}
                  {filteredImages[selectedImageIndex].userId === currentUserId && (
                    <Button title="🗑 Delete" onPress={handleDelete} color="#f44336" />
                  )}
                </>
              )}
              <Button title="Close" onPress={() => setModalVisible(false)} color="#f44336" />
            </View>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
}
