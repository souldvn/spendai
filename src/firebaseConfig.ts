import { initializeApp } from "firebase/app";

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
  try {
    const snapshot = await getDocs(collection(db, 'userReportsSettings'));
    return snapshot.docs.map(doc => ({ userId: doc.id, reports: doc.data() }));
  } catch (error) {
    console.error('Error getting all users reports settings:', error);
    return [];
  }
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
    // Получаем все транзакции пользователя
    const allTransactions = await getUserTransactions(userId);
    
    // Определяем период для фильтрации
    const periodMap = {
      daily: 'day',
      weekly: 'week',
      monthly: 'month'
    };
    
    // Фильтруем транзакции
    const filteredTransactions = filterTransactionsByPeriod(
      allTransactions,
      periodMap[reportType] as 'day' | 'week' | 'month'
    );

    // Получаем настройки пользователя
    const settings = await getUserSettings(userId);
    const currencySymbol = settings?.defaultCurrency === 'USD' ? '$' : '₽';
    
    // Анализируем данные (используем логику из вашего компонента Analytics)
    const totalExpenses = filteredTransactions
      .filter(t => t.amount < 0)
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    const totalIncome = filteredTransactions
      .filter(t => t.amount > 0)
      .reduce((sum, t) => sum + t.amount, 0);

    const balance = await getUserBalance(userId);

    // Анализ категорий (аналогично вашему коду)
    const expensesByCategory = filteredTransactions
      .filter(t => t.amount < 0)
      .reduce((acc: {category: string; amount: number}[], t) => {
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

    const topCategories = expensesByCategory
      .map(({category, amount}) => ({
        category,
        amount,
        percentage: totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0
      }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 3);

    // Формируем текст отчёта
    let reportText = `📊 ${reportType === 'daily' ? 'Ежедневный' : 
                     reportType === 'weekly' ? 'Еженедельный' : 'Ежемесячный'} отчёт\n`;
    reportText += '——————————————\n';
    reportText += `💰 Баланс: ${balance.toFixed(2)} ${currencySymbol}\n`;
    reportText += `📈 Доходы: ${totalIncome.toFixed(2)} ${currencySymbol}\n`;
    reportText += `📉 Расходы: ${totalExpenses.toFixed(2)} ${currencySymbol}\n`;
    
    if (totalIncome > 0) {
      const savingsRate = ((totalIncome - totalExpenses) / totalIncome) * 100;
      reportText += `💵 Накопления: ${savingsRate.toFixed(1)}%\n`;
    }
    
    reportText += '——————————————\n';
    reportText += `💳 Операций: ${filteredTransactions.length}\n`;
    
    if (topCategories.length > 0) {
      reportText += '🏷️ Топ категории:\n';
      topCategories.forEach((cat, i) => {
        reportText += `${i+1}. ${cat.category}: ${cat.amount.toFixed(2)} ${currencySymbol} (${cat.percentage.toFixed(1)}%)\n`;
      });
    }
    
    reportText += '——————————————\n';
    
    // Добавляем анализ финансового здоровья (из вашего кода)
    const expenseRatio = totalIncome > 0 ? totalExpenses / totalIncome : 0;
    const balanceCoverage = totalExpenses > 0 ? balance / totalExpenses : 0;
    
    if (expenseRatio > 0.8) {
      reportText += '⚠️ Высокий уровень расходов\n';
    } else if (expenseRatio < 0.5) {
      reportText += '✅ Хороший уровень накоплений\n';
    }
    
    if (balanceCoverage < 3) {
      reportText += `ℹ️ Финансовая подушка: ${balanceCoverage.toFixed(1)} мес.\n`;
    }

    return reportText;
  } catch (error) {
    console.error('Error generating report:', error);
    return '❌ Не удалось сформировать отчёт. Пожалуйста, попробуйте позже.';
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
