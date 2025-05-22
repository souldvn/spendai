import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getTranslator } from "./i18n";
import {analyze} from "./reports";

import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  orderBy,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
  setDoc
} from 'firebase/firestore';
import { Transaction } from '@/types';

// Firebase config
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Types
export interface UserReportsSettings {
  daily: boolean;
  weekly: boolean;
  monthly: boolean;
  optimization: boolean;
}

export interface UserSettings {
  userId: string;
  defaultCurrency: 'USD' | 'RUB';
  reports?: UserReportsSettings;
  lastUpdated: Date;
  language?: 'en' | 'ru';
  currencySymbol?: string;
  currencyRate?: number;
}

export interface UserBalance {
  userId: string;
  balance: number;
  lastUpdated: Date;
}

// User settings



export function filterTransactionsByPeriod(
  transactions: Transaction[], 
  period: 'day' | 'week' | 'month'
): Transaction[] {
  const now = new Date();
  let startDate: Date;

  switch (period) {
    case 'day':
      startDate = new Date(now.setHours(0, 0, 0, 0));
      break;
    case 'week':
      const day = now.getDay();
      const diff = now.getDate() - day + (day === 0 ? -6 : 1);
      startDate = new Date(now.setDate(diff));
      startDate.setHours(0, 0, 0, 0);
      break;
    case 'month':
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    default:
      startDate = new Date(0); // Все транзакции
  }

  return transactions.filter(t => t.date >= startDate);
}
export async function getUserSettings(userId: string): Promise<UserSettings | null> {
  try {
    const settingsRef = doc(db, 'userSettings', userId);
    const settingsDoc = await getDoc(settingsRef);

    if (settingsDoc.exists()) {
      const data = settingsDoc.data();
      return {
        userId,
        defaultCurrency: data.defaultCurrency || 'USD',
        reports: data.reports || {
          daily: false,
          weekly: false,
          monthly: false,
          optimization: false
        },
        lastUpdated: data.lastUpdated?.toDate() || new Date()
      };
    }
    return null;
  } catch (error) {
    console.error('Error getting user settings:', error);
    return null;
  }
}

// firebaseConfig.ts
export async function getAllUsersReportsSettings() {
  const snapshot = await getDocs(collection(db, 'userSettings'));
  const users = snapshot.docs.map(doc => {
    const data = doc.data();
    return {
      userId: data.userId, // берём userId из самого документа
      reports: data.reports,
      defaultCurrency: data.defaultCurrency,
      // добавь другие нужные поля, если нужно
    };
  });
  

  console.log('[getAllUsersReportsSettings] Пользователи с отчетами:', users);
  return users;
}



export async function getUserReportContent(userId: string, type: 'daily' | 'weekly' | 'monthly') {
  // Пример простой заглушки:
  return `Ваш ${type} отчёт готов! (пока без реальных данных)`;
}


export async function updateUserSettings(userId: string, data: Partial<UserSettings>): Promise<void> {
  try {
    const settingsRef = doc(db, 'userSettings', userId);
    await setDoc(settingsRef, {
      ...data,
      userId,
      lastUpdated: new Date()
    }, { merge: true });
  } catch (error) {
    console.error('Error updating user settings:', error);
  }
}

export async function getUserReportsSettings(userId: string): Promise<UserReportsSettings | null> {
  const settings = await getUserSettings(userId);
  return settings?.reports || null;
}

export async function updateUserReportsSettings(userId: string, reports: UserReportsSettings): Promise<void> {
  await updateUserSettings(userId, { reports });
}

// Transactions
export async function getUserTransactions(userId: string): Promise<Transaction[]> {
  try {
    if (!userId) return [];

    const q = query(
      collection(db, 'transactions'),
      where('userId', '==', userId),
      orderBy('date', 'desc')
    );

    const querySnapshot = await getDocs(q);

    const transactions = querySnapshot.docs.map(doc => {
      const data = doc.data();

      let transactionDate = new Date();
      if (data.date?.toDate) transactionDate = data.date.toDate();
      else if (typeof data.date === 'string') transactionDate = new Date(data.date);

      return {
        id: doc.id,
        userId: data.userId,
        amount: Number(data.amount),
        type: data.type || (Number(data.amount) >= 0 ? 'income' : 'expense'),
        category: data.category || 'Uncategorized',
        color: data.color || '#8B5CF6',
        date: transactionDate
      };
    });

    return transactions;
  } catch (error) {
    console.error('Error getting transactions:', error);
    return [];
  }
}

export async function addTransaction(userId: string, amount: number, category: string, color: string): Promise<void> {
  try {
    const transaction: Omit<Transaction, 'id'> = {
      userId,
      amount,
      type: amount >= 0 ? 'income' : 'expense',
      category,
      color,
      date: new Date()
    };

    await addDoc(collection(db, 'transactions'), transaction);
    await updateBalanceOnTransaction(userId, amount);
  } catch (error) {
    console.error('Error adding transaction:', error);
  }
}

export async function updateTransaction(transactionId: string, newAmount: number): Promise<void> {
  try {
    const transactionRef = doc(db, 'transactions', transactionId);
    const transactionDoc = await getDoc(transactionRef);

    if (!transactionDoc.exists()) throw new Error('Transaction not found');

    const oldAmount = transactionDoc.data().amount;
    const amountDiff = newAmount - oldAmount;

    await updateDoc(transactionRef, {
      amount: newAmount,
      type: newAmount >= 0 ? 'income' : 'expense'
    });

    await updateBalanceOnTransaction(transactionDoc.data().userId, amountDiff);
  } catch (error) {
    console.error('Error updating transaction:', error);
  }
}

export async function deleteTransaction(transactionId: string): Promise<void> {
  try {
    const transactionRef = doc(db, 'transactions', transactionId);
    const transactionDoc = await getDoc(transactionRef);

    if (!transactionDoc.exists()) throw new Error('Transaction not found');

    const transactionData = transactionDoc.data();
    await deleteDoc(transactionRef);

    await updateBalanceOnTransaction(transactionData.userId, -transactionData.amount);
  } catch (error) {
    console.error('Error deleting transaction:', error);
  }
}

// Balance
export async function getUserBalance(userId: string): Promise<number> {
  try {
    const userBalanceRef = doc(db, 'userBalances', userId);
    const userBalanceDoc = await getDoc(userBalanceRef);

    if (userBalanceDoc.exists()) return userBalanceDoc.data().balance;

    const transactions = await getUserTransactions(userId);
    const calculatedBalance = transactions.reduce((sum, t) => sum + t.amount, 0);

    await setDoc(userBalanceRef, {
      userId,
      balance: calculatedBalance,
      lastUpdated: new Date()
    });

    return calculatedBalance;
  } catch (error) {
    console.error('Error getting user balance:', error);
    return 0;
  }
}

export async function updateUserBalance(userId: string, newBalance: number): Promise<void> {
  try {
    const userBalanceRef = doc(db, 'userBalances', userId);
    await setDoc(userBalanceRef, {
      userId,
      balance: newBalance,
      lastUpdated: new Date()
    });
  } catch (error) {
    console.error('Error updating user balance:', error);
  }
}

export async function generateUserReport(
  userId: string,
  reportType: 'daily' | 'weekly' | 'monthly'
): Promise<string> {
  try {
    // 1. Получаем данные
    const [allTransactions, settings, balance] = await Promise.all([
      getUserTransactions(userId),
      getUserSettings(userId),
      getUserBalance(userId)
    ]);

    // Проверка данных
    if (!settings?.defaultCurrency) {
      throw new Error('User settings not found');
    }

    if (isNaN(Number(balance))) {
      throw new Error(`Invalid balance: ${balance}`);
    }

    const isRub = settings.defaultCurrency === 'RUB';
    const currencySymbol = isRub ? '₽' : '$';
    const exchangeRate = 80;

    // 2. Фильтрация транзакций по периоду
    const periodMap = {
      daily: 'day',
      weekly: 'week',
      monthly: 'month'
    };
    
    const filteredTransactions = filterTransactionsByPeriod(
      allTransactions,
      periodMap[reportType] as 'day' | 'week' | 'month'
    );

    // 3. Анализ данных
    const {
      income = 0,
      expenses = 0,
      expensesByCategory = {}
    } = analyzeTransactions(filteredTransactions) || {};

    // Преобразование валют
    const convertedIncome = isRub ? income * exchangeRate : income;
    const convertedExpenses = isRub ? expenses * exchangeRate : expenses;
    const convertedBalance = isRub ? Number(balance) * exchangeRate : Number(balance);

    const convertedExpensesByCategory: Record<string, number> = {};
    for (const [category, amount] of Object.entries(expensesByCategory)) {
      convertedExpensesByCategory[category] = isRub ? amount * exchangeRate : amount;
    }

    // 4. Формирование отчёта
    let report = `📊 ${reportType === 'daily' ? 'Daily' : reportType === 'weekly' ? 'Weekly' : 'Monthly'} Report\n`;
    report += '——————————————\n';
    report += `💰 Balance: ${convertedBalance.toFixed(2)} ${currencySymbol}\n`;
    report += `📈 Income: ${convertedIncome.toFixed(2)} ${currencySymbol}\n`;
    report += `📉 Expenses: ${convertedExpenses.toFixed(2)} ${currencySymbol}\n`;

    // Сбережения
    if (convertedIncome > 0) {
      const savingsRate = ((convertedIncome - convertedExpenses) / convertedIncome) * 100;
      report += `💵 Savings Rate: ${savingsRate.toFixed(1)}%\n`;
    }

    // Топ категорий расходов
    const topCategories = Object.entries(convertedExpensesByCategory)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([cat, amount]) => ({
        category: cat,
        amount,
        percentage: convertedExpenses > 0 ? (amount / convertedExpenses) * 100 : 0
      }));

    if (topCategories.length > 0) {
      report += '——————————————\n';
      report += '🏷️ Top Categories:\n';
      topCategories.forEach((cat, i) => {
        report += `${i + 1}. ${cat.category}: ${cat.amount.toFixed(2)} ${currencySymbol} (${cat.percentage.toFixed(1)}%)\n`;
      });
    }

    // Финансовые рекомендации
    report += '——————————————\n';
    if (convertedIncome > 0 && convertedExpenses / convertedIncome > 0.8) {
      report += '⚠️ High spending level detected\n';
    }

    const coverage = convertedExpenses > 0 ? convertedBalance / convertedExpenses : 0;
    if (coverage < 3) {
      report += `ℹ️ Emergency fund covers ${coverage.toFixed(1)} months\n`;
    }

    return report;

  } catch (error) {
    console.error('Report generation failed:', error);
    return '❌ Could not generate report. Please try again later.';
  }
}


// Новая безопасная функция анализа
function analyzeTransactions(transactions: Transaction[]) {
  try {
    let income = 0;
    let expenses = 0;
    const byCategory: Record<string, number> = {};

    transactions.forEach(t => {
      const amount = Number(t.amount) || 0;
      if (amount > 0) {
        income += amount;
      } else {
        const absAmount = Math.abs(amount);
        expenses += absAmount;
        byCategory[t.category] = (byCategory[t.category] || 0) + absAmount;
      }
    });

    return { income, expenses, expensesByCategory: byCategory };
  } catch (error) {
    console.error('Transaction analysis failed:', error);
    return { income: 0, expenses: 0, expensesByCategory: {} };
  }
}




export async function getUsersWithEnabledReports(): Promise<{userId: string; reports: UserReportsSettings}[]> {
  try {
    const snapshot = await getDocs(collection(db, 'userSettings'));
    
    return snapshot.docs
      .filter(doc => {
        const data = doc.data();
        return data.reports?.daily || data.reports?.weekly || data.reports?.monthly;
      })
      .map(doc => ({
        userId: doc.id,
        reports: doc.data().reports as UserReportsSettings
      }));
  } catch (error) {
    console.error('Error getting users with reports:', error);
    return [];
  }
}

export async function updateBalanceOnTransaction(userId: string, amount: number): Promise<void> {
  try {
    const currentBalance = await getUserBalance(userId);
    await updateUserBalance(userId, currentBalance + amount);
  } catch (error) {
    console.error('Error updating balance on transaction:', error);
  }
}
