import React, { useState } from "react";
import s from "../styles/pages/history.module.sass";
import { useExpenses } from "../contextes/ExpenseContext";
import Back from "../components/icons/back.svg";

const History: React.FC<{ userId: string | null }> = ({ userId }) => {
  const { expenses, deleteExpense, updateExpense, loading } = useExpenses();
  const [editExpense, setEditExpense] = useState<{ id: string; name: string; value: number } | null>(null);

  const handleDelete = async (expenseId: string) => {
    if (userId) {
      console.log("Trying to delete expense:", expenseId);
      await deleteExpense(userId, expenseId);
    }
  };

  const handleEdit = async () => {
    if (userId && editExpense) {
      console.log("Trying to update expense:", editExpense);
      await updateExpense(userId, editExpense.id, {
        name: editExpense.name,
        value: editExpense.value,
      });
      setEditExpense(null);
    }
  };

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
              <button className={s.deleteButton} onClick={() => handleDelete(expense.id)}>
                ❌
              </button>
              <button className={s.editButton} onClick={() => setEditExpense(expense)}>
                ✏️
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Модальное окно редактирования */}
      {editExpense && (
        <div className={s.modalOverlay} onClick={() => setEditExpense(null)}>
          <div className={s.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3>Edit Expense</h3>
            <input
              type="text"
              value={editExpense.name}
              onChange={(e) => setEditExpense({ ...editExpense, name: e.target.value })}
            />
            <input
              type="number"
              value={editExpense.value}
              onChange={(e) => setEditExpense({ ...editExpense, value: Number(e.target.value) })}
            />
            <button onClick={handleEdit}>Save</button>
            <button onClick={() => setEditExpense(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default History;
