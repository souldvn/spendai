'use client';

import { createContext, useContext, useState, useEffect } from 'react';

type ThemeContextType = {
  isLightTheme: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isLightTheme, setIsLightTheme] = useState(true);

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsLightTheme(savedTheme === 'light');
    }
  }, []);

  const toggleTheme = () => {
    setIsLightTheme(prev => {
      const newTheme = !prev;
      localStorage.setItem('theme', newTheme ? 'light' : 'dark');
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ isLightTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
} 