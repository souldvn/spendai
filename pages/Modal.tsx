import React, { useState } from "react";
import s from "../styles/components/modal.module.sass";

interface ModalProps {
  onClose: () => void;
  onDelete: () => Promise<void>;
  onUpdate: (newValue: number) => Promise<void>;
  initialValue: number;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, onDelete, onUpdate, initialValue, children }) => {
  const [newValue, setNewValue] = useState(initialValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewValue(Number(e.target.value));
  };

  return (
    <div className={s.overlay} onClick={onClose}>
      <div className={s.modal} onClick={(e) => e.stopPropagation()}>
        {children}
        <input 
          type="number" 
          value={newValue} 
          onChange={handleChange} 
          className={s.input}
        />
        <div className={s.buttons}>
          <button className={s.update} onClick={() => onUpdate(newValue)}>Обновить</button>
          <button className={s.delete} onClick={onDelete}>Удалить</button>
          <button className={s.close} onClick={onClose}>Закрыть</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
