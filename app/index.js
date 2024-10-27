import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { auth } from '../firebaseConfig'; // Import Firebase auth
import LoginPage from '../components/LoginPage'; // Import LoginPage
import ProfilePage from '../components/ProfilePage'; // Import ProfilePage
import Signup from '../components/SignUpPage'; // Import Signup page

const Index = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showSignup, setShowSignup] = useState(false); // State to track if the user wants to sign up

    // Check authentication status on component mount
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setIsAuthenticated(!!user); // Set to true if a user is authenticated, false otherwise
        });

        // Unsubscribe from the listener on unmount
        return unsubscribe;
    }, []);

    const handleLogout = () => {
        setIsAuthenticated(false); // Set authentication to false when logging out
    };

    const handleLogin = () => {
        setIsAuthenticated(true); // Set authentication to true when logging in
    };

    return (
        <View style={styles.container}>
            {isAuthenticated ? (
                <ProfilePage onLogout={handleLogout} />
            ) : showSignup ? (
                <Signup onSwitchToLogin={() => setShowSignup(false)} />
            ) : (
                <LoginPage onSwitchToSignup={() => setShowSignup(true)} onLoginSuccess={handleLogin} />
            )}
        </View>
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
