'use client';

import { Suspense } from 'react';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import BottomNav from '@/components/BottomNav';
import { useTheme } from '@/context/ThemeContext';
import { useTranslation } from '@/hooks/useTranslation';
import { getUserReportsSettings, updateUserReportsSettings, UserReportsSettings } from '../../../firebaseConfig';

const ReportManagementContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');

  const { isLightTheme } = useTheme();
  const { t } = useTranslation();

  const [reports, setReports] = useState({
    daily: false,
    weekly: false,
    monthly: false,
    optimization: false,
  });

  // Загружаем текущие настройки из Firestore
  useEffect(() => {
    if (!userId) return;

    const fetchSettings = async () => {
      const settings = await getUserReportsSettings(userId);
      if (settings) {
        setReports(settings);
      }
    };

    fetchSettings();
  }, [userId]);

  // Обновляем Firestore при каждом изменении toggle
  const handleToggle = async (reportType: keyof typeof reports) => {
    const updated = {
      ...reports,
      [reportType]: !reports[reportType],
    };
    setReports(updated);

    if (userId) {
      await updateUserReportsSettings(userId, updated);
    }
  };

  const containerClass = `min-h-screen pb-20 ${isLightTheme ? 'bg-gray-50' : 'bg-gray-900'}`;
  const textClass = isLightTheme ? 'text-gray-900' : 'text-white';
  const cardClass = `rounded-xl divide-y ${isLightTheme ? 'bg-white divide-gray-100' : 'bg-gray-800 divide-gray-700'}`;

  return (
    <div className={containerClass}>
      <div className="max-w-md mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <button onClick={() => router.back()} className="mr-4">
            <svg
              className={`w-6 h-6 ${textClass}`}
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
          <h1 className={`text-xl font-semibold ${textClass}`}>
            {t('settings.reports.title')}
          </h1>
        </div>

        <div className={cardClass}>
          {(['daily', 'weekly', 'monthly', 'optimization'] as const).map((type) => (
            <div key={type} className="p-4 flex items-center justify-between">
              <span className={textClass}>
                {t(`settings.reports.${type}`)}
              </span>
              <button
                onClick={() => handleToggle(type)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                  reports[type] ? 'bg-[#8B5CF6]' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    reports[type] ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default function ReportManagement() {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <ReportManagementContent />
    </Suspense>
  );
}

