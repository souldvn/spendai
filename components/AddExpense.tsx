import React, { useState } from "react";
import { db } from "../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import s from "../styles/components/AddExpense.module.sass";

// Категории расходов
const categories = [
  { name: "Transport", color: "#FFC107" },
  { name: "Food", color: "#FF5722" },
  { name: "Entertainment", color: "#9C27B0" },
  { name: "Outfit", color: "#2196F3" },
  { name: "Gifts", color: "#E91E63" },
  { name: "Subscriptions", color: "#4CAF50" },
  { name: "Education", color: "#03A9F4" },
  { name: "Health", color: "#8BC34A" },
  { name: "Household", color: "#FF9800" },
  { name: "Transfer", color: "#795548" },
  { name: "Lending", color: "#607D8B" },
  { name: "Other", color: "#000000" },
];

type Props = {
  onAddExpense: (name: string, value: number, color: string) => void;
  onClose: () => void; // Добавил сюда onClose
};

const AddExpense: React.FC<Props> = ({ onAddExpense, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [amount, setAmount] = useState("");

  const handleSaveExpense = async () => {
    if (!amount || !selectedCategory) return;

    const category = categories.find((c) => c.name === selectedCategory);
    if (!category) return;

    try {
      await addDoc(collection(db, "expenses"), {
        category: selectedCategory,
        amount: parseFloat(amount),
        color: category.color,
        timestamp: new Date(),
      });

      // Сбрасываем поля
      setSelectedCategory(null);
      setAmount("");

      // Закрываем модалку после успешного сохранения
      onClose();
    } catch (error) {
      console.error("Error adding expense: ", error);
    }
  };

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
              <button className={s.submit} onClick={handleSaveExpense}>
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
