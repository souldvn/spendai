'use client';

import { ThemeProvider } from '@/context/ThemeContext';
import { BalanceProvider } from "@/context/BalanceContext";
import { LanguageProvider } from '@/context/LanguageContext';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <BalanceProvider>
          <div className="max-w-md mx-auto min-h-screen bg-gray-50">
            {children}
          </div>
        </BalanceProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
} 