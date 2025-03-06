import React, { useState } from "react";
import { useExpenses } from "../contextes/ExpenseContext";
import s from "../styles/pages/history.module.sass";
import Back from "../components/icons/back.svg";
import Modal from "./Modal";

const History: React.FC = () => {
  const { userId, expenses, deleteExpense, updateExpense } = useExpenses();
  const [selectedExpense, setSelectedExpense] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log("userId в History:", userId);

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
    if (!selectedExpense) return;

    console.log("Удаляем:", selectedExpense.id);
    try {
      await deleteExpense(selectedExpense.id);
    } catch (error) {
      console.error("Ошибка при удалении:", error);
    }

    closeModal();
  };

  // Обновление расхода
  const handleUpdate = async (newValue: number) => {
    if (!selectedExpense) return;
  
    console.log("Обновляем:", selectedExpense.id, "на", newValue);
    
    try {
      await updateExpense(selectedExpense.id, { value: newValue }); // Передаём объект с `value`
    } catch (error) {
      console.error("Ошибка при обновлении:", error);
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
        <Modal 
          onClose={closeModal} 
          onDelete={handleDelete} 
          onUpdate={handleUpdate}
          initialValue={selectedExpense.value}
        >
          <h3>Редактировать "{selectedExpense.name}"</h3>
        </Modal>
      )}
    </div>
  );
};

export default History;
