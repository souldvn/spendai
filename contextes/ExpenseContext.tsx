// context/ExpensesContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";

type Expense = {
  id?: string;
  name: string;
  value: number;
  color: string;
};

type ExpensesContextType = {
  expenses: Expense[];
  addExpense: (userId: string, name: string, value: number, color: string) => Promise<void>;
  fetchExpenses: (userId: string) => Promise<void>;
};

const ExpensesContext = createContext<ExpensesContextType | undefined>(undefined);

export const ExpensesProvider: React.FC<{ children: React.ReactNode; userId: string | null }> = ({ children, userId }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  // Функция для загрузки расходов из Firestore
  const fetchExpenses = async (userId: string) => {
    if (!userId) return;

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
  };

  // Функция для добавления нового расхода
  const addExpense = async (userId: string, name: string, value: number, color: string) => {
    if (!userId) return;

    const docRef = await addDoc(collection(db, "expenses"), {
      userId,
      category: name,
      amount: value,
      color,
      timestamp: new Date(),
    });

    setExpenses((prev) => [...prev, { id: docRef.id, name, value, color }]);
  };

  useEffect(() => {
    if (userId) fetchExpenses(userId);
  }, [userId]);

  return (
    <ExpensesContext.Provider value={{ expenses, addExpense, fetchExpenses }}>
      {children}
    </ExpensesContext.Provider>
  );
};

// Хук для удобного использования контекста
export const useExpenses = () => {
  const context = useContext(ExpensesContext);
  if (!context) {
    throw new Error("useExpenses must be used within an ExpensesProvider");
  }
  return context;
};
