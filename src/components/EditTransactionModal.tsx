'use client';

import { useState, useEffect } from 'react';
import { Transaction } from '@/types';
import { updateTransaction, deleteTransaction } from '@/lib/firebaseConfig';
import { useTheme } from '@/context/ThemeContext';
import { useBalance } from '@/context/BalanceContext';
import { useCurrency } from '@/context/CurrencyContext';
import { useTranslation } from '@/hooks/useTranslation';

interface EditTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: Transaction;
  onEdit: (transaction: Transaction) => void;
  onDelete: (transactionId: string) => void;
}

export default function EditTransactionModal({
  isOpen,
  onClose,
  transaction,
  onEdit,
  onDelete,
}: EditTransactionModalProps) {
  const [amount, setAmount] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const { isLightTheme } = useTheme();
  const { balance, setBalance } = useBalance();
  const { convertAmount, convertToUSD, getCurrencySymbol } = useCurrency();
  const { t } = useTranslation();

  // Initialize amount in current currency
  useEffect(() => {
    if (isOpen) {
      const amountInCurrentCurrency = convertAmount(Math.abs(transaction.amount));
      setAmount(amountInCurrentCurrency.toString());
    }
  }, [isOpen, transaction.amount, convertAmount]);

  const handleSave = async () => {
    try {
      // Convert from current currency to USD
      const amountInUSD = convertToUSD(Number(amount));
      const newAmount = transaction.amount < 0 ? -amountInUSD : amountInUSD;
      
      await updateTransaction(transaction.id, newAmount);
      onEdit({ ...transaction, amount: newAmount });
      
      // Update balance in context
      const amountDiff = newAmount - transaction.amount;
      setBalance(balance + amountDiff);
      onClose();
    } catch (error) {
      console.error('Error updating transaction:', error);
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only numbers and one decimal point
    if (/^\d*\.?\d{0,2}$/.test(value) || value === '') {
      setAmount(value);
    }
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      // Call onDelete before closing
      onDelete(transaction.id);
      onClose();
    } catch (error) {
      console.error('Error deleting transaction:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className={`${isLightTheme ? 'bg-white' : 'bg-gray-800'} rounded-2xl p-6 w-full max-w-md relative`}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <h2 className={`text-xl font-semibold mb-4 ${isLightTheme ? 'text-gray-800' : 'text-white'}`}>
          {t('common.editTransaction')}
        </h2>
        
        <div className="mb-4">
          <label className={`block text-sm font-medium mb-1 ${isLightTheme ? 'text-gray-700' : 'text-gray-300'}`}>
            {t('common.amount')}
          </label>
          <div className="relative">
            <span className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isLightTheme ? 'text-gray-500' : 'text-gray-400'}`}>
              {getCurrencySymbol()}
            </span>
            <input
              type="text"
              value={amount}
              onChange={handleAmountChange}
              className={`pl-8 pr-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                isLightTheme 
                  ? 'bg-white border text-gray-900' 
                  : 'bg-gray-700 border-gray-600 text-white'
              }`}
              placeholder="0.00"
              inputMode="decimal"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="flex-1 bg-[#8B5CF6] text-white py-2 rounded-lg hover:bg-[#7C3AED] transition-colors"
          >
            {t('common.save')}
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
          >
            {isDeleting ? t('common.deleting') : t('common.delete')}
          </button>
        </div>
      </div>
    </div>
  );
} 