'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import BottomNav from '@/components/BottomNav';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { useTranslation } from '@/hooks/useTranslation';

export default function LanguageSettings() {
  const router = useRouter();
  const { isLightTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'ru'>(language);

  useEffect(() => {
    setSelectedLanguage(language);
  }, [language]);

  const handleLanguageChange = (newLanguage: 'en' | 'ru') => {
    setSelectedLanguage(newLanguage);
    setLanguage(newLanguage);
  };

  return (
    <div className={`min-h-screen pb-20 ${isLightTheme ? 'bg-gray-50' : 'bg-gray-900'}`}>
      <div className="max-w-md mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <button 
            onClick={() => router.back()}
            className="mr-4"
          >
            <svg 
              className={`w-6 h-6 ${isLightTheme ? 'text-gray-900' : 'text-white'}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 19l-7-7 7-7" 
              />
            </svg>
          </button>
          <h1 className={`text-xl font-semibold ${isLightTheme ? 'text-gray-900' : 'text-white'}`}>
            {t('settings.language')}
          </h1>
        </div>

        <div className={`rounded-xl divide-y ${isLightTheme ? 'bg-white divide-gray-100' : 'bg-gray-800 divide-gray-700'}`}>
          {/* Russian */}
          <div 
            className={`p-4 flex items-center justify-between cursor-pointer ${
              isLightTheme ? 'hover:bg-gray-50' : 'hover:bg-gray-700'
            }`}
            onClick={() => handleLanguageChange('ru')}
          >
            <span className={`${isLightTheme ? 'text-gray-900' : 'text-white'}`}>
              {t('settings.languages.ru')}
            </span>
            <div className={`w-5 h-5 rounded-full border-2 border-[#8B5CF6] flex items-center justify-center ${
              isLightTheme ? 'bg-white' : 'bg-gray-800'
            }`}>
              {selectedLanguage === 'ru' && (
                <div className="w-3 h-3 rounded-full bg-[#8B5CF6]" />
              )}
            </div>
          </div>

          {/* English */}
          <div 
            className={`p-4 flex items-center justify-between cursor-pointer ${
              isLightTheme ? 'hover:bg-gray-50' : 'hover:bg-gray-700'
            }`}
            onClick={() => handleLanguageChange('en')}
          >
            <span className={`${isLightTheme ? 'text-gray-900' : 'text-white'}`}>
              {t('settings.languages.en')}
            </span>
            <div className={`w-5 h-5 rounded-full border-2 border-[#8B5CF6] flex items-center justify-center ${
              isLightTheme ? 'bg-white' : 'bg-gray-800'
            }`}>
              {selectedLanguage === 'en' && (
                <div className="w-3 h-3 rounded-full bg-[#8B5CF6]" />
              )}
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
} 