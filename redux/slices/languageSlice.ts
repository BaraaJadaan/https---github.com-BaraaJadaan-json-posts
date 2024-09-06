import { createSlice } from '@reduxjs/toolkit';
import { I18nManager } from 'react-native';

interface LanguageState {
  language: 'en' | 'ar';
}

const initialState: LanguageState = {
  language: 'en',
};

export const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
      I18nManager.forceRTL(action.payload === 'ar');
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
