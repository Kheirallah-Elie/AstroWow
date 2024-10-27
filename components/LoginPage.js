// LoginPage.js
import React, { useState } from "react";
import { View, ImageBackground, TextInput, Alert, Text, TouchableOpacity } from "react-native";
import { auth } from '../firebaseConfig'; // Import Firebase Auth
import { signInWithEmailAndPassword } from 'firebase/auth'; // Import Firebase method
import styles from './LayoutStyle';

const LoginPage = ({ onSwitchToSignup, onLoginSuccess }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        if (email && password) {
            try {
                await signInWithEmailAndPassword(auth, email, password); // Firebase login
                Alert.alert("Login Successful", `Welcome, ${email}`);
                onLoginSuccess(); // Call this function to set authentication to true
            } catch (error) {
                Alert.alert("Login Failed", error.message);
            }
        } else {
            Alert.alert("Please fill in all fields");
        }
    };

    return (
        <ImageBackground 
            source={{ uri: 'https://cdn.pixabay.com/photo/2023/10/24/15/18/astronomy-8338435_1280.png' }}
            style={styles.backgroundImage}
        >
            <View style={styles.wrapper}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    placeholderTextColor="#888"
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Enter your password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    placeholderTextColor="#888"
                />
                
                {/* Custom Login Button */}
                <TouchableOpacity style={styles.buttonStyle} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                {/* Switch to Signup Button */}
                <TouchableOpacity onPress={onSwitchToSignup}>
                    <Text style={{ color: 'white', marginTop: 20 }}>Not yet a member? Sign up here</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

export default LoginPage;
