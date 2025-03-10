import React, { useState } from "react";
import { useExpenses } from "../contextes/ExpenseContext";
import s from "../styles/components/AddExpense.module.sass";

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
  userId: string | null;
  onAddExpense: (name: string, value: number, color: string) => void;
  onClose: () => void;
};

const AddExpense: React.FC<Props> = ({ userId, onAddExpense, onClose }) => {
  const { addExpense } = useExpenses();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [amount, setAmount] = useState("");

  const handleSaveExpense = async () => {
    if (!amount || !selectedCategory || !userId) return;
  
    const value = parseFloat(amount);
    if (isNaN(value)) return; // Проверяем, что число корректное
  
    const category = categories.find((c) => c.name === selectedCategory);
    if (!category) return;
    
    await addExpense(selectedCategory, parseFloat(amount), category.color);
  
    onClose();
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
              <button className={s.cancel} onClick={() => setSelectedCategory(null)}>Back</button>
              <button className={s.submit} onClick={handleSaveExpense}>Save</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddExpense;
