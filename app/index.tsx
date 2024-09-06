import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import i18n from '@/localization/i18n';
import { getPosts } from '../services/api';
import { useDispatch } from 'react-redux';
import { setLanguage } from '../redux/slices/languageSlice';
import { Link } from 'expo-router';


interface Post {
  id: number;
  title: string;
  userId: number;
}

const PostsList = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPosts();
      setPosts(response.data);
    };
    fetchPosts();
  }, []);

  const handleLanguageToggle = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    dispatch(setLanguage(newLang));
    i18n.changeLanguage(newLang);
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.languageButton} onPress={handleLanguageToggle}>
        <Text style={styles.languageText}>{t('changeLanguage')}</Text>
      </Pressable>
      <Text style={styles.headerText}>{t('posts')}</Text>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
            <Link
              style={styles.postItem}
              href={{
                pathname: '/details/[id]',
                params: { id: item.id },
              }}
              >
              <Text style={styles.postTitle}>{item.title}</Text>
            </Link>
        )}
      />
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
  languageButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 16,
  },
  languageText: {
    color: '#fff',
    textAlign: 'center',
  },
  postItem: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
  },
  postTitle: {
    fontSize: 18,
  },
});

export default PostsList;
