'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function BottomNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');

  const isActive = (path: string) => pathname === path;

  const getLinkWithUserId = (path: string) => {
    return userId ? `${path}?userId=${userId}` : path;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-center bg-transparent">
      <nav className="max-w-md w-full bg-white border-t border-gray-200">
        <div className="flex justify-between items-center px-6 py-2">
          <Link href={getLinkWithUserId('/analytics')} className="flex flex-col items-center py-2">
            <svg
              className={`w-6 h-6 ${isActive('/analytics') ? 'text-[#8B5CF6]' : 'text-gray-400'}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 13v-1m4 1v-3m4 3V8M12 21l9-9-9-9-9 9 9 9z"
              />
            </svg>
            <span className={`text-xs mt-1 ${isActive('/analytics') ? 'text-[#8B5CF6]' : 'text-gray-400'}`}>
              Analytics
            </span>
          </Link>

          <Link href={getLinkWithUserId('/')} className="flex flex-col items-center py-2">
            <svg
              className={`w-6 h-6 ${isActive('/') ? 'text-[#8B5CF6]' : 'text-gray-400'}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span className={`text-xs mt-1 ${isActive('/') ? 'text-[#8B5CF6]' : 'text-gray-400'}`}>
              Home
            </span>
          </Link>

          <Link href={getLinkWithUserId('/history')} className="flex flex-col items-center py-2">
            <svg
              className={`w-6 h-6 ${isActive('/history') ? 'text-[#8B5CF6]' : 'text-gray-400'}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className={`text-xs mt-1 ${isActive('/history') ? 'text-[#8B5CF6]' : 'text-gray-400'}`}>
              History
            </span>
          </Link>

          <Link href={getLinkWithUserId('/settings')} className="flex flex-col items-center py-2">
            <svg
              className={`w-6 h-6 ${isActive('/settings') ? 'text-[#8B5CF6]' : 'text-gray-400'}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className={`text-xs mt-1 ${isActive('/settings') ? 'text-[#8B5CF6]' : 'text-gray-400'}`}>
              Settings
            </span>
          </Link>
        </div>
      </nav>
    </div>
  );
} 