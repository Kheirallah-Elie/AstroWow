import React, { useState, useEffect } from "react";
import { View, ImageBackground, TextInput, Alert, Text, TouchableOpacity } from "react-native";
import { auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';
import { getDatabase, ref, set, get, child } from 'firebase/database';
import styles from './LayoutStyle';

const ProfilePage = ({ onLogout }) => {
    const [username, setUsername] = useState("");
    const [age, setAge] = useState("");
    const [location, setLocation] = useState("");
    const [editingField, setEditingField] = useState(null);

    // Fetch user profile from Firebase on mount
    useEffect(() => {
        const fetchUserProfile = async () => {
            const user = auth.currentUser;
            if (user) {
                const dbRef = ref(getDatabase());
                try {
                    const snapshot = await get(child(dbRef, `users/${user.uid}`));
                    if (snapshot.exists()) {
                        const data = snapshot.val();
                        setUsername(data.username || "");
                        setAge(data.age || "");
                        setLocation(data.location || "");
                    }
                } catch (error) {
                    Alert.alert("Failed to load profile", error.message);
                }
            }
        };
        fetchUserProfile();
    }, []);

    const handleSaveProfile = async () => {
        const user = auth.currentUser;
        if (user) {
            const db = getDatabase();
            const userProfileRef = ref(db, 'users/' + user.uid);
            try {
                await set(userProfileRef, {
                    username,
                    age,
                    location
                });
                Alert.alert("Profile Updated", `Welcome, ${username}`);
            } catch (error) {
                Alert.alert("Profile Update Failed", error.message);
            }
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            onLogout();
        } catch (error) {
            Alert.alert("Logout Failed", error.message);
        }
    };

    const toggleEdit = (field) => {
        setEditingField(editingField === field ? null : field);
    };

    const renderEditableField = (field, value, setValue) => (
        <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>{field}:</Text>
            {editingField === field ? (
                <TextInput
                    style={styles.editableTextInput}
                    value={value}
                    onChangeText={setValue}
                    placeholder={`Enter ${field}`}
                    keyboardType={field === "age" ? "numeric" : "default"}
                />
            ) : (
                <Text style={styles.fieldValue}>{value}</Text>
            )}
            <TouchableOpacity onPress={() => toggleEdit(field)}>
                <Text style={styles.editButtonText}>{editingField === field ? "Confirm" : "Edit"}</Text>
            </TouchableOpacity>
            {editingField === field && (
                <TouchableOpacity onPress={handleSaveProfile}>
                    <Text style={styles.confirmButtonText}>Save</Text>
                </TouchableOpacity>
            )}
        </View>
    );

    return (
        <ImageBackground
            source={{ uri: 'https://cdn.pixabay.com/photo/2023/10/24/15/18/astronomy-8338435_1280.png' }}
            style={styles.backgroundImage}
        >
            <View style={styles.wrapper}>
                {/* Username Field */}
                {renderEditableField("Username", username, setUsername)}

                {/* Age Field */}
                {renderEditableField("Age", age, setAge)}

                {/* Location Field */}
                {renderEditableField("Location", location, setLocation)}

                {/* Logout Button */}
                <TouchableOpacity style={styles.exitButtonStyle} onPress={handleLogout}>
                    <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

export default ProfilePage;
