import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, ImageBackground, Image, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { SearchBar } from 'react-native-elements';
import styles from './LayoutStyle';

const imageData = [
  { 
    id: '1', 
    title: 'M31 Andromeda Galaxy', 
    uri: 'https://scontent.fbru5-1.fna.fbcdn.net/v/t31.18172-8/22538684_10155451962870971_4328018451399490144_o.jpg?_nc_cat=106&ccb=1-7&_nc_sid=13d280&_nc_ohc=YtLudjARayMQ7kNvgHfXIRq&_nc_zt=23&_nc_ht=scontent.fbru5-1.fna&_nc_gid=APpN1qyo_MT0pzfFZExFH77&oh=00_AYCN_abUTQ_zuqBDMtY-mJpwQEcVcPafSCdCTYVynaxHzQ&oe=673C634F',
    description: 'Andromeda Galaxy is a spiral galaxy about 2.537 million light-years from Earth.' 
  },
  { 
    id: '2', 
    title: 'Milky Way', 
    uri: 'https://scontent.fbru2-1.fna.fbcdn.net/v/t31.18172-8/14361309_10154295376235971_911130713936198154_o.jpg?_nc_cat=107&ccb=1-7&_nc_sid=53a332&_nc_ohc=-d0aA0sHqJkQ7kNvgF6VAYl&_nc_zt=23&_nc_ht=scontent.fbru2-1.fna&_nc_gid=ATIzM_QA20MPrLHOR6DmT5v&oh=00_AYAa-C90VJLSxa-qLmk-q6u1AfFvrvfAxc6Jxn-eUaejbQ&oe=673C3C42',
    description: 'The Milky Way is the galaxy that contains our Solar System and is home to billions of stars, including our Sun. It is a barred spiral galaxy.' 
  },
  { 
    id: '3',
    title: 'M42 Orion Nebula', 
    uri: 'https://live.staticflickr.com/7927/32277489187_7cf8db80c9_b.jpg', 
    description: 'The Orion Nebula is a diffuse nebula situated in the Milky Way, located south of Orion’s belt.' 
  },
  { 
    id: '4', 
    title: 'M51 Whirlpool Galaxy', 
    uri: 'https://scontent.fbru2-1.fna.fbcdn.net/v/t1.6435-9/56526698_10156666684495971_3005880330084155392_n.jpg?stp=dst-jpg_r270&_nc_cat=104&ccb=1-7&_nc_sid=13d280&_nc_ohc=YOrtQxvQWc8Q7kNvgEsvzn5&_nc_zt=23&_nc_ht=scontent.fbru2-1.fna&_nc_gid=AIuVQTy_n6Y5lsQiyU5-ODT&oh=00_AYDy-_FnENQLUOtBgXzYqkYMkQjJkIQU73RdzUKSd3QpqA&oe=673C5218', 
    description: 'The Whirlpool Galaxy, also known as M51, is a classic spiral galaxy located in the constellation Canes Venatici.' 
  },
  { 
    id: '5', 
    title: 'NGC2244 Rosette Nebula', 
    uri: 'https://scontent.fbru2-1.fna.fbcdn.net/v/t1.6435-9/52920475_10156600242400971_3005752473202720768_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=13d280&_nc_ohc=LV8DG23u34gQ7kNvgHGC9O1&_nc_zt=23&_nc_ht=scontent.fbru2-1.fna&_nc_gid=ALz8jlN84ASRViWd2YxYu87&oh=00_AYAj5CNClf3RjfGfOtDYPxJecAEm37Go93rFIEFvUs1KIg&oe=673C5610', 
    description: 'NGC 2244 is an open cluster located in the Rosette Nebula in the constellation Monoceros.' 
  },
  { 
    id: '6', 
    title: 'M81 Spiral galaxy', 
    uri: 'https://scontent.fbru5-1.fna.fbcdn.net/v/t1.6435-9/51445148_10156555047645971_2705043791126986752_n.jpg?stp=dst-jpg_r270&_nc_cat=103&ccb=1-7&_nc_sid=13d280&_nc_ohc=i6-U-z85oAUQ7kNvgETjRCO&_nc_zt=23&_nc_ht=scontent.fbru5-1.fna&_nc_gid=AWfHxqJTDLzVFF9oULxMW4L&oh=00_AYDIQkVsyo-ger2sBB5_smoUI727uRh-oGm0BFF0VfTdxg&oe=673C4193', 
    description: 'M81 is a grand design spiral galaxy located in the constellation Ursa Major.' 
  },
  { 
    id: '7', 
    title: 'Lunar Eclipse', 
    uri: 'https://scontent.fbru2-1.fna.fbcdn.net/v/t1.6435-9/50254835_10156524483315971_7981194398803165184_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=13d280&_nc_ohc=E4BLHm_hwegQ7kNvgHw9mE1&_nc_zt=23&_nc_ht=scontent.fbru2-1.fna&_nc_gid=AEOQgf7N0s-5hrh9gSD6fUG&oh=00_AYC52CBbO3g-ZK8tPJxdj_cfJ9wMZOCCTJXOCvgau6_H9w&oe=673C440C', 
    description: 'A lunar eclipse occurs when the Earth passes between the Sun and the Moon, blocking the Sun’s light from directly reaching the Moon.' 
  },
  { 
    id: '8', 
    title: 'IC 434 HorseHead Nebula', 
    uri: 'https://scontent.fbru5-1.fna.fbcdn.net/v/t1.6435-9/52966889_10156605809995971_5180944303848947712_n.jpg?stp=dst-jpg_r90&_nc_cat=100&ccb=1-7&_nc_sid=13d280&_nc_ohc=OrMIcaO99VkQ7kNvgGtQ7O6&_nc_zt=23&_nc_ht=scontent.fbru5-1.fna&_nc_gid=AxTZ_KDJGQDhAZ0iJGaUgJV&oh=00_AYDWMyuvKric3QB7XNYj_28i7y2QrRDugFjXm-TvEsGXaw&oe=673C4C54', 
    description: 'The Horsehead Nebula is a dark nebula in the constellation Orion.' 
  },
];

export default function ImageGallery() {
  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [likesByImage, setLikesByImage] = useState({});
  const [showMoreDetails, setShowMoreDetails] = useState(false); // State to toggle description visibility

  const handleSearch = (text) => {
    setSearchQuery(text);
    // Reset selectedImageIndex to null when search query changes
    setSelectedImageIndex(null);
  };

  const handleImagePress = (index) => {
    setSelectedImageIndex(index);
    setModalVisible(true);
    setShowMoreDetails(false); // Reset description visibility when an image is opened
  };

  const handleLike = () => {
    const imageId = filteredImages[selectedImageIndex].id;
    const updatedLikes = {
      ...likesByImage,
      [imageId]: (likesByImage[imageId] || 0) + 1,
    };
    setLikesByImage(updatedLikes);
  };

  const goToPreviousImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : filteredImages.length - 1));
  };

  const goToNextImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex < filteredImages.length - 1 ? prevIndex + 1 : 0));
  };

  const filteredImages = imageData.filter((image) =>
    image.title.toLowerCase().includes(searchQuery.toLowerCase())
  );  

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={() => handleImagePress(index)}
      >
        <Image source={{ uri: item.uri }} style={styles.image} />
        <Text style={styles.imageTitle}>{item.title}</Text>
        <Text style={styles.likesCount}>{(likesByImage[item.id] || 0)} likes</Text>
      </TouchableOpacity>
    );
  };

  return (
    <ImageBackground
      source={{ uri: 'https://i.pinimg.com/originals/a4/15/ab/a415ab2f4921f36889000a6f89cfb7e2.jpg' }}
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
                    {/* Title Section */}
                    <View style={styles.titleContainer}>
                      <Text style={styles.modalTitle} numberOfLines={1}>
                        {filteredImages[selectedImageIndex].title}
                      </Text>
                    </View>

                    {/* Description Section */}
                    <View style={styles.descriptionContainer}>
                      <ScrollView>
                        <Text style={styles.descriptionText}>
                          {filteredImages[selectedImageIndex].description}
                        </Text>
                      </ScrollView>
                    </View>
                  </ScrollView>

                  <Button title="❤️" onPress={handleLike} color="#FF4081" />
                  <Text style={styles.likesCount}>
                    {(likesByImage[filteredImages[selectedImageIndex].id] || 0)} likes
                  </Text>
                  
                  {/* Navigation Buttons */}
                  <View style={styles.navigationButtons}>
                    <Button title="Previous" onPress={goToPreviousImage} />
                    <Button title="Next" onPress={goToNextImage} />
                  </View>
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