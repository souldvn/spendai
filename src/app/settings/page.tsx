'use client';

import { useRouter } from 'next/navigation';
import BottomNav from '@/components/BottomNav';
import { useTheme } from '@/context/ThemeContext';

export default function Settings() {
  const router = useRouter();
  const { isLightTheme, toggleTheme } = useTheme();

  return (
    <div className={`min-h-screen pb-20 ${isLightTheme ? 'bg-gray-50' : 'bg-gray-900'}`}>
      <div className="max-w-md mx-auto px-4 py-8">
        <h1 className={`text-xl font-semibold mb-6 ${isLightTheme ? 'text-gray-900' : 'text-white'}`}>Settings</h1>

        <div className={`rounded-xl divide-y ${isLightTheme ? 'bg-white divide-gray-100' : 'bg-gray-800 divide-gray-700'}`}>
          {/* Report Management */}
          <div 
            className={`p-4 flex items-center justify-between cursor-pointer ${
              isLightTheme ? 'hover:bg-gray-50' : 'hover:bg-gray-700'
            }`}
            onClick={() => router.push('/settings/reports')}
          >
            <span className={`${isLightTheme ? 'text-gray-900' : 'text-white'}`}>Report Management</span>
            <svg 
              className="w-5 h-5 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 5l7 7-7 7" 
              />
            </svg>
          </div>

          {/* Language */}
          <div 
            className={`p-4 flex items-center justify-between cursor-pointer ${
              isLightTheme ? 'hover:bg-gray-50' : 'hover:bg-gray-700'
            }`}
            onClick={() => router.push('/settings/language')}
          >
            <span className={`${isLightTheme ? 'text-gray-900' : 'text-white'}`}>Language</span>
            <svg 
              className="w-5 h-5 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 5l7 7-7 7" 
              />
            </svg>
          </div>

          {/* Light Theme Toggle */}
          <div className="p-4 flex items-center justify-between">
            <span className={`${isLightTheme ? 'text-gray-900' : 'text-white'}`}>Light Theme</span>
            <button
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                isLightTheme ? 'bg-[#8B5CF6]' : 'bg-gray-200'
              }`}
              onClick={toggleTheme}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isLightTheme ? 'translate-x-6' : 'translate-x-1'
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