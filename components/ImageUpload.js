// components/ImageUpload.js
import React, { useState } from 'react';
import { View, Text, Alert, Image, TouchableOpacity, ImageBackground } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'; 
import { database } from '../firebaseConfig'; // Import Firebase Config for the database
import styles from './LayoutStyle'; // Import shared styles from LayoutStyle

const ImageUpload = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
            uploadImage(result.assets[0].uri); // Call upload function
        }
    };

    const uploadImage = async (uri) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        const storage = getStorage();
        const storageRef = ref(storage, `images/${Date.now()}`); // Use a unique name

        uploadBytes(storageRef, blob)
            .then(async (snapshot) => {
                Alert.alert('Upload Successful', 'Your image has been uploaded!');
                const url = await getDownloadURL(storageRef);
                console.log('File available at', url);

                // Optionally save the image URL to your database
                const imageRef = dbRef(database, 'images').push();
                await imageRef.set({ url });
            })
            .catch((error) => {
                Alert.alert('Upload Failed', error.message);
            });
    };

    return (
        <ImageBackground
            source={{ uri: 'https://img.freepik.com/free-vector/mobile-wallpaper-with-fluid-shapes_79603-599.jpg?t=st=1729757486~exp=1729761086~hmac=a36034be6992ab57dcebb5f7e55c07d6874f9a281e34084676852bb61f62048e&w=900' }}
            style={styles.backgroundImage}
        >
            <View style={styles.overlay}>
                {/* Custom button with better visibility */}
                <TouchableOpacity onPress={pickImage} style={styles.buttonStyle}>
                    <Text style={styles.buttonText}>Pick an image from camera roll</Text>
                </TouchableOpacity>

                {selectedImage && <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200, marginTop: 20 }} />}
            </View>
        </ImageBackground>
    );
};

export default ImageUpload;
