'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { getUserSettings, updateUserSettings } from '@/lib/firebaseConfig';

type Currency = 'USD' | 'RUB';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  convertAmount: (amount: number) => number;
  convertToUSD: (amount: number) => number;
  getCurrencySymbol: () => string;
  exchangeRates: Record<Currency, number>;
  isLoading: boolean;
  error: string | null;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

// Initial exchange rates (will be updated from API)
const initialExchangeRates = {
  USD: 1,
  RUB: 90,
};

// API key for exchangerate-api.com
const API_KEY = '0d2f54a752b9241693a52b4a';

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<Currency>('USD');
  const [exchangeRates, setExchangeRates] = useState<Record<Currency, number>>(initialExchangeRates);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  // Get userId from localStorage
  useEffect(() => {
    const savedUserId = localStorage.getItem('userId');
    if (savedUserId) {
      setUserId(savedUserId);
    }
  }, []);

  // Load user settings and currency from Firebase
  useEffect(() => {
    async function loadUserSettings() {
      if (!userId) return;
      
      try {
        const settings = await getUserSettings(userId);
        if (settings?.defaultCurrency) {
          setCurrency(settings.defaultCurrency);
        }
      } catch (error) {
        console.error('Error loading user settings:', error);
      }
    }

    loadUserSettings();
  }, [userId]);

  // Fetch exchange rates from API
  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/USD?api_key=${API_KEY}`);
        const data = await response.json();
        
        if (data.rates) {
          const newRates = {
            USD: 1,
            RUB: data.rates.RUB,
          };
          console.log('Fetched exchange rates:', newRates);
          setExchangeRates(newRates);
        }
      } catch (err) {
        console.error('Error fetching exchange rates:', err);
        setError('Failed to fetch exchange rates. Using default rates.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchExchangeRates();
    
    const interval = setInterval(fetchExchangeRates, 3600000);
    return () => clearInterval(interval);
  }, []);

  const handleSetCurrency = useCallback(async (newCurrency: Currency) => {
    console.log('Setting currency to:', newCurrency);
    setCurrency(newCurrency);
    if (userId) {
      try {
        await updateUserSettings(userId, { defaultCurrency: newCurrency });
      } catch (error) {
        console.error('Error updating user settings:', error);
      }
    }
  }, [userId]);

  const convertAmount = useCallback((amount: number) => {
    console.log('Converting amount:', amount, 'from USD to', currency, 'with rate:', exchangeRates[currency]);
    // Convert from USD to target currency
    return amount * exchangeRates[currency];
  }, [currency, exchangeRates]);

  const convertToUSD = useCallback((amount: number) => {
    console.log('Converting amount:', amount, 'from', currency, 'to USD with rate:', exchangeRates[currency]);
    // Convert from target currency to USD
    return amount / exchangeRates[currency];
  }, [currency, exchangeRates]);

  const getCurrencySymbol = useCallback(() => {
    switch (currency) {
      case 'USD':
        return '$';
      case 'RUB':
        return '₽';
      default:
        return '$';
    }
  }, [currency]);

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency: handleSetCurrency,
        convertAmount,
        convertToUSD,
        getCurrencySymbol,
        exchangeRates,
        isLoading,
        error,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
} 