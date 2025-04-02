'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { getUserBalance, updateUserBalance } from '@/firebaseConfig';

interface BalanceContextType {
  balance: number;
  setBalance: (balance: number) => void;
  isLoading: boolean;
}

const BalanceContext = createContext<BalanceContextType | undefined>(undefined);

export function BalanceProvider({ children }: { children: React.ReactNode }) {
  const [balance, setBalance] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  // Get userId from localStorage
  useEffect(() => {
    const savedUserId = localStorage.getItem('userId');
    if (savedUserId) {
      setUserId(savedUserId);
    }
  }, []);

  // Load balance from Firebase when userId is available
  useEffect(() => {
    async function loadBalance() {
      if (!userId) return;
      
      try {
        const userBalance = await getUserBalance(userId);
        setBalance(userBalance);
      } catch (error) {
        console.error('Error loading balance:', error);
        setBalance(0);
      } finally {
        setIsLoading(false);
      }
    }

    loadBalance();
  }, [userId]);

  const handleSetBalance = async (newBalance: number) => {
    if (!userId) return;
    
    try {
      await updateUserBalance(userId, newBalance);
      setBalance(newBalance);
    } catch (error) {
      console.error('Error updating balance:', error);
    }
  };

  return (
    <BalanceContext.Provider value={{ balance, setBalance: handleSetBalance, isLoading }}>
      {children}
    </BalanceContext.Provider>
  );
}

export function useBalance() {
  const context = useContext(BalanceContext);
  if (context === undefined) {
    throw new Error('useBalance must be used within a BalanceProvider');
  }
  return context;
} 