'use client';

import { useState, useEffect, Suspense } from 'react';
import { AddTransaction } from '@/components/AddTransaction';
import BottomNav from '@/components/BottomNav';
import ExpenseChart from '@/components/ExpenseChart';
import BarChart from '@/components/BarChart';
import { Transaction, addTransaction as addTransactionToFirebase, getUserTransactions } from '@/firebaseConfig';
import { useSearchParams } from 'next/navigation';

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
  const urlUserId = searchParams.get('userId');
  
  const [activeChart, setActiveChart] = useState<'pie' | 'bar'>('pie');
  const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Determine if we're on localhost and set the appropriate userId
        const isLocalhost = window.location.hostname === 'localhost';
        const newUserId = isLocalhost ? 'test-user-123' : urlUserId;
        setUserId(newUserId);

        if (newUserId) {
          const userTransactions = await getUserTransactions(newUserId);
          setTransactions(userTransactions);
        }
      } catch (error) {
        console.error('Error initializing app:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();
  }, [urlUserId]);

  const handleAddTransaction = async (category: string, amount: number, color: string) => {
    if (!userId) return;

    const newTransaction: Omit<Transaction, 'id'> = {
      userId,
      category,
      amount,
      color,
      date: new Date(),
    };

    try {
      const addedTransaction = await addTransactionToFirebase(newTransaction);
      setTransactions(prev => [addedTransaction, ...prev]);
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  // Group transactions by category and sum amounts
  const expensesByCategory = transactions.reduce((acc, transaction) => {
    const existing = acc.find(e => e.category === transaction.category);
    if (existing) {
      existing.amount += transaction.amount;
    } else {
      acc.push({
        category: transaction.category,
        amount: transaction.amount,
        color: transaction.color
      });
    }
    return acc;
  }, [] as { category: string; amount: number; color: string }[]);

  const totalExpenses = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-[#8B5CF6] border-t-transparent rounded-full animate-spin"></div>
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
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-md mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">My Finance</h1>
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
              <p className="text-sm text-gray-500">Total Balance</p>
              <p className="text-2xl font-bold text-gray-900">${totalExpenses.toLocaleString()}</p>
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
              <BarChart data={barChartData} />
            )}
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
            {transactions.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No transactions yet</p>
            ) : (
              transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
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
                      <p className="text-sm text-gray-500">
                        {transaction.date.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <p className="font-semibold text-gray-900">
                    ${transaction.amount.toLocaleString()}
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
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-[#8B5CF6] border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}
