'use client';

import React from 'react';
import { useState } from 'react';

interface Category {
  id: string;
  name: string;
  color: string;
  icon: React.ReactNode;
  accentColor: string;
}

const categories: Category[] = [
  { 
    id: 'housing', 
    name: 'Housing',
    color: 'bg-[#F471B5]',
    accentColor: 'border-[#F471B5]',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M3 9.5L12 3L21 9.5V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V9.5Z" stroke="white" strokeWidth="1.5"/>
      </svg>
    )
  },
  { 
    id: 'transport', 
    name: 'Transport',
    color: 'bg-[#FB657C]',
    accentColor: 'border-[#FB657C]',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M4 10C4 8.89543 4.89543 8 6 8H18C19.1046 8 20 8.89543 20 10V16C20 17.1046 19.1046 18 18 18H6C4.89543 18 4 17.1046 4 16V10Z" stroke="white" strokeWidth="1.5"/>
        <path d="M7 18V20" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M17 18V20" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M7 8V5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M17 8V5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    )
  },
  { 
    id: 'food', 
    name: 'Food & Groceries',
    color: 'bg-[#FB923C]',
    accentColor: 'border-[#FB923C]',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M4 7H20" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M6 7L8 20H16L18 7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 11H15" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    )
  },
  { 
    id: 'shopping', 
    name: 'Shopping',
    color: 'bg-[#FAC905]',
    accentColor: 'border-[#FAC905]',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M6 4L4 8V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V8L18 4H6Z" stroke="white" strokeWidth="1.5"/>
        <path d="M4 8H20" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M16 10C16 12.2091 14.2091 14 12 14C9.79086 14 8 12.2091 8 10" stroke="white" strokeWidth="1.5"/>
      </svg>
    )
  },
  { 
    id: 'phone', 
    name: 'Phone & Internet',
    color: 'bg-[#91D624]',
    accentColor: 'border-[#91D624]',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="6" y="3" width="12" height="18" rx="2" stroke="white" strokeWidth="1.5"/>
        <path d="M12 17.5H12.01" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    )
  },
  { 
    id: 'travel', 
    name: 'Travel',
    color: 'bg-[#30D96E]',
    accentColor: 'border-[#30D96E]',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M20 4L15 9L19 13L14 18L10 14L5 19L3 17L8 12L4 8L9 3L13 7L18 2L20 4Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  { 
    id: 'health', 
    name: 'Health & Wellness',
    color: 'bg-[#2BD4BD]',
    accentColor: 'border-[#2BD4BD]',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M10 4H14V10H20V14H14V20H10V14H4V10H10V4Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  { 
    id: 'entertainment', 
    name: 'Entertainment',
    color: 'bg-[#10B7D1]',
    accentColor: 'border-[#10B7D1]',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="7" width="18" height="10" rx="2" stroke="white" strokeWidth="1.5"/>
        <path d="M10 10L14 12L10 14V10Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  { 
    id: 'education', 
    name: 'Education',
    color: 'bg-[#61A6FA]',
    accentColor: 'border-[#61A6FA]',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M3 9L12 4L21 9L12 14L3 9Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M19 11V16" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M7 11V16.5C7 16.5 9 19 12 19C15 19 17 16.5 17 16.5V11" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  { 
    id: 'debts', 
    name: 'Debts & Loans',
    color: 'bg-[#9876F9]',
    accentColor: 'border-[#9876F9]',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="1.5"/>
        <path d="M14 9H10C8.89543 9 8 9.89543 8 11C8 12.1046 8.89543 13 10 13H13C14.1046 13 15 13.8954 15 15C15 16.1046 14.1046 17 13 17H9" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M12 7V9" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M12 17V19" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    )
  },
  { 
    id: 'savings', 
    name: 'Savings & Investments',
    color: 'bg-[#A8A29F]',
    accentColor: 'border-[#A8A29F]',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M3 7L6.5 3.5L10 7L13.5 3.5L17 7L19 5V19L17 17L13.5 20.5L10 17L6.5 20.5L3 17L1 19V5L3 7Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  { 
    id: 'other', 
    name: 'Other Expenses',
    color: 'bg-[#929AAA]',
    accentColor: 'border-[#929AAA]',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="2" stroke="white" strokeWidth="1.5"/>
        <circle cx="19" cy="12" r="2" stroke="white" strokeWidth="1.5"/>
        <circle cx="5" cy="12" r="2" stroke="white" strokeWidth="1.5"/>
      </svg>
    )
  }
];

interface AddTransactionProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTransaction: (category: string, amount: number, color: string) => void;
}

export function AddTransaction({ isOpen, onClose, onAddTransaction }: AddTransactionProps) {
  const [step, setStep] = useState<'category' | 'amount'>('category');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [amount, setAmount] = useState('');

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
    setStep('amount');
  };

  const handleAmountSubmit = () => {
    if (!selectedCategory || !amount) return;
    // Extract the hex color from the Tailwind class (removing 'bg-[' and ']')
    const color = selectedCategory.color.slice(4, -1);
    onAddTransaction(selectedCategory.name, parseFloat(amount), color);
    onClose();
    // Reset state
    setStep('category');
    setSelectedCategory(null);
    setAmount('');
  };

  if (!isOpen) return null;

  if (step === 'category') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center">
        <div className="bg-white w-full max-w-md rounded-t-3xl p-6">
          <div className="flex items-center mb-6">
            <button onClick={onClose} className="text-gray-400 mr-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <h2 className="text-xl font-semibold">Add transaction</h2>
          </div>
          <div className="flex space-x-4 mb-6">
            <button className="px-6 py-2 bg-[#8B5CF6] text-white rounded-full text-sm font-medium">
              Expenses
            </button>
            <button className="px-6 py-2 text-gray-500 rounded-full text-sm font-medium">
              Income
            </button>
          </div>
          <div className="space-y-3 max-h-[calc(100vh-250px)] overflow-y-auto">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategorySelect(category)}
                className="w-full bg-gray-50 hover:bg-gray-100 rounded-2xl p-4 flex items-center justify-between"
              >
                <div className="flex items-center">
                  <div className={`w-10 h-10 ${category.color} rounded-xl flex items-center justify-center mr-3`}>
                    {category.icon}
                  </div>
                  <span className="text-gray-900 font-medium">{category.name}</span>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 ${
                  selectedCategory?.id === category.id 
                  ? `${category.accentColor} bg-[#8B5CF6]` 
                  : 'border-gray-200'
                }`} />
              </button>
            ))}
          </div>
          <button
            onClick={() => selectedCategory && setStep('amount')}
            disabled={!selectedCategory}
            className={`w-full py-4 rounded-2xl font-medium mt-6 ${
              selectedCategory ? 'bg-[#8B5CF6] text-white' : 'bg-gray-100 text-gray-400'
            }`}
          >
            Next
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center">
      <div className="bg-white w-full max-w-md rounded-t-3xl">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <button onClick={() => setStep('category')} className="text-gray-400 mr-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <div className={`w-10 h-10 ${selectedCategory?.color} rounded-xl flex items-center justify-center mr-3`}>
                {selectedCategory?.icon}
              </div>
              <span className="text-lg font-medium">{selectedCategory?.name}</span>
            </div>
          </div>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full text-4xl font-semibold mb-6 outline-none"
            autoFocus
          />
          <button
            onClick={handleAmountSubmit}
            disabled={!amount}
            className={`w-full py-4 rounded-2xl font-medium ${
              amount ? 'bg-[#8B5CF6] text-white' : 'bg-gray-100 text-gray-400'
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
} 