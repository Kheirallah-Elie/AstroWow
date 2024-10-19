// index.tsx
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import LoginPage from '../components/LoginPage';
import Signup from '../components/SignUpPage';
import ProfilePage from '../components/ProfilePage'; // Import the ProfilePage

const Index = () => {
    const [currentPage, setCurrentPage] = useState("login"); // State to handle which page is shown

    const switchToSignup = () => {
        setCurrentPage("signup"); // Switch to Signup
    };

    const switchToLogin = () => {
        setCurrentPage("login"); // Switch back to Login
    };

    const onLoginSuccess = () => {
        setCurrentPage("profile"); // Switch to Profile page on successful login
    };

    const handleLogout = () => {
        setCurrentPage("login"); // Go back to Login on logout
    };

    return (
        <SafeAreaView style={styles.container}>
            {currentPage === "login" && <LoginPage onSwitchToSignup={switchToSignup} onLoginSuccess={onLoginSuccess} />}
            {currentPage === "signup" && <Signup onSwitchToLogin={switchToLogin} />}
            {currentPage === "profile" && <ProfilePage onLogout={handleLogout} />}
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
