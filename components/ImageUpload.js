// components/ImageUpload.js
import React, { useState } from 'react';
import { View, Button, Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'; 
import { database } from '../firebaseConfig'; // Import Firebase Config for the database

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
                // Example code to add the image URL to the database
                const imageRef = dbRef(database, 'images').push();
                await imageRef.set({ url });
            })
            .catch((error) => {
                Alert.alert('Upload Failed', error.message);
            });
    };

    return (
        <View>
            <Button title="Pick an image from camera roll" onPress={pickImage} />
            {selectedImage && <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200 }} />}
        </View>
    );
};

export default ImageUpload;
