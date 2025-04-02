'use client';

import { useState, useEffect } from 'react';
import { getUserTransactions } from '@/firebaseConfig';
import { Transaction } from '@/types';
import BottomNav from '@/components/BottomNav';
import { useSearchParams } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import { useBalance } from '@/context/BalanceContext';
import { analyzeFinances } from '@/lib/financeAI';

export default function Analytics() {
  const searchParams = useSearchParams();
  const urlUserId = searchParams.get('userId');
  const { isLightTheme } = useTheme();
  const { balance } = useBalance();
  
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [analysis, setAnalysis] = useState<string>('');
  const [topCategories, setTopCategories] = useState<{ category: string; amount: number; percentage: number }[]>([]);
  const [financialHealth, setFinancialHealth] = useState<{
    score: number;
    status: 'healthy' | 'warning' | 'critical';
    message: string;
  }>({ score: 0, status: 'healthy', message: '' });

  useEffect(() => {
    const initializeTransactions = async () => {
      const isLocalhost = window.location.hostname === 'localhost';
      const userId = isLocalhost ? 'test-user-123' : urlUserId;
      
      if (userId) {
        try {
          const userTransactions = await getUserTransactions(userId);
          setTransactions(userTransactions);
          
          // Calculate totals
          const totalExpenses = userTransactions
            .filter((t: Transaction) => t.amount < 0)
            .reduce((sum: number, t: Transaction) => sum + Math.abs(t.amount), 0);
          
          const totalIncome = userTransactions
            .filter((t: Transaction) => t.amount > 0)
            .reduce((sum: number, t: Transaction) => sum + t.amount, 0);

          // Group expenses by category
          const expensesByCategory = userTransactions
            .filter((t: Transaction) => t.amount < 0)
            .reduce((acc: Record<string, number>, t: Transaction) => {
              acc[t.category] = (acc[t.category] || 0) + Math.abs(t.amount);
              return acc;
            }, {} as Record<string, number>);

          // Calculate top categories
          const categoriesArray = Object.entries(expensesByCategory)
            .map(([category, amount]) => ({
              category,
              amount,
              percentage: (amount / totalExpenses) * 100
            }))
            .sort((a, b) => b.amount - a.amount)
            .slice(0, 3);
          
          setTopCategories(categoriesArray);

          // Calculate financial health
          const expenseRatio = totalExpenses / totalIncome;
          let healthScore = 100;
          let healthStatus: 'healthy' | 'warning' | 'critical' = 'healthy';
          let healthMessage = '';

          // Calculate balance factor (how much balance covers monthly expenses)
          const balanceCoverageMonths = totalExpenses > 0 ? balance / totalExpenses : 0;
          
          // Determine health based on both expense ratio and balance coverage
          if (expenseRatio > 1) {
            // Расходы превышают доходы
            healthScore = 30;
            healthStatus = 'critical';
            healthMessage = 'Ваши расходы превышают доходы. Необходимо срочно оптимизировать бюджет.';
          } else if (expenseRatio > 0.8) {
            // Расходы близки к доходам
            if (balanceCoverageMonths >= 3) {
              // Есть запас в виде баланса на 3+ месяца
              healthScore = 75;
              healthStatus = 'warning';
              healthMessage = 'Расходы высокие, но есть финансовая подушка. Рекомендуется сократить расходы.';
            } else {
              healthScore = 60;
              healthStatus = 'warning';
              healthMessage = 'Ваши расходы близки к доходам, а финансовая подушка недостаточна. Рекомендуется оптимизировать расходы.';
            }
          } else {
            // Расходы меньше доходов
            if (balanceCoverageMonths >= 6) {
              // Отличный запас
              healthScore = 100;
              healthStatus = 'healthy';
              healthMessage = 'Отличное финансовое состояние! У вас хороший баланс доходов/расходов и надежная финансовая подушка.';
            } else if (balanceCoverageMonths >= 3) {
              // Хороший запас
              healthScore = 90;
              healthStatus = 'healthy';
              healthMessage = 'Хорошее финансовое состояние. Продолжайте накапливать финансовую подушку.';
            } else {
              // Маленький запас
              healthScore = 80;
              healthStatus = 'healthy';
              healthMessage = 'Хороший баланс доходов и расходов. Рекомендуется увеличить финансовую подушку.';
            }
          }

          setFinancialHealth({ score: healthScore, status: healthStatus, message: healthMessage });

          // Get analysis
          const financialAnalysis = analyzeFinances({
            totalIncome,
            totalExpenses,
            expensesByCategory,
            currentBalance: balance
          });

          setAnalysis(financialAnalysis);
        } catch (error) {
          console.error('Error analyzing finances:', error);
          setAnalysis('Произошла ошибка при анализе. Пожалуйста, попробуйте позже.');
        } finally {
          setIsLoading(false);
        }
      }
    };

    initializeTransactions();
  }, [urlUserId, balance]);

  if (isLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isLightTheme ? 'bg-white' : 'bg-gray-900'}`}>
        <div className="w-8 h-8 border-4 border-[#8B5CF6] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <main className={`min-h-screen pb-16 ${isLightTheme ? 'bg-gray-50' : 'bg-gray-900'}`}>
      <div className="p-4">
        <div className={`rounded-lg p-6 ${isLightTheme ? 'bg-white' : 'bg-gray-800'} shadow`}>
          <h1 className={`text-2xl font-bold mb-6 ${isLightTheme ? 'text-gray-800' : 'text-white'}`}>
            Analytics
          </h1>

          {transactions.length === 0 ? (
            <p className={`text-center ${isLightTheme ? 'text-gray-600' : 'text-gray-400'}`}>
              No transactions available for analysis
            </p>
          ) : (
            <div className="space-y-6">
              {/* Financial Health Indicator */}
              <div className={`p-4 rounded-lg ${isLightTheme ? 'bg-gray-50' : 'bg-gray-700'}`}>
                <h3 className={`text-lg font-semibold mb-4 ${isLightTheme ? 'text-gray-800' : 'text-white'}`}>
                  Financial Health
                </h3>
                <div className="flex items-start gap-4">
                  <div className={`flex items-center justify-center w-16 h-16 rounded-full ${
                    financialHealth.status === 'healthy' ? 'bg-green-100' :
                    financialHealth.status === 'warning' ? 'bg-yellow-100' :
                    'bg-red-100'
                  }`}>
                    <span className={`text-2xl font-bold ${
                      financialHealth.status === 'healthy' ? 'text-green-600' :
                      financialHealth.status === 'warning' ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {financialHealth.score}%
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className={`text-base font-medium mb-1 ${isLightTheme ? 'text-gray-800' : 'text-white'}`}>
                      {financialHealth.message}
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${
                          financialHealth.status === 'healthy' ? 'bg-green-500' :
                          financialHealth.status === 'warning' ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${financialHealth.score}%` }}
                      />
                    </div>
                    <p className={`text-sm ${isLightTheme ? 'text-gray-600' : 'text-gray-300'}`}>
                      {financialHealth.status === 'healthy' ? 'Отличное финансовое состояние' :
                       financialHealth.status === 'warning' ? 'Требует внимания' :
                       'Критическое состояние'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Top Categories */}
              <div className={`p-4 rounded-lg ${isLightTheme ? 'bg-gray-50' : 'bg-gray-700'}`}>
                <h3 className={`text-lg font-semibold mb-4 ${isLightTheme ? 'text-gray-800' : 'text-white'}`}>
                  Top Categories
                </h3>
                <div className="space-y-3">
                  {topCategories.map((category, index) => (
                    <div key={category.category}>
                      <div className="flex justify-between mb-1">
                        <span className={`text-sm ${isLightTheme ? 'text-gray-600' : 'text-gray-300'}`}>
                          {category.category}
                        </span>
                        <span className={`text-sm ${isLightTheme ? 'text-gray-600' : 'text-gray-300'}`}>
                          {category.percentage.toFixed(1)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            index === 0 ? 'bg-red-500' :
                            index === 1 ? 'bg-orange-500' :
                            'bg-yellow-500'
                          }`}
                          style={{ width: `${category.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Financial Overview */}
              <div className={`p-4 rounded-lg ${isLightTheme ? 'bg-gray-50' : 'bg-gray-700'}`}>
                <h3 className={`text-lg font-semibold mb-2 ${isLightTheme ? 'text-gray-800' : 'text-white'}`}>
                  Financial Overview
                </h3>
                <div className={`whitespace-pre-wrap font-mono text-sm ${isLightTheme ? 'text-gray-800' : 'text-white'}`}>
                  {analysis}
                </div>
              </div>

              {/* Transaction Summary */}
              <div className={`p-4 rounded-lg ${isLightTheme ? 'bg-gray-50' : 'bg-gray-700'}`}>
                <h3 className={`text-lg font-semibold mb-2 ${isLightTheme ? 'text-gray-800' : 'text-white'}`}>
                  Transaction Summary
                </h3>
                <p className={`${isLightTheme ? 'text-gray-600' : 'text-gray-300'}`}>
                  Total number of transactions: {transactions.length}
                </p>
                <p className={`${isLightTheme ? 'text-gray-600' : 'text-gray-300'}`}>
                  Last updated: {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </main>
  );
} 