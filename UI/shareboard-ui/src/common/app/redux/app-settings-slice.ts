import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import i18n from '../../../i18n';
import { AppSettingDefaults } from '../../constants';

interface AppSettings {
  language: string;
}

const initialState: AppSettings = {
  language: i18n.language || AppSettingDefaults.DEFAULT_LANGUAGE,
};

export const appSettingsSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
        state.language = action.payload;
        i18n.changeLanguage(action.payload);
    },
  },
});

export const { setLanguage } = appSettingsSlice.actions;
export default appSettingsSlice.reducer;