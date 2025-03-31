'use client';

import { useState, useEffect, Suspense } from 'react';
import { 
  Transaction, 
  getUserTransactions,
  updateTransaction,
  deleteTransaction
} from '@/firebaseConfig';
import BottomNav from '@/components/BottomNav';
import { useSearchParams } from 'next/navigation';
import { EditTransactionModal } from '@/components/EditTransactionModal';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

function HistoryContent() {
  const searchParams = useSearchParams();
  const urlUserId = searchParams.get('userId');
  
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [transactionType, setTransactionType] = useState<'Expenses' | 'Income' | null>(null);
  const [period, setPeriod] = useState<string>('');
  const [showPeriodDropdown, setShowPeriodDropdown] = useState(false);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [startDate, endDate] = dateRange;

  useEffect(() => {
    const initializeTransactions = async () => {
      const isLocalhost = window.location.hostname === 'localhost';
      const userId = isLocalhost ? 'test-user-123' : urlUserId;
      
      if (userId) {
        const userTransactions = await getUserTransactions(userId);
        setTransactions(userTransactions);
      }
    };

    initializeTransactions();
  }, [urlUserId]);

  const handleEditTransaction = async (transactionId: string, newAmount: number) => {
    try {
      await updateTransaction(transactionId, newAmount);
      setTransactions(prev => 
        prev.map(t => t.id === transactionId ? { ...t, amount: newAmount } : t)
      );
      setSelectedTransaction(null);
    } catch (error) {
      console.error('Error updating transaction:', error);
    }
  };

  const handleDeleteTransaction = async (transactionId: string) => {
    try {
      await deleteTransaction(transactionId);
      setTransactions(prev => prev.filter(t => t.id !== transactionId));
      setSelectedTransaction(null);
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  const handlePeriodSelect = (selectedPeriod: string) => {
    setPeriod(selectedPeriod);
    setShowPeriodDropdown(false);
    
    const today = new Date();
    let start = new Date();
    let end = new Date();

    if (selectedPeriod === 'Week') {
      start.setDate(today.getDate() - 7);
    } else if (selectedPeriod === 'Month') {
      start.setMonth(today.getMonth() - 1);
    } else {
      // For "Other period", we'll show the date picker
      return;
    }

    setDateRange([start, end]);
  };

  const filteredTransactions = transactions.filter(transaction => {
    // Filter by transaction type
    if (transactionType === 'Expenses' && transaction.amount > 0) return false;
    if (transactionType === 'Income' && transaction.amount < 0) return false;

    // Filter by date range
    if (startDate && endDate) {
      const transactionDate = new Date(transaction.date);
      // Set hours to 0 for start date and 23:59:59 for end date
      const start = new Date(startDate.setHours(0, 0, 0, 0));
      const end = new Date(endDate.setHours(23, 59, 59, 999));
      return transactionDate >= start && transactionDate <= end;
    }

    return true;
  });

  const groupedTransactions = filteredTransactions.reduce((groups, transaction) => {
    const date = new Date(transaction.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(transaction);
    return groups;
  }, {} as Record<string, Transaction[]>);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-md mx-auto px-4 py-8">
        <h1 className="text-xl font-semibold mb-6">История транзакций</h1>
        
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
              <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border z-10">
                <button
                  onClick={() => {
                    setTransactionType('Expenses');
                    setShowTypeDropdown(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-50"
                >
                  Expenses
                </button>
                <button
                  onClick={() => {
                    setTransactionType('Income');
                    setShowTypeDropdown(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-50"
                >
                  Income
                </button>
                <button
                  onClick={() => {
                    setTransactionType(null);
                    setShowTypeDropdown(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-50 border-t"
                >
                  All transactions
                </button>
              </div>
            )}
          </div>

          <div className="relative flex-1">
            <button
              onClick={() => setShowPeriodDropdown(!showPeriodDropdown)}
              className={`px-4 py-2 rounded-lg text-sm font-medium w-full bg-white border flex items-center justify-between ${
                period ? 'text-gray-900' : 'text-gray-500'
              }`}
            >
              <span>{period || 'Period'}</span>
            </button>
            {showPeriodDropdown && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border z-10">
                <button
                  onClick={() => handlePeriodSelect('Week')}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-50"
                >
                  Week
                </button>
                <button
                  onClick={() => handlePeriodSelect('Month')}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-50"
                >
                  Month
                </button>
                <button
                  onClick={() => {
                    setPeriod('Other period');
                    setShowPeriodDropdown(false);
                    setDateRange([null, null]);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-50"
                >
                  Other period
                </button>
              </div>
            )}
          </div>
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
                {dateTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    onClick={() => setSelectedTransaction(transaction)}
                    className="flex items-center justify-between p-4 bg-white rounded-xl cursor-pointer hover:bg-gray-50 transition-colors"
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
                        <p className="font-medium text-gray-900">{transaction.category}</p>
                      </div>
                    </div>
                    <p className={`font-semibold ${transaction.amount < 0 ? 'text-red-500' : 'text-green-500'}`}>
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
    <Suspense fallback={<div>Loading...</div>}>
      <HistoryContent />
    </Suspense>
  );
} 