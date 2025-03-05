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

  // Загружаем расходы
  const fetchExpenses = async (userId: string) => {
    if (!userId) return;
    setLoading(true);

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
    setLoading(false);
  };

  // Добавление расхода
  const addExpense = async (userId: string, name: string, value: number, color: string) => {
    if (!userId) return;

    await addDoc(collection(db, "expenses"), {
      userId,
      category: name,
      amount: value,
      color,
      timestamp: new Date(),
    });

    await fetchExpenses(userId);
  };

  // Удаление расхода (исправлено)
  const deleteExpense = async (userId: string, expenseId: string) => {
    if (!userId || !expenseId) return;

    console.log("Deleting expense:", expenseId);
    try {
      await deleteDoc(doc(db, "expenses", expenseId));
      await fetchExpenses(userId);
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  // Редактирование расхода (исправлено)
  const updateExpense = async (userId: string, expenseId: string, updatedData: Partial<Expense>) => {
    if (!userId || !expenseId) return;

    console.log("Updating expense:", expenseId, updatedData);
    try {
      await updateDoc(doc(db, "expenses", expenseId), {
        category: updatedData.name,
        amount: updatedData.value,
      });
      await fetchExpenses(userId);
    } catch (error) {
      console.error("Error updating expense:", error);
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
    throw new Error("useExpenses must be used within an ExpensesProvider");
  }
  return context;
};
