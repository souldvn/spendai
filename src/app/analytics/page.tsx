'use client';

import { useState, useEffect, useRef } from 'react';
import { Transaction, getUserTransactions } from '@/firebaseConfig';
import BottomNav from '@/components/BottomNav';
import { useSearchParams } from 'next/navigation';
import { ChatMessage } from '@/components/ChatMessage';
import { analyzeFinances, getAIResponse } from '@/lib/financeAI';

export default function Analytics() {
  const searchParams = useSearchParams();
  const urlUserId = searchParams.get('userId');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [messages, setMessages] = useState<Array<{ text: string; isAI: boolean }>>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    const initializeTransactions = async () => {
      const isLocalhost = window.location.hostname === 'localhost';
      const userId = isLocalhost ? 'test-user-123' : urlUserId;
      
      if (userId) {
        const userTransactions = await getUserTransactions(userId);
        setTransactions(userTransactions);
        // Add welcome message
        setMessages([{
          text: "Привет! Я ваш финансовый AI-помощник. Я могу проанализировать ваши расходы и дать рекомендации по оптимизации бюджета. Также вы можете задать мне любые вопросы о ваших финансах.",
          isAI: true
        }]);
      }
    };

    initializeTransactions();
  }, [urlUserId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleAnalyzeFinances = async () => {
    setIsAnalyzing(true);
    
    try {
      // Calculate total expenses and income
      const totalExpenses = transactions
        .filter(t => t.amount < 0)
        .reduce((sum, t) => sum + Math.abs(t.amount), 0);
      
      const totalIncome = transactions
        .filter(t => t.amount > 0)
        .reduce((sum, t) => sum + t.amount, 0);

      // Group expenses by category
      const expensesByCategory = transactions
        .filter(t => t.amount < 0)
        .reduce((acc, t) => {
          acc[t.category] = (acc[t.category] || 0) + Math.abs(t.amount);
          return acc;
        }, {} as Record<string, number>);

      // Get analysis
      const analysis = analyzeFinances({
        totalIncome,
        totalExpenses,
        expensesByCategory
      });

      setMessages(prev => [...prev, {
        text: analysis,
        isAI: true
      }]);
    } catch (error) {
      console.error('Error analyzing finances:', error);
      setMessages(prev => [...prev, {
        text: "Произошла ошибка при анализе. Пожалуйста, попробуйте позже.",
        isAI: true
      }]);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage;
    setInputMessage('');

    // Add user message
    setMessages(prev => [...prev, {
      text: userMessage,
      isAI: false
    }]);

    try {
      // Prepare financial context
      const totalExpenses = transactions
        .filter(t => t.amount < 0)
        .reduce((sum, t) => sum + Math.abs(t.amount), 0);
      
      const totalIncome = transactions
        .filter(t => t.amount > 0)
        .reduce((sum, t) => sum + t.amount, 0);

      const context = `User's financial summary:
Total Income: $${totalIncome}
Total Expenses: $${totalExpenses}
Balance: $${totalIncome - totalExpenses}`;

      // Get AI response
      const response = getAIResponse(userMessage, context);

      setMessages(prev => [...prev, {
        text: response,
        isAI: true
      }]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      setMessages(prev => [...prev, {
        text: "Произошла ошибка. Пожалуйста, попробуйте позже.",
        isAI: true
      }]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-md mx-auto px-4 py-8">
        <h1 className="text-xl font-semibold mb-6">AI Аналитика</h1>

        <div className="bg-white rounded-xl p-4 mb-4">
          <button
            onClick={handleAnalyzeFinances}
            disabled={isAnalyzing}
            className={`w-full py-3 rounded-lg text-white font-medium ${
              isAnalyzing ? 'bg-gray-400' : 'bg-[#8B5CF6]'
            }`}
          >
            {isAnalyzing ? 'Анализирую...' : 'Запросить анализ'}
          </button>
        </div>
        
        <div className="bg-white rounded-xl p-4 mb-4 h-[calc(100vh-300px)] overflow-y-auto">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <ChatMessage
                key={index}
                message={message.text}
                isAI={message.isAI}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="bg-white rounded-xl p-2 flex items-center gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Задайте вопрос..."
            className="flex-1 px-4 py-2 text-sm focus:outline-none"
          />
          <button
            onClick={handleSendMessage}
            className="p-2 rounded-lg bg-[#8B5CF6] text-white"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
} 