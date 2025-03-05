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

const AddExpense: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { addExpense } = useExpenses();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [amount, setAmount] = useState("");

  const handleSaveExpense = async () => {
    if (!amount || !selectedCategory) return;

    const category = categories.find((c) => c.name === selectedCategory);
    if (!category) return;

    await addExpense("userId", selectedCategory, parseFloat(amount), category.color);
    onClose();
  };

  return (
    <div className={s.container}>
      {/* Остальной код */}
    </div>
  );
};

export default AddExpense;
