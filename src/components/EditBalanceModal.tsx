'use client';

import React, { useState, useEffect } from 'react';
import { useCurrency } from '@/context/CurrencyContext';
import { updateTransaction } from '@/firebaseConfig';

interface EditBalanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentBalance: number;
  onSave: (newBalance: number) => void;
  transactions: any[];
}

export function EditBalanceModal({
  isOpen,
  onClose,
  currentBalance,
  onSave,
  transactions,
}: EditBalanceModalProps) {
  const [balance, setBalance] = useState('');
  const { currency, setCurrency, convertAmount, convertToUSD, getCurrencySymbol, exchangeRates, isLoading, error } = useCurrency();

  useEffect(() => {
    if (isOpen) {
      // Convert the USD balance to current currency for display
      const convertedBalance = convertAmount(currentBalance);
      console.log('Setting initial balance:', convertedBalance, 'in', currency);
      setBalance(convertedBalance.toString());
    }
  }, [currency, currentBalance, convertAmount, isOpen]);

  const handleSubmit = async () => {
    const newBalance = parseFloat(balance);
    if (!isNaN(newBalance)) {
      console.log('Saving balance:', newBalance, 'in', currency, 'with rate:', exchangeRates[currency]);
      // Convert from current currency to USD
      const amountInUSD = convertToUSD(newBalance);
      console.log('Converted to USD:', amountInUSD);
      onSave(amountInUSD);
      onClose();
    }
  };

  const handleCurrencyChange = async (newCurrency: 'USD' | 'RUB') => {
    console.log('Changing currency from', currency, 'to', newCurrency);
    // Update currency in context (which will save to Firebase)
    setCurrency(newCurrency);
    
    // Update all transactions to reflect the new currency
    if (transactions && transactions.length > 0) {
      try {
        // Transactions are already stored in USD, no need to convert
        for (const transaction of transactions) {
          console.log('Transaction amount in USD:', transaction.amount);
          // No need to update transaction amounts as they are stored in USD
        }
      } catch (error) {
        console.error('Error updating transactions:', error);
      }
    }

    // Update the displayed balance
    const newBalance = convertAmount(currentBalance);
    console.log('Updating displayed balance to:', newBalance, 'in', newCurrency);
    setBalance(newBalance.toString());
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center">
      <div className="bg-white w-full max-w-md rounded-t-3xl">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Edit Balance</h2>
            <button onClick={onClose} className="text-gray-400">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Currency
            </label>
            <select
              value={currency}
              onChange={(e) => handleCurrencyChange(e.target.value as 'USD' | 'RUB')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent"
            >
              <option value="USD">USD ($)</option>
              <option value="RUB">RUB (₽)</option>
            </select>
            {isLoading && (
              <p className="mt-1 text-sm text-gray-500">Updating exchange rates...</p>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Balance
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                {getCurrencySymbol()}
              </span>
              <input
                type="number"
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
                className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent"
                placeholder="0.00"
                step="0.01"
              />
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-[#8B5CF6] text-white py-3 rounded-lg font-medium hover:bg-[#7C4DEF] transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
} 