import React, { useState } from "react";
import { View, StyleSheet, ImageBackground, TextInput, Alert, Text, TouchableOpacity } from "react-native";
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
                onLoginSuccess(); // Navigate to the Profile page
            } catch (error) {
                Alert.alert("Login Failed", error.message);
            }
        } else {
            Alert.alert("Please fill in all fields");
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
