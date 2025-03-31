'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { Transaction, getUserTransactions } from '@/firebaseConfig';
import BottomNav from '@/components/BottomNav';
import { useSearchParams } from 'next/navigation';
import { ChatMessage } from '@/components/ChatMessage';
import { analyzeFinances, getAIResponse } from '@/lib/financeAI';

export default function Analytics() {
  const searchParams = useSearchParams();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [messages, setMessages] = useState<Array<{ text: string; isAI: boolean }>>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    setUserId(searchParams.get('userId'));
  }, [searchParams]);

  useEffect(() => {
    if (!userId) return;

    const initializeTransactions = async () => {
      const isLocalhost = window.location.hostname === 'localhost';
      const finalUserId = isLocalhost ? 'test-user-123' : userId;
      
      if (finalUserId) {
        const userTransactions = await getUserTransactions(finalUserId);
        setTransactions(userTransactions);
        setMessages([{
          text: "Привет! Я ваш финансовый AI-помощник. Я могу проанализировать ваши расходы и дать рекомендации по оптимизации бюджета. Также вы можете задать мне любые вопросы о ваших финансах.",
          isAI: true
        }]);
      }
    };

    initializeTransactions();
  }, [userId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleAnalyzeFinances = async () => {
    setIsAnalyzing(true);
    
    try {
      const totalExpenses = transactions.filter(t => t.amount < 0).reduce((sum, t) => sum + Math.abs(t.amount), 0);
      const totalIncome = transactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
      const expensesByCategory = transactions.filter(t => t.amount < 0).reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + Math.abs(t.amount);
        return acc;
      }, {} as Record<string, number>);

      const analysis = analyzeFinances({
        totalIncome,
        totalExpenses,
        expensesByCategory
      });

      setMessages(prev => [...prev, { text: analysis, isAI: true }]);
    } catch (error) {
      console.error('Error analyzing finances:', error);
      setMessages(prev => [...prev, { text: "Произошла ошибка при анализе. Пожалуйста, попробуйте позже.", isAI: true }]);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <div className="min-h-screen bg-gray-50 pb-20">
        <div className="max-w-md mx-auto px-4 py-8">
          <h1 className="text-xl font-semibold mb-6">AI Аналитика</h1>
          <div className="bg-white rounded-xl p-4 mb-4">
            <button
              onClick={handleAnalyzeFinances}
              disabled={isAnalyzing}
              className={`w-full py-3 rounded-lg text-white font-medium ${isAnalyzing ? 'bg-gray-400' : 'bg-[#8B5CF6]'}`}
            >
              {isAnalyzing ? 'Анализирую...' : 'Запросить анализ'}
            </button>
          </div>
          <div className="bg-white rounded-xl p-4 mb-4 h-[calc(100vh-300px)] overflow-y-auto">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <ChatMessage key={index} message={message.text} isAI={message.isAI} />
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
          <BottomNav />
        </div>
      </div>
    </Suspense>
  );
}
