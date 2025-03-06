import React, { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  getDoc,
  setDoc,
  increment,
} from "firebase/firestore";

type Expense = {
  id: string;
  name: string;
  value: number;
  color: string;
};

type ExpensesContextType = {
  userId: string | null;
  expenses: Expense[];
  addExpense: (name: string, value: number, color: string) => Promise<void>;
  fetchExpenses: () => Promise<void>;
  deleteExpense: (expenseId: string) => Promise<void>;
  updateExpense: (expenseId: string, updatedData: Partial<Expense>) => Promise<void>;
  loading: boolean;
  balance: number;
  fetchBalance: () => Promise<void>;
  addFunds: (amount: number) => Promise<void>;
};

const ExpensesContext = createContext<ExpensesContextType | undefined>(undefined);

export const ExpensesProvider: React.FC<{ children: React.ReactNode; userId: string | null }> = ({ children, userId }) => {
  const [currentUserId, setCurrentUserId] = useState<string | null>(userId);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [balance, setBalance] = useState<number>(0);

  // Загружаем баланс из Firestore
  const fetchBalance = async () => {
    if (!currentUserId) return;

    try {
      const balanceRef = doc(db, "balances", currentUserId);
      const balanceSnap = await getDoc(balanceRef);

      if (balanceSnap.exists()) {
        setBalance(balanceSnap.data().amount);
      } else {
        await setDoc(balanceRef, { amount: 0 });
        setBalance(0);
      }
    } catch (error) {
      console.error("Ошибка при загрузке баланса:", error);
    }
  };

  // Загружаем расходы
  const fetchExpenses = async () => {
    if (!currentUserId) return;

    setLoading(true);
    try {
      const q = query(collection(db, "expenses"), where("userId", "==", currentUserId));
      const querySnapshot = await getDocs(q);
      const fetchedExpenses: Expense[] = [];

      querySnapshot.forEach((doc) => {
        fetchedExpenses.push({
          id: doc.id,
          name: doc.data().category,
          value: doc.data().amount,
          color: doc.data().color,
        });
      });

      setExpenses(fetchedExpenses);
    } catch (error) {
      console.error("Ошибка загрузки расходов:", error);
    } finally {
      setLoading(false);
    }
  };

  // Добавление нового расхода
  const addExpense = async (name: string, value: number, color: string) => {
    if (!currentUserId) return;

    try {
      await addDoc(collection(db, "expenses"), {
        userId: currentUserId,
        category: name,
        amount: value,
        color,
        timestamp: new Date(),
      });

      // Обновляем баланс в Firestore
      const balanceRef = doc(db, "balances", currentUserId);
      await updateDoc(balanceRef, { amount: increment(-value) });

      await fetchExpenses();
      await fetchBalance();
    } catch (error) {
      console.error("Ошибка при добавлении расхода:", error);
    }
  };

  // Удаление расхода
  const deleteExpense = async (expenseId: string) => {
    if (!currentUserId) return;

    try {
      const expenseRef = doc(db, "expenses", expenseId);
      const expenseSnap = await getDoc(expenseRef);

      if (expenseSnap.exists()) {
        const deletedValue = expenseSnap.data().amount;

        await deleteDoc(expenseRef);

        // Возвращаем удаленный расход обратно в баланс
        const balanceRef = doc(db, "balances", currentUserId);
        await updateDoc(balanceRef, { amount: increment(deletedValue) });

        await fetchExpenses();
        await fetchBalance();
      }
    } catch (error) {
      console.error("Ошибка при удалении расхода:", error);
    }
  };

  // Обновление существующего расхода
  const updateExpense = async (expenseId: string, updatedData: Partial<Expense>) => {
    if (!currentUserId) return;

    try {
      const expenseRef = doc(db, "expenses", expenseId);
      const expenseSnap = await getDoc(expenseRef);

      if (expenseSnap.exists()) {
        const oldValue = expenseSnap.data().amount;
        const newValue = updatedData.value ?? oldValue;
        const diff = oldValue - newValue;

        const firestoreData: Partial<{ category: string; amount: number; color?: string }> = {};
        if (updatedData.name !== undefined) firestoreData.category = updatedData.name;
        if (updatedData.value !== undefined) firestoreData.amount = updatedData.value;
        if (updatedData.color !== undefined) firestoreData.color = updatedData.color;

        await updateDoc(expenseRef, firestoreData);

        // Корректируем баланс
        const balanceRef = doc(db, "balances", currentUserId);
        await updateDoc(balanceRef, { amount: increment(diff) });

        await fetchExpenses();
        await fetchBalance();
      }
    } catch (error) {
      console.error("Ошибка при обновлении расхода:", error);
    }
  };

  // Добавление денег в баланс
  const addFunds = async (amount: number) => {
    if (!currentUserId) return;
  
    try {
      const balanceRef = doc(db, "balances", currentUserId);
      await updateDoc(balanceRef, { amount }); // <-- Заменяем баланс на новое значение
      await fetchBalance();
    } catch (error) {
      console.error("Ошибка при пополнении баланса:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      setCurrentUserId(userId);
      fetchExpenses();
      fetchBalance();
    }
  }, [userId]);

  return (
    <ExpensesContext.Provider
      value={{
        userId: currentUserId,
        expenses,
        addExpense,
        fetchExpenses,
        deleteExpense,
        updateExpense,
        loading,
        balance,
        fetchBalance,
        addFunds,
      }}
    >
      {children}
    </ExpensesContext.Provider>
  );
};

export const useExpenses = () => {
  const context = useContext(ExpensesContext);
  if (!context) {
    throw new Error("useExpenses должен быть использован внутри ExpensesProvider");
  }
  return context;
};
