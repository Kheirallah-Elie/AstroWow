// components/ProfilePage.tsx
import React, { useState } from "react";
import { View, StyleSheet, TextInput, Button, Alert } from "react-native";
import { auth } from '../firebaseConfig'; // Import Firebase Auth
import { signOut } from 'firebase/auth'; // Import Firebase signOut
import { getDatabase, ref, set } from 'firebase/database'; // Import Realtime Database functions

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
        <View style={styles.wrapper}>
            <TextInput
                style={styles.textInput}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.textInput}
                placeholder="Age"
                value={age}
                onChangeText={setAge}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.textInput}
                placeholder="Location"
                value={location}
                onChangeText={setLocation}
            />
            <Button title="Save Profile" onPress={handleSaveProfile} />
            <Button title="Logout" onPress={handleLogout} />
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        display: "flex",
        flexDirection: "column",
        width: "80%",
        alignItems: "center",
        justifyContent: "space-around",
        height: 300,
    },
    textInput: {
        height: 40,
        backgroundColor: "white",
        width: "100%",
        marginBottom: 10,
        paddingHorizontal: 10,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
    },
});

export default ProfilePage;
