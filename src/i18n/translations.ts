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

function deepMerge<T>(target: any, source: any): T {
  if (!source) return target;
  const output = { ...target };
  for (const key of Object.keys(source)) {
    if (
      source[key] &&
      typeof source[key] === 'object' &&
      !Array.isArray(source[key]) &&
      target[key] &&
      typeof target[key] === 'object' &&
      !Array.isArray(target[key])
    ) {
      output[key] = deepMerge(target[key], source[key]);
    } else if (source[key] !== undefined) {
      output[key] = source[key];
    }
  }
  return output;
}

export const translations: Record<SupportedLanguage, TranslationSchema> = {
  en,
  ar: deepMerge<TranslationSchema>(en, ar),
  zh: deepMerge<TranslationSchema>(en, zh),
  fr: deepMerge<TranslationSchema>(en, fr),
  de: deepMerge<TranslationSchema>(en, de),
  es: deepMerge<TranslationSchema>(en, es),
  it: deepMerge<TranslationSchema>(en, it),
  tr: deepMerge<TranslationSchema>(en, tr),
  ja: deepMerge<TranslationSchema>(en, ja),
  ru: deepMerge<TranslationSchema>(en, ru)
};
