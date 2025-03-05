import React, { useEffect } from "react";
import s from "../styles/pages/history.module.sass";
import { useExpenses } from "../contextes/ExpenseContext";
import Back from "../components/icons/back.svg";

const History: React.FC<{ userId: string | null }> = ({ userId }) => {
  const { expenses, fetchExpenses, loading } = useExpenses();

  useEffect(() => {
    if (userId) fetchExpenses(userId);
  }, [userId, fetchExpenses]);

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
