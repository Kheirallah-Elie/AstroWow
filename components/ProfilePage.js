import React, { useState } from "react";
import { View, StyleSheet, ImageBackground, TextInput, Alert, Text, TouchableOpacity } from "react-native";
import { auth } from '../firebaseConfig'; // Import Firebase Auth
import { signOut } from 'firebase/auth'; // Import Firebase signOut
import { getDatabase, ref, set } from 'firebase/database'; // Import Realtime Database functions
import styles from './LayoutStyle';

const ProfilePage = ({ onLogout }) => {
    const [username, setUsername] = useState("");
    const [age, setAge] = useState("");
    const [location, setLocation] = useState("");

    const handleSaveProfile = async () => {
        const user = auth.currentUser; // Get the currently logged-in user
        if (user && username && age && location) {
            const db = getDatabase(); // Get a reference to the database
            const userProfileRef = ref(db, 'users/' + user.uid); // Create a reference to the user's profile data

            try {
                await set(userProfileRef, { // Save the profile data
                    username,
                    age,
                    location
                });
                Alert.alert("Profile Updated", `Welcome, ${username}`);
            } catch (error) {
                Alert.alert("Profile Update Failed", error.message);
            }
        } else {
            Alert.alert("Please fill in all fields");
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth); // Firebase sign-out
            onLogout(); // Navigate back to the Login page
        } catch (error) {
            Alert.alert("Logout Failed", error.message);
        }
    };

    return (
        <ImageBackground 
            source={{ uri: 'https://img.freepik.com/free-vector/galaxy-background-vector-space-desktop-wallpaper_53876-136887.jpg?t=st=1729757615~exp=1729761215~hmac=513586a7b6ca3fc6945acb41a58b25df39b16d1d24d566043b54079c50d0d312&w=2000' }}
            style={styles.backgroundImage}
        >
            <View style={styles.wrapper}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                    placeholderTextColor="#888"
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Age"
                    value={age}
                    onChangeText={setAge}
                    keyboardType="numeric"
                    placeholderTextColor="#888"
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Location"
                    value={location}
                    onChangeText={setLocation}
                    placeholderTextColor="#888"
                />

                {/* Custom Save Profile Button */}
                <TouchableOpacity style={styles.buttonStyle} onPress={handleSaveProfile}>
                    <Text style={styles.buttonText}>Save Profile</Text>
                </TouchableOpacity>

                {/* Custom Logout Button */}
                <TouchableOpacity style={styles.exitButtonStyle} onPress={handleLogout}>
                    <Text style={styles.buttonText}  >Logout</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

export default ProfilePage;
