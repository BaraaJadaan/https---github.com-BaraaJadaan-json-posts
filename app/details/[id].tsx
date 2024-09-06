import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { getUser } from '@/services/api';
import { useLocalSearchParams } from 'expo-router';
import axios from 'axios';

interface Post {
  title: string;
  body: string;
  userId: number;
}

interface User {
  name: string;
  email: string;
}

const PostDetailsScreen = () => {
    const { id } = useLocalSearchParams();
    const [post, setPost] = useState<Post | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        const fetchPostAndUser = async () => {
          try {
            const postResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
            setPost(postResponse.data);
            const userResponse = await getUser(postResponse.data.userId);
            setUser(userResponse.data);
            setLoading(false);
            
          } catch (error) {
            setError(true);
            setLoading(false);
          }
        };
    
        fetchPostAndUser();
    
    
      }, [id]);

      if (error) {
        return <Text style={styles.errorText}>Error: Failed to load post details. Please try again later.</Text>;
      }
    
      if (loading) {
        return <Text style={styles.loadingText}>Loading...</Text>;
      }

    return (
        <View style={styles.container}>
        <Stack.Screen options={{ title: `details of post ${id}`, headerTitleAlign: 'center', }} />
        <Text style={styles.headerText}>{t('title')}</Text>
        <Text style={styles.postTitle}>{post?.title}</Text>
        <Text style={styles.headerText}>{t('postDetails')}</Text>
        <Text style={styles.postBody}>{post?.body}</Text>
        <Text style={styles.userText}>{t('user')}: {user?.name}</Text>
        <Text style={styles.userEmail}>{user?.email}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#f8f9fa',
    },
    headerText: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
    },
    postTitle: {
      fontSize: 22,
      marginBottom: 10,
    },
    postBody: {
      fontSize: 18,
      marginBottom: 20,
    },
    userText: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    userEmail: {
      fontSize: 18,
    },
    loadingText: {
      fontSize: 18,
      textAlign: 'center',
      marginTop: 20,
    },
    errorText: {
      fontSize: 18,
      color: 'red',
      textAlign: 'center',
      marginTop: 20,
    },
});

export default PostDetailsScreen;
