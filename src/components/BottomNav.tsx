'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import { useTranslation } from '@/hooks/useTranslation';

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();
  const { isLightTheme } = useTheme();
  const { t } = useTranslation();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className={`fixed bottom-0 left-0 right-0 ${isLightTheme ? 'bg-white' : 'bg-gray-800'} border-t ${isLightTheme ? 'border-gray-200' : 'border-gray-700'}`}>
      <div className="max-w-md mx-auto px-4">
        <div className="flex justify-around items-center h-16">
          <button
            onClick={() => router.push('/')}
            className={`flex flex-col items-center ${
              isActive('/') ? 'text-[#8B5CF6]' : isLightTheme ? 'text-gray-500' : 'text-gray-400'
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-xs mt-1">{t('navigation.home')}</span>
          </button>

          <button
            onClick={() => router.push('/analytics')}
            className={`flex flex-col items-center ${
              isActive('/analytics') ? 'text-[#8B5CF6]' : isLightTheme ? 'text-gray-500' : 'text-gray-400'
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <span className="text-xs mt-1">{t('navigation.analytics')}</span>
          </button>

          <button
            onClick={() => router.push('/history')}
            className={`flex flex-col items-center ${
              isActive('/history') ? 'text-[#8B5CF6]' : isLightTheme ? 'text-gray-500' : 'text-gray-400'
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-xs mt-1">{t('navigation.history')}</span>
          </button>

          <button
            onClick={() => router.push('/settings')}
            className={`flex flex-col items-center ${
              isActive('/settings') ? 'text-[#8B5CF6]' : isLightTheme ? 'text-gray-500' : 'text-gray-400'
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-xs mt-1">{t('navigation.settings')}</span>
          </button>
        </div>
      </div>
    </nav>
  );
} 