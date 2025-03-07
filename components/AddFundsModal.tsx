import React, { useState } from "react";
import s from "../styles/components/AddExpense.module.sass"; // Используем стили от AddExpense
import { useExpenses } from "../contextes/ExpenseContext";

type Props = {
  onClose: () => void;
};

const AddFundsModal: React.FC<Props> = ({ onClose }) => {
  const { addFunds } = useExpenses(); // ✅ Теперь хук вызывается правильно
  const [amount, setAmount] = useState("");

  const handleSaveFunds = () => {
    const value = parseFloat(amount);
    if (isNaN(value) || value <= 0) return;

    addFunds(value);
    onClose();
  };

  return (
    <div className={s.container}>
      <div className={s.window}>
        <p className={s.title}>Add Funds</p>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount..."
          className={s.input}
        />
        <div className={s.buttons}>
          <button className={s.cancel} onClick={onClose}>
            Back
          </button>
          <button className={s.submit} onClick={handleSaveFunds}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddFundsModal;
