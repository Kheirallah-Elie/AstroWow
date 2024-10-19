// components/ImageDetail.js
import React, { useEffect, useState } from 'react';
import { View, Image, Text, TextInput, Button, StyleSheet } from 'react-native';
import { ref as dbRef, onValue, update } from 'firebase/database'; 
import { auth, database } from '../firebaseConfig';

const ImageDetail = ({ route }) => {
    const { imageId } = route.params; // Get the image ID from route params
    const [imageData, setImageData] = useState(null);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const user = auth.currentUser;
        if (!user) return;

        // Fetch image data
        const imageRef = dbRef(database, `images/${user.uid}/${imageId}`);
        const commentsRef = dbRef(database, `comments/${imageId}`);

        onValue(imageRef, (snapshot) => {
            if (snapshot.exists()) {
                setImageData(snapshot.val());
            }
        });

        onValue(commentsRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const commentsArray = Object.keys(data).map(key => ({ id: key, ...data[key] }));
                setComments(commentsArray);
            }
        });
    }, [imageId]);

    const handleComment = async () => {
        const user = auth.currentUser;
        if (!user) return;

        // Push comment to the comments node
        const commentRef = dbRef(database, `comments/${imageId}`).push();
        await commentRef.set({
            userId: user.uid,
            comment,
            createdAt: Date.now(),
        });
        setComment(""); // Clear input after submission
    };

    if (!imageData) return <Text>Loading image details...</Text>; // Provide a loading state

    return (
        <View>
            <Image source={{ uri: imageData.url }} style={styles.image} />
            <Text>{imageData.likes || 0} likes</Text>
            <TextInput
                style={styles.commentInput}
                placeholder="Add a comment..."
                value={comment}
                onChangeText={setComment}
            />
            <Button title="Post Comment" onPress={handleComment} />
            {comments.map((c) => (
                <View key={c.id}>
                    <Text>{c.comment} - {c.userId}</Text>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300,
    },
    commentInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
    },
});

export default ImageDetail;
