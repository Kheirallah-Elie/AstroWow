import React, { useState, useEffect } from 'react';
import { View, Text, Alert, Image, TouchableOpacity, ImageBackground, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'; 
import { getDatabase, ref as dbRef, set } from 'firebase/database'; // Import database functions
import { auth } from '../firebaseConfig'; // Import Firebase Auth
import styles from './LayoutStyle'; // Import shared styles from LayoutStyle

const ImageUpload = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [title, setTitle] = useState(''); // State for image title
    const [description, setDescription] = useState(''); // State for image description

    // Monitor authentication state
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (!user) {
                Alert.alert("You must be logged in to upload images.");
            }
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (result.assets && result.assets.length > 0) {
            setSelectedImage(result.assets[0].uri);
        }
    };

    const uploadImage = async () => {
        const user = auth.currentUser;
        if (!user) {
            Alert.alert("You must be logged in to upload images.");
            return; // Prevent further execution if not authenticated
        }

        if (!selectedImage) {
            Alert.alert('Please select an image first.');
            return;
        }

        try {
            const response = await fetch(selectedImage);
            const blob = await response.blob();
            const storage = getStorage();
            const storageRef = ref(storage, `images/${Date.now()}`); // Use a unique name

            const snapshot = await uploadBytes(storageRef, blob);
            Alert.alert('Upload Successful', 'Your image has been uploaded!');
            const url = await getDownloadURL(storageRef);
            console.log('File available at', url);

            // Save the image URL and metadata to your database
            const db = getDatabase(); // Initialize database reference
            
            // Use a unique key for the image entry
            const imageId = Date.now().toString(); // You can also use a UUID library for better uniqueness
            const imageRef = dbRef(db, `images/${imageId}`); // Create a new reference for the image
            
            const imageData = {
                uri: url, // The image URL
                title: title,
                description: description,
                likes: {}, // Initialize likes as an empty object
                userId: user.uid // Store the user's ID who uploaded the image
            };

            await set(imageRef, imageData); // Save the data in the database
            Alert.alert('Image Data Saved', 'Your image data has been saved successfully!');

            // Reset fields after successful upload
            setSelectedImage(null);
            setTitle('');
            setDescription('');
        } catch (error) {
            Alert.alert('Upload Failed', error.message);
        }
    };

    return (
        <ImageBackground
            source={{ uri: 'https://i0.wp.com/newspaceeconomy.ca/wp-content/uploads/2023/11/newspaceeconomy_a_large_telescope_on_the_top_of_the_mountain_un_84955b9a-b59a-47eb-99d4-432cbf28df0c-1.jpg?fit=1024%2C1024&quality=89&ssl=1' }}
            style={styles.backgroundImage}
        >
            <View style={styles.overlay}>
                {/* Input fields for title and description */}
                <TextInput
                    placeholder="Enter Image Title"
                    value={title}
                    onChangeText={setTitle}
                    style={styles.input}
                    placeholderTextColor="#888"
                />
                <TextInput
                    placeholder="Enter Image Description"
                    value={description}
                    onChangeText={setDescription}
                    style={styles.input}
                    placeholderTextColor="#888"
                />

                {/* Custom button with better visibility */}
                <TouchableOpacity onPress={pickImage} style={styles.buttonStyle}>
                    <Text style={styles.buttonText}>Pick an image from camera roll</Text>
                </TouchableOpacity>

                {selectedImage && <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200, marginTop: 20 }} />}

                {/* Button to upload the image */}
                {selectedImage && (
                    <TouchableOpacity onPress={uploadImage} style={styles.buttonStyle}>
                        <Text style={styles.buttonText}>Upload Image</Text>
                    </TouchableOpacity>
                )}
            </View>
        </ImageBackground>
    );
};

export default ImageUpload;
