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

export async function updateBalanceOnTransaction(userId: string, amount: number): Promise<void> {
  try {
    const currentBalance = await getUserBalance(userId);
    await updateUserBalance(userId, currentBalance + amount);
  } catch (error) {
    console.error('Error updating balance on transaction:', error);
  }
}
