import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

const resources = {
  en: {
    translation: {
      posts: 'Posts',
      title: 'Title',
      postDetails: 'Post Details',
      changeLanguage: 'Change Language',
      user: 'User',
    },
  },
  ar: {
    translation: {
      posts: 'المنشورات',
      title: 'العنوان',
      postDetails: 'تفاصيل المنشور',
      changeLanguage: 'تغيير اللغة',
      user: 'المستخدم',
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: Localization.locale.includes('ar') ? 'ar' : 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
