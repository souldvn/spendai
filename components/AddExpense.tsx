import React, { useState } from "react";
import s from "../styles/components/AddExpense.module.sass";

// Категории расходов
const categories = [
  { name: "Transport", color: "#FFC107" }, // Желтый
  { name: "Food", color: "#FF5722" }, // Оранжевый
  { name: "Entertainment", color: "#9C27B0" }, // Фиолетовый
  { name: "Outfit", color: "#2196F3" }, // Синий
  { name: "Gifts", color: "#E91E63" }, // Розовый
  { name: "Subscriptions", color: "#4CAF50" }, // Зеленый
  { name: "Education", color: "#03A9F4" }, // Голубой
  { name: "Health", color: "#8BC34A" }, // Светло-зеленый
  { name: "Household", color: "#FF9800" }, // Темно-оранжевый
  { name: "Transfer", color: "#795548" }, // Коричневый
  { name: "Lending", color: "#607D8B" }, // Серый
  { name: "Other", color: "#000000" }, // Черный
];

type Props = {
  onAddExpense: (name: string, value: number, color: string) => void;
};

const AddExpense: React.FC<Props> = ({ onAddExpense }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [amount, setAmount] = useState("");

  return (
    <div className={s.container}>
      <div className={s.window}>
        {!selectedCategory ? (
          <>
            <p className={s.title}>Add Expense</p>
            <div className={s.table}>
              {categories.map((category) => (
                <button
                  key={category.name}
                  className={s.point}
                  onClick={() => setSelectedCategory(category.name)}
                >
                  <div style={{ backgroundColor: category.color }} className={s.round}></div>
                  <p>{category.name}</p>
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className={s.amountInput}>
            <p className={s.title}>Enter Amount for {selectedCategory}</p>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount..."
              className={s.input}
            />
            <div className={s.buttons}>
              <button className={s.cancel} onClick={() => setSelectedCategory(null)}>
                Back
              </button>
              <button
                className={s.submit}
                onClick={() => {
                  if (amount && selectedCategory) {
                    const category = categories.find((c) => c.name === selectedCategory);
                    if (category) {
                      onAddExpense(selectedCategory, parseFloat(amount), category.color);
                      setSelectedCategory(null);
                      setAmount("");
                    }
                  }
                }}
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddExpense;
