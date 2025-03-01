import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import s from "../styles/pages/history.module.sass";
import Back from "../components/icons/back.svg";

// Тип данных для расходов
type Expense = {
  id: string;
  name: string;
  value: number;
  color: string;
};

const History: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    const q = query(collection(db, "expenses"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const expensesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().category,
        value: doc.data().amount,
        color: doc.data().color,
      }));
      setExpenses(expensesData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className={s.container}>
      <Back className={s.back} onClick={() => history.back()} />
      <h2 className={s.title}>Expense History</h2>
      {expenses.length === 0 ? (
        <p className={s.empty}>No expenses yet.</p>
      ) : (
        <div className={s.list}>
          {expenses.map((expense) => (
            <div key={expense.id} className={s.item}>
              <div
                className={s.colorTag}
                style={{ backgroundColor: expense.color }}
              />
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
