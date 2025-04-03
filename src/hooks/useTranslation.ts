'use client';

import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/translations';

export function useTranslation() {
  const { language } = useLanguage();

  const t = (key: string, params?: Record<string, string>) => {
    const keys = key.split('.');
    let value: any = translations[language];

    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) {
        console.warn(`Translation key "${key}" not found for language "${language}"`);
        return key;
      }
    }

    if (params) {
      return Object.entries(params).reduce(
        (str, [key, val]) => str.replace(`{{${key}}}`, val),
        value
      );
    }

    return value;
  };

  return { t };
} 