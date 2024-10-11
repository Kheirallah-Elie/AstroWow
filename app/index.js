// index.tsx
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import LoginPage from '../components/LoginPage'; // Adjust the import path if necessary
import Signup from '../components/SignUp'; // Adjust the import path if necessary

const Index = () => {
    const [isLoginPage, setIsLoginPage] = useState(true); // State to toggle between Login and Signup

    const switchToSignup = () => {
        setIsLoginPage(false); // Switch to Signup
    };

    const switchToLogin = () => {
        setIsLoginPage(true); // Switch back to Login
    };

    return (
        <SafeAreaView style={styles.container}>
            {isLoginPage ? (
                <LoginPage onSwitchToSignup={switchToSignup} />
            ) : (
                <Signup onSwitchToLogin={switchToLogin} />
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
});

export default Index;
