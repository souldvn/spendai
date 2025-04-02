import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, query, where, getDocs, orderBy, doc, updateDoc, deleteDoc, getDoc, setDoc } from 'firebase/firestore';
import { Transaction } from '@/types';

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

export interface UserBalance {
  userId: string;
  balance: number;
  lastUpdated: Date;
}

export async function getUserTransactions(userId: string): Promise<Transaction[]> {
  try {
    if (!userId) {
      console.error('No userId provided');
      return [];
    }

    console.log('Fetching transactions for userId:', userId);
    const q = query(
      collection(db, 'transactions'),
      where('userId', '==', userId),
      orderBy('date', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    console.log('Found transactions:', querySnapshot.size);
    
    const transactions = querySnapshot.docs.map(doc => {
      const data = doc.data();
      console.log('Transaction data:', data);
      
      // Handle date conversion
      let transactionDate = new Date();
      if (data.date) {
        if (data.date.toDate) {
          transactionDate = data.date.toDate();
        } else if (data.date instanceof Date) {
          transactionDate = data.date;
        } else if (typeof data.date === 'string') {
          transactionDate = new Date(data.date);
        }
      }

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
    
    console.log('Processed transactions:', transactions);
    return transactions;
  } catch (error) {
    console.error('Error getting transactions:', error);
    return [];
  }
}

export async function addTransaction(userId: string, amount: number, category: string, color: string): Promise<void> {
  try {
    if (!userId) {
      console.error('No userId provided');
      return;
    }

    const transaction: Omit<Transaction, 'id'> = {
      userId,
      amount: Number(amount),
      type: Number(amount) >= 0 ? 'income' : 'expense',
      category: category || 'Uncategorized',
      color: color || '#8B5CF6',
      date: new Date()
    };

    await addDoc(collection(db, 'transactions'), transaction);
    await updateBalanceOnTransaction(userId, amount);
  } catch (error) {
    console.error('Error adding transaction:', error);
    throw error;
  }
}

export async function updateTransaction(transactionId: string, newAmount: number): Promise<void> {
  try {
    const transactionRef = doc(db, 'transactions', transactionId);
    const transactionDoc = await getDoc(transactionRef);
    
    if (!transactionDoc.exists()) {
      throw new Error('Transaction not found');
    }

    const oldAmount = transactionDoc.data().amount;
    const amountDiff = newAmount - oldAmount;

    await updateDoc(transactionRef, {
      amount: newAmount,
      type: newAmount >= 0 ? 'income' : 'expense'
    });

    // Update user balance
    await updateBalanceOnTransaction(transactionDoc.data().userId, amountDiff);
  } catch (error) {
    console.error('Error updating transaction:', error);
    throw error;
  }
}

export async function deleteTransaction(transactionId: string): Promise<void> {
  try {
    const transactionRef = doc(db, 'transactions', transactionId);
    const transactionDoc = await getDoc(transactionRef);
    
    if (!transactionDoc.exists()) {
      throw new Error('Transaction not found');
    }

    const transactionData = transactionDoc.data();
    await deleteDoc(transactionRef);

    // Update user balance by subtracting the transaction amount
    await updateBalanceOnTransaction(transactionData.userId, -transactionData.amount);
  } catch (error) {
    console.error('Error deleting transaction:', error);
    throw error;
  }
}

// Get user balance
export async function getUserBalance(userId: string): Promise<number> {
  try {
    const userBalanceRef = doc(db, 'userBalances', userId);
    const userBalanceDoc = await getDoc(userBalanceRef);
    
    if (userBalanceDoc.exists()) {
      return userBalanceDoc.data().balance;
    }
    
    // If no balance exists, calculate from transactions
    const transactions = await getUserTransactions(userId);
    const calculatedBalance = transactions.reduce((sum, t) => sum + t.amount, 0);
    
    // Save calculated balance
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

// Update user balance
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

// Update balance when transaction is added
export async function updateBalanceOnTransaction(userId: string, amount: number): Promise<void> {
  try {
    const currentBalance = await getUserBalance(userId);
    await updateUserBalance(userId, currentBalance + amount);
  } catch (error) {
    console.error('Error updating balance on transaction:', error);
  }
}

export default app;
