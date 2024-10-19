// components/ImageGallery.js
import React, { useEffect, useState } from 'react';
import { View, Image, FlatList, TouchableOpacity, Text, StyleSheet, ActivityIndicator, Button } from 'react-native';
import { ref as dbRef, onValue, update } from 'firebase/database'; 
import { database, auth } from '../firebaseConfig';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker'; // Use Expo Image Picker

const ImageGallery = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const user = auth.currentUser;
        if (!user) {
            console.log("User is not logged in");
            setLoading(false);
            return;
        }

        const imagesRef = dbRef(database, `images/${user.uid}`);
        const unsubscribe = onValue(imagesRef, (snapshot) => {
            setLoading(false);
            if (snapshot.exists()) {
                const data = snapshot.val();
                const imageArray = Object.keys(data).map(key => ({ id: key, ...data[key] }));
                setImages(imageArray);
            } else {
                setImages([]);
            }
        }, (error) => {
            console.error("Error fetching images: ", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleLike = (imageId) => {
        const user = auth.currentUser;
        if (!user) {
            console.log("User is not logged in, can't like image.");
            return;
        }

        const imageRef = dbRef(database, `images/${user.uid}/${imageId}`);
        update(imageRef, {
            likes: (images.find(img => img.id === imageId)?.likes || 0) + 1
        });
    };

    const openImage = (item) => {
        // Open image with likes and comments
        // Navigate to a detail view or use a modal
    };

    const handleUpload = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });
        if (result.canceled) {
            console.log("User cancelled image picker");
            return;
        }
        
        const selectedImage = result.assets[0];

        // Upload image to Firebase Storage
        const storage = getStorage();
        const reference = storageRef(storage, `images/${auth.currentUser.uid}/${selectedImage.fileName}`);
        const response = await fetch(selectedImage.uri);
        const blob = await response.blob();
        
        await uploadBytes(reference, blob);

        // Get the download URL
        const url = await getDownloadURL(reference);

        // Save the image URL to your database
        const imageRef = dbRef(database, `images/${auth.currentUser.uid}`).push();
        await imageRef.set({
            url,
            likes: 0,
            createdAt: Date.now(),
        });

        console.log("Image uploaded successfully: ", url);
    };

    if (loading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View>
            <Button title="Upload Image" onPress={handleUpload} />
            <FlatList
                data={images}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => openImage(item)}>
                        <Image source={{ uri: item.url }} style={styles.image} />
                        <Text>{item.likes || 0} likes</Text>
                    </TouchableOpacity>
                )}
                numColumns={3} // Like Instagram
            />
        </View>
    );
};

const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100,
        margin: 5,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ImageGallery;
