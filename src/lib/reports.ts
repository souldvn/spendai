import { Transaction } from '@/types';
import { analyzeFinances } from './financeAI';
import { useTranslation } from '@/hooks/useTranslation';

interface ReportData {
  transactions: Transaction[];
  currentBalance: number;
  currencySymbol: string;
  t: (key: string) => string;
}

export function generateDailyReport({ transactions, currentBalance, currencySymbol, t }: ReportData): string {
  const today = new Date();
  const todayTransactions = transactions.filter(t => {
    const transactionDate = new Date(t.date);
    return transactionDate.toDateString() === today.toDateString();
  });

  const income = todayTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = todayTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const expensesByCategory = todayTransactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

  return analyzeFinances({
    totalIncome: income,
    totalExpenses: expenses,
    expensesByCategory: Object.entries(expensesByCategory).map(([category, amount]) => ({
      category,
      amount
    })),
    currentBalance,
    currencySymbol,
    t
  });
}

export function generateWeeklyReport({ transactions, currentBalance, currencySymbol, t }: ReportData): string {
  const today = new Date();
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - 7);

  const weekTransactions = transactions.filter(t => {
    const transactionDate = new Date(t.date);
    return transactionDate >= weekStart && transactionDate <= today;
  });

  const income = weekTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = weekTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const expensesByCategory = weekTransactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

  return analyzeFinances({
    totalIncome: income,
    totalExpenses: expenses,
    expensesByCategory: Object.entries(expensesByCategory).map(([category, amount]) => ({
      category,
      amount
    })),
    currentBalance,
    currencySymbol,
    t
  });
}

export function generateMonthlyReport({ transactions, currentBalance, currencySymbol, t }: ReportData): string {
  const today = new Date();
  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);

  const monthTransactions = transactions.filter(t => {
    const transactionDate = new Date(t.date);
    return transactionDate >= monthStart && transactionDate <= today;
  });

  const income = monthTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = monthTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const expensesByCategory = monthTransactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

  return analyzeFinances({
    totalIncome: income,
    totalExpenses: expenses,
    expensesByCategory: Object.entries(expensesByCategory).map(([category, amount]) => ({
      category,
      amount
    })),
    currentBalance,
    currencySymbol,
    t
  });
}

export function generateOptimizationReport({ transactions, currentBalance, currencySymbol, t }: ReportData): string {
  const today = new Date();
  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);

  const monthTransactions = transactions.filter(t => {
    const transactionDate = new Date(t.date);
    return transactionDate >= monthStart && transactionDate <= today;
  });

  const expensesByCategory = monthTransactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

  const sortedCategories = Object.entries(expensesByCategory)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);

  let report = `📊 ${t('settings.reports.optimization')}\n\n`;
  report += `${t('settings.reports.topCategories')}:\n`;

  sortedCategories.forEach(([category, amount]) => {
    const percentage = (amount / currentBalance) * 100;
    report += `• ${t(`categories.${category}`)}: ${currencySymbol}${amount.toFixed(2)} (${percentage.toFixed(1)}%)\n`;
  });

  report += `\n💡 ${t('settings.reports.optimizationTips')}:\n`;
  report += `• ${t('settings.reports.tip1')}\n`;
  report += `• ${t('settings.reports.tip2')}\n`;
  report += `• ${t('settings.reports.tip3')}\n`;

  return report;
} 