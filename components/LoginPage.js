// components/LoginPage.tsx
import React, { useState } from "react";
import { View, StyleSheet, TextInput, Button, Alert } from "react-native";

const LoginPage = ({ onSwitchToSignup }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = (email, password) => {
        console.log("Logging in with:", email, password);
        if (email === "test@example.com" && password === "password") {
            Alert.alert("Login Successful", `Welcome, ${email}`);
        } else {
            Alert.alert("Login Failed", "Incorrect email or password");
        }
    };

    const handleLogin = () => {
        if (email && password) {
            login(email, password);
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
            <Button title="Not yet a member? Sign in here" onPress={onSwitchToSignup} />
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
