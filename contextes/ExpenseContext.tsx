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
} from "firebase/firestore";

type Expense = {
  id: string;
  name: string;
  value: number;
  color: string;
};

type ExpensesContextType = {
  expenses: Expense[];
  addExpense: (userId: string, name: string, value: number, color: string) => Promise<void>;
  fetchExpenses: (userId: string) => Promise<void>;
  deleteExpense: (userId: string, expenseId: string) => Promise<void>;
  updateExpense: (userId: string, expenseId: string, updatedData: Partial<Expense>) => Promise<void>;
  loading: boolean;
};

const ExpensesContext = createContext<ExpensesContextType | undefined>(undefined);

export const ExpensesProvider: React.FC<{ children: React.ReactNode; userId: string | null }> = ({ children, userId }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // 🔹 Загружаем расходы из Firestore
  const fetchExpenses = async (userId: string) => {
    if (!userId) return;
    setLoading(true);

    try {
      const q = query(collection(db, "expenses"), where("userId", "==", userId));
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

  // 🔹 Добавление нового расхода
  const addExpense = async (userId: string, name: string, value: number, color: string) => {
    if (!userId) return;

    try {
      await addDoc(collection(db, "expenses"), {
        userId,
        category: name,
        amount: value,
        color,
        timestamp: new Date(),
      });

      await fetchExpenses(userId);
    } catch (error) {
      console.error("Ошибка при добавлении расхода:", error);
    }
  };

  // 🔹 Удаление расхода
  const deleteExpense = async (userId: string, expenseId: string) => {
    console.log("Удаление расхода", expenseId);
    try {
      const expenseRef = doc(db, "expenses", expenseId);
      await deleteDoc(expenseRef);
      await fetchExpenses(userId);
    } catch (error) {
      console.error("Ошибка при удалении расхода:", error);
    }
  };

  // 🔹 Обновление расхода
  const updateExpense = async (userId: string, expenseId: string, updatedData: Partial<Expense>) => {
    try {
      const expenseRef = doc(db, "expenses", expenseId);
      await updateDoc(expenseRef, updatedData);
      await fetchExpenses(userId);
    } catch (error) {
      console.error("Ошибка при обновлении расхода:", error);
    }
  };

  useEffect(() => {
    if (userId) fetchExpenses(userId);
  }, [userId]);

  return (
    <ExpensesContext.Provider value={{ expenses, addExpense, fetchExpenses, deleteExpense, updateExpense, loading }}>
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
