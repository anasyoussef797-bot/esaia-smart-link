/**
 * ESAIA - Master Theme Context Provider
 * Supports: Dark Mode, Light Mode, and Beige (Warm Corporate)
 * Persists user preference to localStorage and updates DOM dataset attribute.
 */

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type AppTheme = 'dark' | 'light' | 'beige';

export interface ThemeOption {
  id: AppTheme;
  label: string;
  description: string;
  iconName: string;
  previewBg: string;
  previewBorder: string;
  previewAccent: string;
}

export const THEME_OPTIONS: ThemeOption[] = [
  {
    id: 'dark',
    label: 'Dark Mode',
    description: 'Deep navy/slate contrast, optimized for low light environments',
    iconName: 'Moon',
    previewBg: '#090a0f',
    previewBorder: '#24293d',
    previewAccent: '#3b82f6'
  },
  {
    id: 'light',
    label: 'Light Mode',
    description: 'Crisp, high-contrast clean corporate light palette',
    iconName: 'Sun',
    previewBg: '#f4f6f9',
    previewBorder: '#e2e8f0',
    previewAccent: '#2563eb'
  },
  {
    id: 'beige',
    label: 'Warm Corporate (Beige)',
    description: 'Refined warm stone & linen tones with elegant contrast',
    iconName: 'Sparkles',
    previewBg: '#f6f3eb',
    previewBorder: '#dfd7cb',
    previewAccent: '#1e40af'
  }
];

interface ThemeContextValue {
  theme: AppTheme;
  setTheme: (theme: AppTheme) => void;
  isDark: boolean;
  themeOptions: ThemeOption[];
}

const STORAGE_THEME_KEY = 'esaia_theme_preference';
const ThemeContext = createContext<ThemeContextValue | null>(null);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<AppTheme>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_THEME_KEY);
      if (saved === 'dark' || saved === 'light' || saved === 'beige') {
        return saved;
      }
    } catch (e) {
      // ignore
    }
    return 'dark'; // default theme
  });

  const setTheme = (newTheme: AppTheme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem(STORAGE_THEME_KEY, newTheme);
    } catch (e) {
      // ignore
    }
    applyThemeToDOM(newTheme);
  };

  const applyThemeToDOM = (t: AppTheme) => {
    const root = document.documentElement;
    const body = document.body;
    
    root.setAttribute('data-theme', t);
    root.classList.remove('theme-dark', 'theme-light', 'theme-beige', 'dark', 'light');
    root.classList.add(`theme-${t}`);
    
    if (body) {
      body.setAttribute('data-theme', t);
      body.classList.remove('theme-dark', 'theme-light', 'theme-beige', 'dark', 'light');
      body.classList.add(`theme-${t}`);
    }

    if (t === 'dark') {
      root.classList.add('dark');
      if (body) body.classList.add('dark');
    }
  };

  useEffect(() => {
    applyThemeToDOM(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        isDark: theme === 'dark',
        themeOptions: THEME_OPTIONS
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
