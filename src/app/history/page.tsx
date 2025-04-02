'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useBalance } from '@/context/BalanceContext';
import { useTheme } from '@/context/ThemeContext';
import BottomNav from '@/components/BottomNav';
import EditTransactionModal from '@/components/EditTransactionModal';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { getUserTransactions, updateTransaction, deleteTransaction } from '@/firebaseConfig';
import type { Transaction } from '@/types';

function HistoryContent() {
  const searchParams = useSearchParams();
  const urlUserId = searchParams.get('userId');
  const { balance, setBalance } = useBalance();
  const { isLightTheme } = useTheme();
  
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [transactionType, setTransactionType] = useState<'all' | 'income' | 'expense'>('all');
  const [period, setPeriod] = useState<'week' | 'month' | 'year' | 'Other period'>('week');
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [startDate, endDate] = dateRange;
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const isLocalhost = window.location.hostname === 'localhost';
        let newUserId = isLocalhost ? 'test-user-123' : urlUserId;
        
        if (!newUserId) {
          newUserId = localStorage.getItem('userId');
        }
        
        if (!newUserId) {
          return;
        }
        
        setUserId(newUserId);
        
        if (!localStorage.getItem('userId')) {
          localStorage.setItem('userId', newUserId);
        }

        const userTransactions = await getUserTransactions(newUserId);
        setTransactions(userTransactions);
      } catch (error) {
        console.error('Error initializing app:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();
  }, [urlUserId]);

  const handleEditTransaction = async (updatedTransaction: Transaction) => {
    try {
      await updateTransaction(updatedTransaction.id, updatedTransaction.amount);
      setTransactions((prev: Transaction[]) => 
        prev.map(t => t.id === updatedTransaction.id ? updatedTransaction : t)
      );
      
      // Update balance
      const oldTransaction = transactions.find(t => t.id === updatedTransaction.id);
      if (oldTransaction) {
        const balanceDiff = updatedTransaction.amount - oldTransaction.amount;
        setBalance(balance + balanceDiff);
      }
    } catch (error) {
      console.error('Error updating transaction:', error);
    }
  };

  const handleDeleteTransaction = async (transactionId: string) => {
    try {
      const transactionToDelete = transactions.find(t => t.id === transactionId);
      if (!transactionToDelete) return;

      await deleteTransaction(transactionId);
      setTransactions(prev => prev.filter(t => t.id !== transactionId));
      setSelectedTransaction(null);
      // Update balance
      setBalance(balance - transactionToDelete.amount);
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  // Filter transactions based on type and period
  const filteredTransactions = transactions.filter(transaction => {
    const matchesType = transactionType === 'all' || 
      (transactionType === 'income' && transaction.amount > 0) ||
      (transactionType === 'expense' && transaction.amount < 0);

    if (!matchesType) return false;

    const transactionDate = new Date(transaction.date);
    const now = new Date();

    switch (period) {
      case 'week':
        const weekAgo = new Date(now.setDate(now.getDate() - 7));
        return transactionDate >= weekAgo;
      case 'month':
        const monthAgo = new Date(now.setMonth(now.getMonth() - 1));
        return transactionDate >= monthAgo;
      case 'year':
        const yearAgo = new Date(now.setFullYear(now.getFullYear() - 1));
        return transactionDate >= yearAgo;
      case 'Other period':
        if (!startDate || !endDate) return true;
        return transactionDate >= startDate && transactionDate <= endDate;
      default:
        return true;
    }
  });

  const groupedTransactions: Record<string, Transaction[]> = filteredTransactions.reduce((groups, transaction) => {
    const date = new Date(transaction.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(transaction);
    return groups;
  }, {} as Record<string, Transaction[]>);

  if (isLoading) {
    return (
      <div className={`min-h-screen pb-20 ${isLightTheme ? 'bg-gray-50' : 'bg-gray-900'} flex items-center justify-center`}>
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-[#8B5CF6] border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen pb-20 ${isLightTheme ? 'bg-gray-50' : 'bg-gray-900'}`}>
      <div className="max-w-md mx-auto px-4 py-8">
        <h1 className={`text-xl font-semibold mb-6 ${isLightTheme ? 'text-gray-800' : 'text-white'}`}>История транзакций</h1>
        
        <div className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <button
              onClick={() => setShowTypeDropdown(!showTypeDropdown)}
              className={`px-4 py-2 rounded-lg text-sm font-medium w-full flex items-center justify-between ${
                transactionType ? 'bg-[#8B5CF6] text-white' : 'bg-white border'
              }`}
            >
              <span>Transaction type</span>
              {transactionType && (
                <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
                  {transactionType}
                </span>
              )}
            </button>
            {showTypeDropdown && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg z-10">
                <button
                  onClick={() => {
                    setTransactionType('all');
                    setShowTypeDropdown(false);
                  }}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50"
                >
                  All
                </button>
                <button
                  onClick={() => {
                    setTransactionType('income');
                    setShowTypeDropdown(false);
                  }}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50"
                >
                  Income
                </button>
                <button
                  onClick={() => {
                    setTransactionType('expense');
                    setShowTypeDropdown(false);
                  }}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50"
                >
                  Expense
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setPeriod('week')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              period === 'week' ? 'bg-[#8B5CF6] text-white' : 'bg-white border'
            }`}
          >
            Week
          </button>
          <button
            onClick={() => setPeriod('month')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              period === 'month' ? 'bg-[#8B5CF6] text-white' : 'bg-white border'
            }`}
          >
            Month
          </button>
          <button
            onClick={() => setPeriod('year')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              period === 'year' ? 'bg-[#8B5CF6] text-white' : 'bg-white border'
            }`}
          >
            Year
          </button>
          <button
            onClick={() => setPeriod('Other period')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              period === 'Other period' ? 'bg-[#8B5CF6] text-white' : 'bg-white border'
            }`}
          >
            Other
          </button>
        </div>

        {period === 'Other period' && (
          <div className="mb-4">
            <DatePicker
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              onChange={(update) => {
                setDateRange(update);
              }}
              isClearable={true}
              placeholderText="Select date range"
              className="w-full px-4 py-2 rounded-lg text-sm font-medium border focus:outline-none focus:ring-2 focus:ring-purple-500"
              wrapperClassName="w-full"
              dateFormat="MMM d, yyyy"
              maxDate={new Date()}
            />
          </div>
        )}

        <div className="space-y-6">
          {Object.entries(groupedTransactions).map(([date, dateTransactions]) => (
            <div key={date}>
              <h2 className="text-sm font-medium text-gray-500 mb-3">{date}</h2>
              <div className="space-y-2">
                {dateTransactions.map((transaction: Transaction) => (
                  <div
                    key={transaction.id}
                    onClick={() => setSelectedTransaction(transaction)}
                    className={`flex items-center justify-between p-4 rounded-xl cursor-pointer ${
                      isLightTheme 
                        ? 'bg-gray-50 hover:bg-gray-100' 
                        : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: transaction.color }}
                      >
                        <span className="text-white font-medium">
                          {transaction.category.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className={`font-medium ${isLightTheme ? 'text-gray-800' : 'text-white'}`}>{transaction.category}</p>
                      </div>
                    </div>
                    <p className={`font-semibold ${
                      transaction.amount < 0 ? 'text-red-500' : 'text-green-500'
                    } ${isLightTheme ? 'text-gray-800' : 'text-gray-400'}`}>
                      {transaction.amount < 0 ? '-' : '+'}${Math.abs(transaction.amount).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />

      {selectedTransaction && (
        <EditTransactionModal
          isOpen={true}
          onClose={() => setSelectedTransaction(null)}
          transaction={selectedTransaction}
          onEdit={handleEditTransaction}
          onDelete={handleDeleteTransaction}
        />
      )}
    </div>
  );
}

export default function History() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-[#8B5CF6] border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    }>
      <HistoryContent />
    </Suspense>
  );
} 