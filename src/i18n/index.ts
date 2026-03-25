import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';

import { getStoredLanguage } from '../lib/i18n-language';
import { en } from './locales/en';
import { zh } from './locales/zh';

const i18n = createInstance();

void i18n.use(initReactI18next).init({
  compatibilityJSON: 'v4',
  lng: getStoredLanguage() ?? 'zh',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: { translation: en },
    zh: { translation: zh },
  },
});

export { i18n };
