'use client';

import { useState, useEffect, Suspense } from 'react';
import { AddTransaction } from '@/components/AddTransaction';
import EditTransactionModal from '@/components/EditTransactionModal';
import { EditBalanceModal } from '@/components/EditBalanceModal';
import BottomNav from '@/components/BottomNav';
import ExpenseChart from '@/components/ExpenseChart';
import BarChart from '@/components/BarChart';
import { addTransaction as addTransactionToFirebase, getUserTransactions, updateTransaction, deleteTransaction } from '@/firebaseConfig';
import type { Transaction } from '@/types';
import { useSearchParams, useRouter } from 'next/navigation';
import { useBalance } from '@/context/BalanceContext';
import { useTheme } from '@/context/ThemeContext';

const barChartData = [
  { name: 'Пн', amount: 45000 },
  { name: 'Вт', amount: 35000 },
  { name: 'Ср', amount: 55000 },
  { name: 'Чт', amount: 40000 },
  { name: 'Пт', amount: 65000 },
  { name: 'Сб', amount: 50000 },
  { name: 'Вс', amount: 45000 },
];

function HomeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const urlUserId = searchParams.get('userId');
  const { balance, setBalance, isLoading: isBalanceLoading } = useBalance();
  const { isLightTheme } = useTheme();
  
  const [activeChart, setActiveChart] = useState<'pie' | 'bar'>('pie');
  const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false);
  const [isEditBalanceOpen, setIsEditBalanceOpen] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Determine if we're on localhost and set the appropriate userId
        const isLocalhost = window.location.hostname === 'localhost';
        let newUserId = isLocalhost ? 'test-user-123' : urlUserId;
        
        // If no userId in URL, try to get from localStorage
        if (!newUserId) {
          newUserId = localStorage.getItem('userId');
        }
        
        // If still no userId, redirect to error page
        if (!newUserId) {
          router.push('/error?message=Please open this app from Telegram');
          return;
        }
        
        setUserId(newUserId);
        
        // Save userId to localStorage if it's not already there
        if (!localStorage.getItem('userId')) {
          localStorage.setItem('userId', newUserId);
        }

        const userTransactions = await getUserTransactions(newUserId);
        setTransactions(userTransactions);
      } catch (error) {
        console.error('Error initializing app:', error);
        router.push('/error?message=Failed to load transactions');
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();
  }, [urlUserId, router]);

  const handleAddTransaction = async (category: string, amount: number, color: string) => {
    if (!userId) return;

    try {
      await addTransactionToFirebase(userId, amount, category, color);
      const userTransactions = await getUserTransactions(userId);
      setTransactions(userTransactions);
      // Update balance immediately
      setBalance(balance + amount);
      setIsAddTransactionOpen(false);
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  const handleEditTransaction = async (updatedTransaction: Transaction) => {
    try {
      await updateTransaction(updatedTransaction.id, updatedTransaction.amount);
      setTransactions(prev => 
        prev.map(t => t.id === updatedTransaction.id ? updatedTransaction : t)
      );
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

  // Group transactions by category and sum amounts
  const expensesByCategory = transactions
    .filter(transaction => transaction.amount < 0) // Only include expenses
    .reduce((acc: { category: string; amount: number; color: string }[], transaction) => {
      const existing = acc.find(e => e.category === transaction.category);
      if (existing) {
        existing.amount += Math.abs(transaction.amount); // Use absolute value for chart
      } else {
        acc.push({
          category: transaction.category,
          amount: Math.abs(transaction.amount), // Use absolute value for chart
          color: transaction.color
        });
      }
      return acc;
    }, []);

  // Group transactions by date for bar chart
  const transactionsByDate = transactions
    .filter(transaction => transaction.amount < 0) // Only include expenses
    .reduce((acc: { name: string; amount: number; color: string }[], transaction) => {
      const date = new Date(transaction.date);
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
      const existing = acc.find(d => d.name === dayName);
      if (existing) {
        existing.amount += Math.abs(transaction.amount);
      } else {
        acc.push({
          name: dayName,
          amount: Math.abs(transaction.amount),
          color: transaction.color
        });
      }
      return acc;
    }, []);

  // Sort by day of week
  const sortedTransactionsByDate = transactionsByDate.sort((a: { name: string }, b: { name: string }) => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days.indexOf(a.name) - days.indexOf(b.name);
  });

  const handleEditBalance = (newBalance: number) => {
    setBalance(newBalance);
  };

  // Calculate total from transactions
  const transactionsTotal = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
  
  // If manual balance is set, use it directly
  // If not set, use transactions total
  const totalExpenses = balance !== null ? balance : transactionsTotal;

  if (isLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isLightTheme ? 'bg-white' : 'bg-gray-900'}`}>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#8B5CF6] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className={`text-lg font-medium ${isLightTheme ? 'text-gray-900' : 'text-white'}`}>Loading...</p>
        </div>
      </div>
    );
  }

  if (!userId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-semibold text-gray-800">Please open this app from Telegram</h1>
        </div>
      </div>
    );
  }

  return (
    <main className={`min-h-screen pb-16 ${isLightTheme ? 'bg-gray-50' : 'bg-gray-900'}`}>
      <div className="p-4">
        <div className={`rounded-lg p-6 mb-6 ${isLightTheme ? 'bg-white' : 'bg-gray-800'} shadow`}>
          <div className="flex justify-between items-center mb-6">
            <h1 className={`text-2xl font-bold ${isLightTheme ? 'text-gray-800' : 'text-white'}`}>My Finance</h1>
            <button
              onClick={() => setIsAddTransactionOpen(true)}
              className="w-10 h-10 bg-[#8B5CF6] text-white rounded-full flex items-center justify-center hover:bg-[#7C3AED] transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>

          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-500">Total Balance</p>
                <button
                  onClick={() => setIsEditBalanceOpen(true)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
              <p className={`text-2xl font-bold ${balance < 0 ? 'text-red-500' : isLightTheme ? 'text-gray-900' : 'text-white'}`}>
                ${balance.toLocaleString()}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setActiveChart('pie')}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  activeChart === 'pie'
                    ? 'bg-[#8B5CF6] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Pie
              </button>
              <button
                onClick={() => setActiveChart('bar')}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  activeChart === 'bar'
                    ? 'bg-[#8B5CF6] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Bar
              </button>
            </div>
          </div>

          <div className="h-64 mb-6">
            {activeChart === 'pie' ? (
              <ExpenseChart expenses={expensesByCategory} income={0} />
            ) : (
              <BarChart data={sortedTransactionsByDate} />
            )}
          </div>

          <div className="space-y-4">
            <h2 className={`text-lg font-semibold ${isLightTheme ? 'text-gray-800' : 'text-white'}`}>Recent Transactions</h2>
            {transactions.length === 0 ? (
              <p className={`text-center ${isLightTheme ? 'text-gray-600' : 'text-gray-400'}`}>No transactions yet</p>
            ) : (
              transactions.map((transaction) => (
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
                      <span className={`text-white font-medium ${isLightTheme ? 'text-gray-800' : 'text-white'}`}>
                        {transaction.category.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className={`font-medium ${isLightTheme ? 'text-gray-800' : 'text-white'}`}>{transaction.category}</p>
                      <p className={`text-sm ${isLightTheme ? 'text-gray-600' : 'text-gray-400'}`}>
                        {transaction.date.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <p className={`font-semibold ${transaction.amount < 0 ? 'text-red-500' : 'text-green-500'}`}>
                    {transaction.amount < 0 ? '-' : '+'}${Math.abs(transaction.amount).toLocaleString()}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <BottomNav />

      {isAddTransactionOpen && (
        <AddTransaction
          isOpen={isAddTransactionOpen}
          onClose={() => setIsAddTransactionOpen(false)}
          onAddTransaction={handleAddTransaction}
        />
      )}

      {selectedTransaction && (
        <EditTransactionModal
          isOpen={true}
          onClose={() => setSelectedTransaction(null)}
          transaction={selectedTransaction}
          onEdit={handleEditTransaction}
          onDelete={handleDeleteTransaction}
        />
      )}

      {isEditBalanceOpen && (
        <EditBalanceModal
          isOpen={isEditBalanceOpen}
          onClose={() => setIsEditBalanceOpen(false)}
          currentBalance={balance}
          onSave={handleEditBalance}
        />
      )}
    </main>
  );
}

export default function Home() {
  const { isLightTheme } = useTheme();
  return (
    <Suspense fallback={
      <div className={`min-h-screen flex items-center justify-center ${isLightTheme ? 'bg-white' : 'bg-gray-900'}`}>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#8B5CF6] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className={`text-lg font-medium ${isLightTheme ? 'text-gray-900' : 'text-white'}`}>Loading...</p>
        </div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}
