'use client';

import { useState, useEffect } from 'react';
import { getUserTransactions } from '@/firebaseConfig';
import { Transaction } from '@/types';
import BottomNav from '@/components/BottomNav';
import { useSearchParams, useRouter } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import { useBalance } from '@/context/BalanceContext';
import { analyzeFinances } from '@/lib/financeAI';
import { useTranslation } from '@/hooks/useTranslation';

export default function Analytics() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const urlUserId = searchParams.get('userId');
  const { isLightTheme } = useTheme();
  const { balance } = useBalance();
  const { t } = useTranslation();
  
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
      try {
        const isLocalhost = window.location.hostname === 'localhost';
        let newUserId = isLocalhost ? 'test-user-123' : urlUserId;
        
        if (!newUserId) {
          newUserId = localStorage.getItem('userId');
        }
        
        if (!newUserId) {
          router.push('/error?message=Please open this app from Telegram');
          return;
        }
        
        if (!localStorage.getItem('userId')) {
          localStorage.setItem('userId', newUserId);
        }

        const userTransactions = await getUserTransactions(newUserId);
        setTransactions(userTransactions);
        
        const totalExpenses = userTransactions
          .filter((t: Transaction) => t.amount < 0)
          .reduce((sum: number, t: Transaction) => sum + Math.abs(t.amount), 0);
        
        const totalIncome = userTransactions
          .filter((t: Transaction) => t.amount > 0)
          .reduce((sum: number, t: Transaction) => sum + t.amount, 0);

        const expensesByCategory = userTransactions
          .filter((t: Transaction) => t.amount < 0)
          .reduce((acc: { category: string; amount: number }[], t: Transaction) => {
            const existing = acc.find(e => e.category === t.category);
            if (existing) {
              existing.amount += Math.abs(t.amount);
            } else {
              acc.push({
                category: t.category,
                amount: Math.abs(t.amount)
              });
            }
            return acc;
          }, []);

        const categoriesArray = expensesByCategory
          .map(({ category, amount }) => ({
            category,
            amount,
            percentage: (amount / totalExpenses) * 100
          }))
          .sort((a, b) => b.amount - a.amount)
          .slice(0, 3);
        
        setTopCategories(categoriesArray);

        const expenseRatio = totalExpenses / totalIncome;
        let healthScore = 100;
        let healthStatus: 'healthy' | 'warning' | 'critical' = 'healthy';
        let healthMessage = '';

        const balanceCoverageMonths = totalExpenses > 0 ? balance / totalExpenses : 0;

        if (expenseRatio > 1) {
          healthScore = 60;
          healthStatus = 'warning';
          healthMessage = t('analytics.healthMessages.expensesExceedIncome');
        } else {
          if (balanceCoverageMonths >= 6) {
            healthScore = 100;
            healthStatus = 'healthy';
            healthMessage = t('analytics.healthMessages.excellentBuffer');
          } else if (balanceCoverageMonths >= 3) {
            healthScore = 90;
            healthStatus = 'healthy';
            healthMessage = t('analytics.healthMessages.goodBuffer');
          } else {
            healthScore = 80;
            healthStatus = 'healthy';
            healthMessage = t('analytics.healthMessages.lowBuffer');
          }
        }

        setFinancialHealth({ score: healthScore, status: healthStatus, message: healthMessage });

        const analysis = analyzeFinances({
          totalIncome,
          totalExpenses,
          expensesByCategory,
          currentBalance: balance,
          t
        });

        setAnalysis(analysis);
      } catch (error) {
        console.error('Error analyzing finances:', error);
        setAnalysis(t('analytics.analysis.error'));
      } finally {
        setIsLoading(false);
      }
    };

    initializeTransactions();
  }, [urlUserId, balance, router, t]);

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
            {t('analytics.title')}
          </h1>

          {transactions.length === 0 ? (
            <p className={`text-center ${isLightTheme ? 'text-gray-600' : 'text-gray-400'}`}>
              {t('analytics.noTransactions')}
            </p>
          ) : (
            <div className="space-y-6">
              <div className={`p-4 rounded-lg ${isLightTheme ? 'bg-gray-50' : 'bg-gray-700'}`}>
                <h3 className={`text-lg font-semibold mb-4 ${isLightTheme ? 'text-gray-800' : 'text-white'}`}>
                  {t('analytics.financialHealth')}
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
                      {financialHealth.status === 'healthy' ? t('analytics.healthStatus.excellent') :
                       financialHealth.status === 'warning' ? t('analytics.healthStatus.warning') :
                       t('analytics.healthStatus.critical')}
                    </p>
                  </div>
                </div>
              </div>

              <div className={`p-4 rounded-lg ${isLightTheme ? 'bg-gray-50' : 'bg-gray-700'}`}>
                <h3 className={`text-lg font-semibold mb-4 ${isLightTheme ? 'text-gray-800' : 'text-white'}`}>
                  {t('analytics.topCategories')}
                </h3>
                <div className="space-y-3">
                  {topCategories.map((category, index) => (
                    <div key={category.category}>
                      <div className="flex justify-between mb-1">
                        <span className={`text-sm ${isLightTheme ? 'text-gray-600' : 'text-gray-300'}`}>
                          {t(`categories.${category.category.toLowerCase()}`)}
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

              <div className={`p-4 rounded-lg ${isLightTheme ? 'bg-gray-50' : 'bg-gray-700'}`}>
                <h3 className={`text-lg font-semibold mb-2 ${isLightTheme ? 'text-gray-800' : 'text-white'}`}>
                  {t('analytics.financialOverview')}
                </h3>
                <div className={`whitespace-pre-wrap font-mono text-sm ${isLightTheme ? 'text-gray-800' : 'text-white'}`}>
                  {analysis}
                </div>
              </div>

              <div className={`p-4 rounded-lg ${isLightTheme ? 'bg-gray-50' : 'bg-gray-700'}`}>
                <h3 className={`text-lg font-semibold mb-2 ${isLightTheme ? 'text-gray-800' : 'text-white'}`}>
                  {t('analytics.transactionSummary')}
                </h3>
                <p className={`${isLightTheme ? 'text-gray-600' : 'text-gray-300'}`}>
                  {t('analytics.totalTransactions')}: {transactions.length}
                </p>
                <p className={`${isLightTheme ? 'text-gray-600' : 'text-gray-300'}`}>
                  {t('analytics.lastUpdated')}: {new Date().toLocaleDateString()}
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