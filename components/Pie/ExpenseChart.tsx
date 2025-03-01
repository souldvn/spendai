import React, { useEffect, useState } from "react";
import { db } from "@/firebaseConfig"; // Убедись, что путь правильный
import { collection, onSnapshot } from "firebase/firestore";
import Piejs from "./Pie";

type ExpenseData = {
  name: string;
  value: number;
  color: string;
};

const ExpenseChart: React.FC = () => {
  const [data, setData] = useState<ExpenseData[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "expenses"), (snapshot) => {
      const expenses: ExpenseData[] = [];

      snapshot.forEach((doc) => {
        const { category, amount, color } = doc.data();
        const existingCategory = expenses.find((exp) => exp.name === category);

        if (existingCategory) {
          existingCategory.value += amount;
        } else {
          expenses.push({ name: category, value: amount, color });
        }
      });

      setData(expenses);
    });

    return () => unsubscribe();
  }, []);

  return <Piejs data={data} />;
};

export default ExpenseChart;
