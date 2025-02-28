import React, { useState } from "react";
import s from "../styles/pages/history.module.sass";

// Тип данных для расходов
type Expense = {
  name: string;
  value: number;
  color: string;
};

const History: React.FC = () => {
  // Временное состояние для хранения расходов (замени на хук, если используешь глобальное состояние)
  const [expenses, setExpenses] = useState<Expense[]>([
    { name: "Food", value: 500, color: "#FF5722" },
    { name: "Transport", value: 200, color: "#FFC107" },
    { name: "Entertainment", value: 300, color: "#9C27B0" },
  ]);

  return (
    <div className={s.container}>
      <h2 className={s.title}>Expense History</h2>
      {expenses.length === 0 ? (
        <p className={s.empty}>No expenses yet.</p>
      ) : (
        <div className={s.list}>
          {expenses.map((expense, index) => (
            <div key={index} className={s.item}>
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
