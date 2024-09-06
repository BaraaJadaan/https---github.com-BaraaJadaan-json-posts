import { useEffect } from 'react';
import i18n from '@/localization/i18n';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const useLanguageInit = () => {
  const language = useSelector((state: RootState) => state.language.language);

  useEffect(() => {
    if (language && i18n.language !== language) {
      i18n.changeLanguage(language);
    }
  }, [language]);
};

export default useLanguageInit;
