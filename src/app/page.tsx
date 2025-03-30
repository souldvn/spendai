'use client';

import { useState } from 'react';
import { AddTransaction } from '@/components/AddTransaction';
import BottomNav from '@/components/BottomNav';
import ExpenseChart from '@/components/ExpenseChart';
import BarChart from '@/components/BarChart';

interface Transaction {
  id: string;
  category: string;
  amount: number;
  date: Date;
  color: string;
}

const barChartData = [
  { name: 'Пн', amount: 45000 },
  { name: 'Вт', amount: 35000 },
  { name: 'Ср', amount: 55000 },
  { name: 'Чт', amount: 40000 },
  { name: 'Пт', amount: 65000 },
  { name: 'Сб', amount: 50000 },
  { name: 'Вс', amount: 45000 },
];

export default function Home() {
  const [activeChart, setActiveChart] = useState<'pie' | 'bar'>('pie');
  const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const handleAddTransaction = (category: string, amount: number, color: string) => {
    const newTransaction: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      category,
      amount,
      date: new Date(),
      color
    };
    setTransactions([newTransaction, ...transactions]);
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

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-md mx-auto p-4 relative">
        {/* Header */}
        <div className="flex space-x-4 mb-6">
          <button className="px-6 py-2 bg-[#8B5CF6] text-white rounded-full text-sm font-medium">
            Expenses
          </button>
          <button className="px-6 py-2 text-gray-500 rounded-full text-sm font-medium">
            Income
          </button>
        </div>

        {/* Balance Card */}
        <div className="bg-white rounded-3xl p-6 shadow-sm mb-6">
          <div className="text-2xl font-semibold mb-6">{totalExpenses.toLocaleString()} ₽</div>
          {activeChart === 'pie' ? (
            <ExpenseChart 
              expenses={expensesByCategory} 
              income={0}
            />
          ) : (
            <BarChart data={barChartData} />
          )}
          <div className="flex justify-between mt-6">
            <div className="flex space-x-2">
              <button className="px-4 py-1 bg-[#8B5CF6] bg-opacity-10 text-[#8B5CF6] rounded-full text-sm">
                Wk
              </button>
              <button className="px-4 py-1 text-gray-400 rounded-full text-sm">
                Mo
              </button>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={() => setActiveChart('pie')}
                className={`w-8 h-8 ${activeChart === 'pie' ? 'bg-[#8B5CF6] text-white' : 'bg-[#8B5CF6] bg-opacity-10 text-[#8B5CF6]'} rounded-xl flex items-center justify-center`}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M10 18.3333C14.6024 18.3333 18.3334 14.6024 18.3334 10C18.3334 5.39763 14.6024 1.66667 10 1.66667C5.39765 1.66667 1.66669 5.39763 1.66669 10C1.66669 14.6024 5.39765 18.3333 10 18.3333ZM10 20C15.5229 20 20 15.5228 20 10C20 4.47715 15.5229 0 10 0C4.47717 0 0 4.47715 0 10C0 15.5228 4.47717 20 10 20Z" fill="currentColor"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M10 0C10.9205 0 11.6667 0.746167 11.6667 1.66667V10C11.6667 10.9205 10.9205 11.6667 10 11.6667H1.66669C0.746157 11.6667 0 10.9205 0 10C0 4.47715 4.47717 0 10 0Z" fill="currentColor"/>
                </svg>
              </button>
              <button 
                onClick={() => setActiveChart('bar')}
                className={`w-8 h-8 ${activeChart === 'bar' ? 'bg-[#8B5CF6] text-white' : 'bg-[#8B5CF6] bg-opacity-10 text-[#8B5CF6]'} rounded-xl flex items-center justify-center`}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M13.3333 5C14.2538 5 15 5.74619 15 6.66667V17.5H11.6667V6.66667C11.6667 5.74619 12.4128 5 13.3333 5Z" fill="currentColor"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M5.83331 10C6.75379 10 7.49998 10.7462 7.49998 11.6667V17.5H4.16665V11.6667C4.16665 10.7462 4.91284 10 5.83331 10Z" fill="currentColor"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M19.1667 2.5C19.6269 2.5 20 2.8731 20 3.33333V17.5C20 17.9602 19.6269 18.3333 19.1667 18.3333H0.833313C0.373089 18.3333 0 17.9602 0 17.5C0 17.0398 0.373089 16.6667 0.833313 16.6667H18.3333V3.33333C18.3333 2.8731 18.7064 2.5 19.1667 2.5Z" fill="currentColor"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Transaction History</h2>
          </div>
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{transaction.category}</div>
                  <div className="text-sm text-gray-500">
                    {transaction.date.toLocaleDateString()}
                  </div>
                </div>
                <div className="font-medium">{transaction.amount.toLocaleString()} ₽</div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Transaction Button */}
        <div className="max-w-md mx-auto fixed left-0 right-0 bottom-24 px-4 z-50 pointer-events-none">
          <div className="relative flex justify-end pointer-events-auto">
            <button 
              onClick={() => setIsAddTransactionOpen(true)}
              className="w-14 h-14 bg-[#8B5CF6] rounded-2xl flex items-center justify-center text-white text-2xl font-medium shadow-lg"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />

      {/* Add Transaction Modal */}
      <AddTransaction
        isOpen={isAddTransactionOpen}
        onClose={() => setIsAddTransactionOpen(false)}
        onAddTransaction={handleAddTransaction}
      />
    </div>
  );
}
