'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import BottomNav from '@/components/BottomNav';
import { useTheme } from '@/context/ThemeContext';
import { useTranslation } from '@/hooks/useTranslation';

export default function ReportManagement() {
  const router = useRouter();
  const { isLightTheme } = useTheme();
  const { t } = useTranslation();
  const [reports, setReports] = useState({
    daily: false,
    weekly: false,
    monthly: false,
    optimization: false,
  });

  const handleToggle = (reportType: keyof typeof reports) => {
    setReports(prev => ({
      ...prev,
      [reportType]: !prev[reportType]
    }));
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
            {t('settings.reports.title')}
          </h1>
        </div>

        <div className={`rounded-xl divide-y ${isLightTheme ? 'bg-white divide-gray-100' : 'bg-gray-800 divide-gray-700'}`}>
          {/* Daily Report */}
          <div className="p-4 flex items-center justify-between">
            <span className={`${isLightTheme ? 'text-gray-900' : 'text-white'}`}>
              {t('settings.reports.daily')}
            </span>
            <button
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                reports.daily ? 'bg-[#8B5CF6]' : 'bg-gray-200'
              }`}
              onClick={() => handleToggle('daily')}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  reports.daily ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Weekly Report */}
          <div className="p-4 flex items-center justify-between">
            <span className={`${isLightTheme ? 'text-gray-900' : 'text-white'}`}>
              {t('settings.reports.weekly')}
            </span>
            <button
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                reports.weekly ? 'bg-[#8B5CF6]' : 'bg-gray-200'
              }`}
              onClick={() => handleToggle('weekly')}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  reports.weekly ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Monthly Report */}
          <div className="p-4 flex items-center justify-between">
            <span className={`${isLightTheme ? 'text-gray-900' : 'text-white'}`}>
              {t('settings.reports.monthly')}
            </span>
            <button
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                reports.monthly ? 'bg-[#8B5CF6]' : 'bg-gray-200'
              }`}
              onClick={() => handleToggle('monthly')}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  reports.monthly ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Optimization Report */}
          <div className="p-4 flex items-center justify-between">
            <span className={`${isLightTheme ? 'text-gray-900' : 'text-white'}`}>
              {t('settings.reports.optimization')}
            </span>
            <button
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                reports.optimization ? 'bg-[#8B5CF6]' : 'bg-gray-200'
              }`}
              onClick={() => handleToggle('optimization')}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  reports.optimization ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
} 