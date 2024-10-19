// components/Signup.tsx
import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { auth } from '../firebaseConfig'; // Import the auth object
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Import Firebase Auth methods

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
            <Button title="Sign Up" onPress={handleSignUp} />
            <Button title="Already a member? Login here" onPress={onSwitchToLogin} />
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
        height: 300, // Same height as Login Page
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

export default Signup;
