import React, { useState } from 'react';
import { View, ImageBackground, TextInput, Text, Alert, TouchableOpacity } from 'react-native';
import { auth } from '../firebaseConfig'; // Import the auth object
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Import Firebase Auth methods
import styles from './LayoutStyle';

const Signup = ({ onSwitchToLogin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignUp = async () => {
        if (email && password) {
            try {
                await createUserWithEmailAndPassword(auth, email, password); // Firebase sign-up
                Alert.alert("Sign Up Successful", `Welcome, ${email}`);
            } catch (error) {
                Alert.alert("Sign Up Failed", error.message);
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
                    placeholder="Choose your email"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    placeholderTextColor="#888"
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Choose your password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    placeholderTextColor="#888" // Change this to any color you want
                />
                
                {/* Custom Sign Up Button */}
                <TouchableOpacity style={styles.buttonStyle} onPress={handleSignUp}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>

                {/* Switch to Login Button */}
                <TouchableOpacity onPress={onSwitchToLogin}>
                    <Text style={{ color: 'white', marginTop: 20 }}>Already a member? Login here</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

export default Signup;
