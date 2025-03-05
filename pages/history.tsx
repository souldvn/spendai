import React, { useEffect, useState } from "react";
import s from "../styles/pages/history.module.sass";
import { db } from "../firebaseConfig";

import { collection, query, where, getDocs } from "firebase/firestore";

import Back from "../components/icons/back.svg";

type Expense = {
  id: string;
  name: string;
  value: number;
  color: string;
};

const History: React.FC<{ userId: string | null }> = ({ userId }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setExpenses([]);
      setLoading(false);
      return;
    }

    const fetchExpenses = async () => {
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

    fetchExpenses();
  }, [userId]);

  return (
    <div className={s.container}>
      <Back className={s.back} onClick={() => history.back()} />
      <h2 className={s.title}>Expense History</h2>
      {loading ? (
        <p>Loading...</p>
      ) : expenses.length === 0 ? (
        <p className={s.empty}>No expenses yet.</p>
      ) : (
        <div className={s.list}>
          {expenses.map((expense) => (
            <div key={expense.id} className={s.item}>
              <div className={s.colorTag} style={{ backgroundColor: expense.color }} />
              <div className={s.details}>
                <p className={s.name}>{expense.name}</p>
                <p className={s.value}>${expense.value.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
