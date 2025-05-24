'use client';

import React from 'react';
import { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useTranslation } from '@/hooks/useTranslation';
import { useCurrency } from '@/context/CurrencyContext';
const housing = '/icon/housing.svg';
const transport = '/icon/transport.svg';
const food = '/icon/food.svg';
const entertainment = '/icon/entertainment.svg';

const other = '/icon/other.svg';
const gift = '/icon/gifts.svg';
const buisness = '/icon/buisness.svg';
const salary = '/icon/salary.svg';
const travel = '/icon/travel.svg';
const phone = '/icon/phone.svg';
const shopping = '/icon/shopping.svg';
const education = '/icon/education.svg';
const health = '/icon/health.svg';
const debts = '/icon/debts.svg';
const savings = '/icon/savings.svg';
const investment = '/icon/investment.svg';
const refund = '/icon/pogash.svg';



interface Category {
  id: string;
  name: string;
  color: string;
  icon: React.ReactNode;
  accentColor: string;
  bor: string
}

const expenseCategories: Category[] = [
  { 
    id: 'housing', 
    name: 'housing',
    color: 'bg-[#F471B5]',
    accentColor: 'border-[#F471B5]',
    bor:'#F471B5',
    icon: (
      <img src={housing} alt="housing" className='z-index-100' />
    )
  },
  { 
    id: 'transport', 
    name: 'transport',
    color: 'bg-[#FB657C]',
    accentColor: 'border-[#FB657C]',
    bor:'#FB657C',
    icon: (
      <img src={transport} alt="transport" className='z-index-100' />
    )
  },
  { 
    id: 'food', 
    name: 'food',
    color: 'bg-[#FB923C]',
    bor:'#FB923C',
    accentColor: 'border-[#FB923C]',
    icon: (
      <img src={food} alt="food" className='z-index-100' />
    )
  },
  { 
    id: 'shopping', 
    name: 'shopping',
    color: 'bg-[#FAC905]',
    bor:'#FAC905',
    accentColor: 'border-[#FAC905]',
    icon: (
      <img src={shopping} alt="shopping" className='z-index-100' />
    )
  },
  { 
    id: 'phone', 
    name: 'phone',
    color: 'bg-[#91D624]',
    bor:'#91D624',
    accentColor: 'border-[#91D624]',
    icon: (
      <img src={phone} alt="phone" className='z-index-100' />
    )
  },
  { 
    id: 'travel', 
    name: 'travel',
    color: 'bg-[#30D96E]',
    accentColor: 'border-[#30D96E]',
    bor:'#30D96E',
    icon: (
      <img src={travel} alt="travel" className='z-index-100' />
    )
  },
  { 
    id: 'health', 
    name: 'health',
    color: 'bg-[#2BD4BD]',
    accentColor: 'border-[#2BD4BD]',
    bor:'#2BD4BD',
    icon: (
      <img src={health} alt="health" className='z-index-100' />
    )
  },
  { 
    id: 'entertainment', 
    name: 'entertainment',
    color: 'bg-[#10B7D1]',
    accentColor: 'border-[#10B7D1]',
    bor:'#10B7D1',
    icon: (
      <img src={entertainment} alt="entertainment" className='z-index-100' />
    )
  },
  { 
    id: 'education', 
    name: 'education',
    color: 'bg-[#61A6FA]',
    accentColor: 'border-[#61A6FA]',
    bor:'#61A6FA',
    icon: (
      <img src={education} alt="education" className='z-index-100' />
    )
  },
  { 
    id: 'debts', 
    name: 'debts',
    color: 'bg-[#9876F9]',
    accentColor: 'border-[#9876F9]',
    bor:'#9876F9',
    icon: (
      <img src={debts} alt="debts" className='z-index-100' />
    )
  },
  { 
    id: 'savings', 
    name: 'savings',
    color: 'bg-[#A8A29F]',
    accentColor: 'border-[#A8A29F]',
    bor:'#A8A29F',
    icon: (
      <img src={savings} alt="savings" className='z-index-100' />
    )
  },
  { 
    id: 'other', 
    name: 'other',
    color: 'bg-[#929AAA]',
    accentColor: 'border-[#929AAA]',
    bor:'#929AAA',
    icon: (
      <img src={other} alt="other" className='z-index-100' />
    )
  }
];

const incomeCategories: Category[] = [
  {
    id: 'salary',
    name: 'salary',
    color: 'bg-[#F471B5]',
    accentColor: 'border-[#F471B5]',
    bor:'#F471B5',
    icon: (
      <img src={salary} alt="salary" className='z-index-100' />
    )
  },
  {
    id: 'business',
    name: 'business',
    color: 'bg-[#FB657C]',
    accentColor: 'border-[#FB657C]',
    bor:'#FB657C',
    icon: (
      <img src={buisness} alt="business" className='z-index-100' />
    )
  },
  {
    id: 'gifts',
    name: 'gifts',
    color: 'bg-[#FB923C]',
    accentColor: 'border-[#FB923C]',
    bor:'#FB923C',
    icon: (
      <img src={gift} alt="gifts" className='z-index-100' />
    )
  },
  {
    id: 'refund',
    name: 'refund',
    color: 'bg-[#8B5CF6]',
    accentColor: 'border-[#8B5CF6]',
    bor:'#8B5CF6',
    icon: (
      <img src={refund} alt="debt" className='z-index-100' />
    )
  },
  {
    id: 'investment',
    name: 'investment',
    color: 'bg-[#A8A29F]',
    accentColor: 'border-[#A8A29F]',
    bor:'#A8A29F',
    icon: (
      <img src={investment} alt="investment" className='z-index-100' />
    )
  },
  {
    id: 'other',
    name: 'other',
    color: 'bg-[#929AAA]',
    accentColor: 'border-[#929AAA]',
    bor:'#929AAA',
    icon: (
      <img src={other} alt="other" className='z-index-100' />
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
  const [isExpense, setIsExpense] = useState(true);
  const { isLightTheme } = useTheme();
  const { t } = useTranslation();
  const { currency, convertToUSD } = useCurrency();

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
    setStep('amount');
  };

  const handleAmountSubmit = () => {
    if (!selectedCategory || !amount) return;
    // Extract the hex color from the Tailwind class (removing 'bg-[' and ']')
    const color = selectedCategory.color.slice(4, -1);
    
    // Convert the amount to USD before saving
    const amountInUSD = convertToUSD(parseFloat(amount));
    console.log('Converting amount:', amount, currency, 'to USD:', amountInUSD);
    
    // Pass the amount in USD to the parent component
    onAddTransaction(
      selectedCategory.id,
      isExpense ? -Math.abs(amountInUSD) : Math.abs(amountInUSD),
      color
    );
    onClose();
    // Reset state
    setStep('category');
    setSelectedCategory(null);
    setAmount('');
    setIsExpense(true);
  };

  if (!isOpen) return null;

  const categories = isExpense ? expenseCategories : incomeCategories;

  if (step === 'category') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center">
        <div className={`${isLightTheme ? 'bg-white' : 'bg-gray-800'} w-full max-w-md rounded-t-3xl p-6`}>
          <div className="flex items-center mb-6">
            <button onClick={onClose} className="text-gray-400 mr-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <h2 className="text-xl font-semibold">Add transaction</h2>
          </div>
          <div className="flex space-x-4 mb-6">
            <button 
              onClick={() => setIsExpense(true)}
              className={`px-6 py-2 rounded-full text-sm font-medium ${
                isExpense ? 'bg-[#8B5CF6] text-white' : 'text-gray-500'
              }`}
            >
              {t('home.expenses')}
            </button>
            <button 
              onClick={() => setIsExpense(false)}
              className={`px-6 py-2 rounded-full text-sm font-medium ${
                !isExpense ? 'bg-[#8B5CF6] text-white' : 'text-gray-500'
              }`}
            >
              {t('home.income')}
            </button>
          </div>
          
          <div className="space-y-3 max-h-[calc(100vh-250px)] overflow-y-auto"> 
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategorySelect(category)}
                className={`w-full ${isLightTheme ? 'bg-gray-50 hover:bg-gray-100' : 'bg-gray-700 hover:bg-gray-600'} rounded-2xl p-4 flex items-center justify-between`}
                style={{
    borderLeft: `6px solid ${category.bor}`,
  }}
              >
                <div className="flex items-center">
                  <div className={`w-10 h-10  rounded-xl flex items-center justify-center mr-3 `}>
                    {category.icon}
                  </div>
                  <span className={`${isLightTheme ? 'text-gray-900' : 'text-white'} font-medium`}>
                    {t(`categories.${category.name}`)}
                  </span>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 ${
                  selectedCategory?.id === category.id 
                  ? `${category.accentColor} bg-[#8B5CF6]` 
                  : isLightTheme ? 'border-gray-200' : 'border-gray-600'
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
            {t('common.next')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center">
      <div className={`${isLightTheme ? 'bg-white' : 'bg-gray-800'} w-full max-w-md rounded-t-3xl`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <button onClick={() => setStep('category')} className="text-gray-400 mr-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <div className={`w-10 h-10  rounded-xl flex items-center justify-center mr-3`}>
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
            className={`w-full text-4xl font-semibold mb-6 outline-none bg-transparent ${isLightTheme ? 'text-gray-900 placeholder-gray-400' : 'text-white placeholder-gray-500'}`}
            autoFocus
          />
          <button
            onClick={handleAmountSubmit}
            disabled={!amount}
            className={`w-full py-4 rounded-2xl font-medium ${
              amount ? 'bg-[#8B5CF6] text-white' : 'bg-gray-100 text-gray-400'
            }`}
          >
            {t('common.next')}
          </button>
        </div>
      </div>
    </div>
  );
} 