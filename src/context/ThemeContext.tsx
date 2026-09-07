/**
 * ESAIA - Master Theme Context Provider
 * Supports:
 * - Dark Mode (Default Slate & Navy)
 * - Light Mode (Crisp Minimalist Clean)
 * - Warm Desert Beige (Rich, warm, authentic camel & sand tone)
 * - Olive Mode (Tactical Military & Sage Dark Olive)
 * - Gray Mode (Pure Charcoal & Graphite Slate)
 * - Custom Theme Studio (Full user freedom to pick canvas, card, sidebar, border, text & accent colors)
 */

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type AppTheme = 'dark' | 'light' | 'beige' | 'olive' | 'gray' | 'custom';

export interface ThemeOption {
  id: AppTheme;
  label: string;
  description: string;
  iconName: string;
  previewBg: string;
  previewBorder: string;
  previewAccent: string;
}

export interface CustomThemeColors {
  appBg: string;        // Canvas background
  cardBg: string;       // Cards, dropdowns, panels
  sidebarBg: string;    // Sidebar & Header background
  borderColor: string;  // Borders & dividers
  textColor: string;    // Primary text
  textSecondary: string;// Secondary / sub text
  accentColor: string;  // Primary action buttons, badges & links
}

export interface CustomThemePreset {
  id: string;
  name: string;
  nameAr: string;
  colors: CustomThemeColors;
}

export const DEFAULT_CUSTOM_COLORS: CustomThemeColors = {
  appBg: '#0b1329',
  cardBg: '#131f3f',
  sidebarBg: '#0e1833',
  borderColor: '#223668',
  textColor: '#f0f6fc',
  textSecondary: '#8ba2d4',
  accentColor: '#38bdf8'
};

export const CUSTOM_PRESETS: CustomThemePreset[] = [
  {
    id: 'deep-sapphire',
    name: 'Royal Sapphire',
    nameAr: 'أزرق ملكي وياقوتي',
    colors: {
      appBg: '#081426',
      cardBg: '#0f243e',
      sidebarBg: '#0a1a30',
      borderColor: '#1e40af',
      textColor: '#f0f9ff',
      textSecondary: '#7dd3fc',
      accentColor: '#0284c7'
    }
  },
  {
    id: 'cyberpunk-neon',
    name: 'Cyberpunk Neon',
    nameAr: 'نيون بنفسجي سايبر',
    colors: {
      appBg: '#0d0221',
      cardBg: '#190a36',
      sidebarBg: '#12052b',
      borderColor: '#4d1e7c',
      textColor: '#ffffff',
      textSecondary: '#c084fc',
      accentColor: '#ec4899'
    }
  },
  {
    id: 'emerald-royal',
    name: 'Emerald Forest',
    nameAr: 'غابة الزمرد الملكي',
    colors: {
      appBg: '#071e16',
      cardBg: '#0d3224',
      sidebarBg: '#09251b',
      borderColor: '#134e38',
      textColor: '#ecfdf5',
      textSecondary: '#6ee7b7',
      accentColor: '#10b981'
    }
  },
  {
    id: 'ruby-velvet',
    name: 'Ruby Velvet',
    nameAr: 'مخمل أحمر ياقوتي',
    colors: {
      appBg: '#1f0910',
      cardBg: '#2d0f19',
      sidebarBg: '#240b13',
      borderColor: '#5c1d2e',
      textColor: '#fff1f2',
      textSecondary: '#fda4af',
      accentColor: '#e11d48'
    }
  },
  {
    id: 'mocha-espresso',
    name: 'Mocha Espresso',
    nameAr: 'موكا وشوكولاتة دافئة',
    colors: {
      appBg: '#1c1512',
      cardBg: '#2a201b',
      sidebarBg: '#221914',
      borderColor: '#4a372d',
      textColor: '#faf5f0',
      textSecondary: '#d6c2b4',
      accentColor: '#d97706'
    }
  },
  {
    id: 'minimal-titanium',
    name: 'Minimal Titanium',
    nameAr: 'تيتانيوم أحادي أنيق',
    colors: {
      appBg: '#121316',
      cardBg: '#1c1e24',
      sidebarBg: '#16181d',
      borderColor: '#2e323b',
      textColor: '#ffffff',
      textSecondary: '#9ca3af',
      accentColor: '#6366f1'
    }
  }
];

export const THEME_OPTIONS: ThemeOption[] = [
  {
    id: 'dark',
    label: 'Dark Mode',
    description: 'Deep navy & slate contrast, optimized for low light environments',
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
    previewBorder: '#cbd5e1',
    previewAccent: '#2563eb'
  },
  {
    id: 'beige',
    label: 'Warm Desert Beige',
    description: 'Rich warm camel, sand & parchment tones with deep contrast',
    iconName: 'Sparkles',
    previewBg: '#e8decb',
    previewBorder: '#c8b79d',
    previewAccent: '#c25e1a'
  },
  {
    id: 'olive',
    label: 'Olive Tactical & Sage',
    description: 'Luxurious dark military green & sage with vibrant accents',
    iconName: 'Trees',
    previewBg: '#121812',
    previewBorder: '#2d3d2e',
    previewAccent: '#84cc16'
  },
  {
    id: 'gray',
    label: 'Charcoal & Slate Gray',
    description: 'Pure modern graphite and industrial slate monochrome',
    iconName: 'Sliders',
    previewBg: '#16191f',
    previewBorder: '#323846',
    previewAccent: '#38bdf8'
  },
  {
    id: 'custom',
    label: 'Custom Theme Studio',
    description: 'Full creative freedom to define your own hex color palette',
    iconName: 'Palette',
    previewBg: '#0b1329',
    previewBorder: '#223668',
    previewAccent: '#38bdf8'
  }
];

interface ThemeContextValue {
  theme: AppTheme;
  setTheme: (theme: AppTheme) => void;
  isDark: boolean;
  themeOptions: ThemeOption[];
  customColors: CustomThemeColors;
  setCustomColors: (colors: Partial<CustomThemeColors>) => void;
  resetCustomColors: () => void;
  applyPreset: (presetId: string) => void;
  isCustomModalOpen: boolean;
  openCustomModal: () => void;
  closeCustomModal: () => void;
}

const STORAGE_THEME_KEY = 'esaia_theme_preference';
const STORAGE_CUSTOM_COLORS_KEY = 'esaia_custom_theme_colors';

const ThemeContext = createContext<ThemeContextValue | null>(null);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<AppTheme>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_THEME_KEY);
      if (saved && ['dark', 'light', 'beige', 'olive', 'gray', 'custom'].includes(saved)) {
        return saved as AppTheme;
      }
    } catch (e) {
      // ignore
    }
    return 'dark'; // default theme
  });

  const [customColors, setCustomColorsState] = useState<CustomThemeColors>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_CUSTOM_COLORS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...DEFAULT_CUSTOM_COLORS, ...parsed };
      }
    } catch (e) {
      // ignore
    }
    return DEFAULT_CUSTOM_COLORS;
  });

  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);

  const setTheme = (newTheme: AppTheme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem(STORAGE_THEME_KEY, newTheme);
    } catch (e) {
      // ignore
    }
  };

  const setCustomColors = (newColors: Partial<CustomThemeColors>) => {
    setCustomColorsState(prev => {
      const updated = { ...prev, ...newColors };
      try {
        localStorage.setItem(STORAGE_CUSTOM_COLORS_KEY, JSON.stringify(updated));
      } catch (e) {
        // ignore
      }
      return updated;
    });
  };

  const resetCustomColors = () => {
    setCustomColorsState(DEFAULT_CUSTOM_COLORS);
    try {
      localStorage.setItem(STORAGE_CUSTOM_COLORS_KEY, JSON.stringify(DEFAULT_CUSTOM_COLORS));
    } catch (e) {
      // ignore
    }
  };

  const applyPreset = (presetId: string) => {
    const found = CUSTOM_PRESETS.find(p => p.id === presetId);
    if (found) {
      setCustomColorsState(found.colors);
      try {
        localStorage.setItem(STORAGE_CUSTOM_COLORS_KEY, JSON.stringify(found.colors));
      } catch (e) {
        // ignore
      }
      setTheme('custom');
    }
  };

  const applyThemeToDOM = (t: AppTheme, colors: CustomThemeColors) => {
    const root = document.documentElement;
    const body = document.body;

    root.setAttribute('data-theme', t);
    root.classList.remove(
      'theme-dark',
      'theme-light',
      'theme-beige',
      'theme-olive',
      'theme-gray',
      'theme-custom',
      'dark',
      'light'
    );
    root.classList.add(`theme-${t}`);

    if (body) {
      body.setAttribute('data-theme', t);
      body.classList.remove(
        'theme-dark',
        'theme-light',
        'theme-beige',
        'theme-olive',
        'theme-gray',
        'theme-custom',
        'dark',
        'light'
      );
      body.classList.add(`theme-${t}`);
    }

    // Always inject custom theme CSS variables into the root style
    root.style.setProperty('--custom-app-bg', colors.appBg);
    root.style.setProperty('--custom-card-bg', colors.cardBg);
    root.style.setProperty('--custom-sidebar-bg', colors.sidebarBg);
    root.style.setProperty('--custom-border-color', colors.borderColor);
    root.style.setProperty('--custom-text-color', colors.textColor);
    root.style.setProperty('--custom-text-secondary', colors.textSecondary);
    root.style.setProperty('--custom-accent-color', colors.accentColor);

    if (t === 'dark' || t === 'olive' || t === 'gray' || t === 'custom') {
      root.classList.add('dark');
      if (body) body.classList.add('dark');
    } else {
      root.classList.add('light');
      if (body) body.classList.add('light');
    }
  };

  useEffect(() => {
    applyThemeToDOM(theme, customColors);
  }, [theme, customColors]);

  // Sync dynamic custom theme preview swatch in theme options
  const computedThemeOptions = THEME_OPTIONS.map(opt => {
    if (opt.id === 'custom') {
      return {
        ...opt,
        previewBg: customColors.appBg,
        previewBorder: customColors.borderColor,
        previewAccent: customColors.accentColor
      };
    }
    return opt;
  });

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        isDark: theme === 'dark' || theme === 'olive' || theme === 'gray',
        themeOptions: computedThemeOptions,
        customColors,
        setCustomColors,
        resetCustomColors,
        applyPreset,
        isCustomModalOpen,
        openCustomModal: () => setIsCustomModalOpen(true),
        closeCustomModal: () => setIsCustomModalOpen(false)
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
