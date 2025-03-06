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
  userId: string | null;
  expenses: Expense[];
  addExpense: (name: string, value: number, color: string) => Promise<void>;
  fetchExpenses: () => Promise<void>;
  deleteExpense: (expenseId: string) => Promise<void>;
  updateExpense: (expenseId: string, updatedData: Partial<Expense>) => Promise<void>;
  loading: boolean;
};

const ExpensesContext = createContext<ExpensesContextType | undefined>(undefined);

export const ExpensesProvider: React.FC<{ children: React.ReactNode; userId: string | null }> = ({ children, userId }) => {
  const [currentUserId, setCurrentUserId] = useState<string | null>(userId);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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

      await fetchExpenses();
    } catch (error) {
      console.error("Ошибка при добавлении расхода:", error);
    }
  };

  const deleteExpense = async (expenseId: string) => {
    if (!currentUserId) return;

    try {
      const expenseRef = doc(db, "expenses", expenseId);
      await deleteDoc(expenseRef);
      await fetchExpenses();
    } catch (error) {
      console.error("Ошибка при удалении расхода:", error);
    }
  };

  const updateExpense = async (expenseId: string, updatedData: Partial<Expense>) => {
    if (!currentUserId) return;
  
    try {
      const expenseRef = doc(db, "expenses", expenseId);
  
      const firestoreData: Partial<{ category: string; amount: number; color?: string }> = {};
  
      if (updatedData.name !== undefined) firestoreData.category = updatedData.name;
      if (updatedData.value !== undefined) firestoreData.amount = updatedData.value;
      if (updatedData.color !== undefined) firestoreData.color = updatedData.color;
  
      await updateDoc(expenseRef, firestoreData);
      await fetchExpenses();
    } catch (error) {
      console.error("Ошибка при обновлении расхода:", error);
    }
  };
  

  useEffect(() => {
    if (userId) setCurrentUserId(userId);
    if (userId) fetchExpenses();
  }, [userId]);

  return (
    <ExpensesContext.Provider value={{ userId: currentUserId, expenses, addExpense, fetchExpenses, deleteExpense, updateExpense, loading }}>
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
