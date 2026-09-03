/**
 * ESAIA - Master Multi-Language (i18n) Context Provider
 * Manages 10 languages and full RTL bidirectional layout switching.
 */

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  SupportedLanguage,
  LanguageInfo,
  SUPPORTED_LANGUAGES,
  TranslationSchema,
  translations
} from '../i18n/translations';

interface LanguageContextValue {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: TranslationSchema;
  isRTL: boolean;
  isRtl: boolean;
  supportedLanguages: LanguageInfo[];
  currentLanguageInfo: LanguageInfo;
}

const STORAGE_LANG_KEY = 'esaia_user_language';
const LanguageContext = createContext<LanguageContextValue | null>(null);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_LANG_KEY) as SupportedLanguage;
      if (saved && translations[saved]) {
        return saved;
      }
      // Check browser language
      const navLang = navigator.language.slice(0, 2);
      if (navLang in translations) {
        return navLang as SupportedLanguage;
      }
    } catch (e) {
      // fallback
    }
    return 'en';
  });

  const currentLanguageInfo =
    SUPPORTED_LANGUAGES.find(l => l.code === language) || SUPPORTED_LANGUAGES[0];
  const isRTL = currentLanguageInfo.dir === 'rtl';

  const setLanguage = (newLang: SupportedLanguage) => {
    if (!translations[newLang]) return;
    setLanguageState(newLang);
    try {
      localStorage.setItem(STORAGE_LANG_KEY, newLang);
    } catch (e) {
      // ignore
    }
    applyLanguageToDOM(newLang);
  };

  const applyLanguageToDOM = (lang: SupportedLanguage) => {
    const langInfo = SUPPORTED_LANGUAGES.find(l => l.code === lang) || SUPPORTED_LANGUAGES[0];
    const root = document.documentElement;
    root.setAttribute('lang', lang);
    root.setAttribute('dir', langInfo.dir);

    if (langInfo.dir === 'rtl') {
      root.classList.add('rtl');
      document.body.classList.add('rtl');
    } else {
      root.classList.remove('rtl');
      document.body.classList.remove('rtl');
    }
  };

  useEffect(() => {
    applyLanguageToDOM(language);
  }, [language]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: translations[language] || translations.en,
        isRTL,
        isRtl: isRTL,
        supportedLanguages: SUPPORTED_LANGUAGES,
        currentLanguageInfo
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextValue => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
