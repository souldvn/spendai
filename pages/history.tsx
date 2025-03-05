import React, { useState } from "react";
import { useExpenses } from "../contextes/ExpenseContext";
import s from "../styles/pages/history.module.sass";
import Back from "../components/icons/back.svg";
import Modal from "./Modal";

const History: React.FC<{ userId: string | null }> = ({ userId }) => {
  console.log("userId в History:", userId);

  const { expenses, deleteExpense } = useExpenses();
  const [selectedExpense, setSelectedExpense] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Открываем модалку, записываем текущий расход в selectedExpense
  const openModal = (expense: any) => {
    console.log("Открываем модалку для расхода:", expense);
    setSelectedExpense(expense);
    setIsModalOpen(true);
  };

  // Закрываем модалку
  const closeModal = () => {
    console.log("Закрываем модалку");
    setSelectedExpense(null);
    setIsModalOpen(false);
  };

  // Удаление расхода
  const handleDelete = async () => {
    console.log("handleDelete вызван");
    
    if (!selectedExpense) {
      console.log("Ошибка: selectedExpense отсутствует");
      return;
    }

    if (!userId) {
      console.log("Ошибка: userId отсутствует");
      return;
    }

    console.log("Вызываем удаление для:", selectedExpense.id);

    try {
      await deleteExpense(userId, selectedExpense.id);
      console.log("Удаление прошло успешно");
    } catch (error) {
      console.error("Ошибка при удалении:", error);
    }

    closeModal();
  };

  return (
    <div className={s.container}>
      <Back className={s.back} onClick={() => history.back()} />
      <h2 className={s.title}>История расходов</h2>

      {expenses.length === 0 ? (
        <p className={s.empty}>Расходов пока нет.</p>
      ) : (
        <div className={s.list}>
          {expenses.map((expense) => (
            <div key={expense.id} className={s.item} onClick={() => openModal(expense)}>
              <div className={s.colorTag} style={{ backgroundColor: expense.color }} />
              <div className={s.details}>
                <p className={s.name}>{expense.name}</p>
                <p className={s.value}>${expense.value.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && selectedExpense && (
        <Modal onClose={closeModal} onDelete={handleDelete}>
          <h3>Удалить расход "{selectedExpense.name}"?</h3>
        </Modal>
      )}
    </div>
  );
};

export default History;
