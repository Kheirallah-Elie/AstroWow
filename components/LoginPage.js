// components/LoginPage.tsx
import React, { useState } from "react";
import { View, StyleSheet, TextInput, Button, Alert } from "react-native";
import { auth } from '../firebaseConfig'; // Import Firebase Auth
import { signInWithEmailAndPassword } from 'firebase/auth'; // Import Firebase method

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
        <View style={styles.wrapper}>
            <TextInput
                style={styles.textInput}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
            />
            <TextInput
                style={styles.textInput}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Login" onPress={handleLogin} />
            <Button title="Not yet a member? Sign up here" onPress={onSwitchToSignup} />
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

export default LoginPage;
