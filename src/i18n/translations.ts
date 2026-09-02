/**
 * ESAIA - Enterprise Multi-Language Translation Dictionaries
 * Supports 10 languages: en, ar (RTL), zh, fr, de, es, it, tr, ja, ru
 */

import { SupportedLanguage, TranslationSchema, SUPPORTED_LANGUAGES, LanguageInfo } from './types';
import { en } from './locales/en';
import { ar } from './locales/ar';
import { zh } from './locales/zh';
import { fr } from './locales/fr';
import { de } from './locales/de';
import { es } from './locales/es';
import { it } from './locales/it';
import { tr } from './locales/tr';
import { ja } from './locales/ja';
import { ru } from './locales/ru';

export type { SupportedLanguage, TranslationSchema, LanguageInfo };
export { SUPPORTED_LANGUAGES };

export const translations: Record<SupportedLanguage, TranslationSchema> = {
  en,
  ar,
  zh,
  fr,
  de,
  es,
  it,
  tr,
  ja,
  ru
};
