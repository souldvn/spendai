import React from "react";
import s from "../styles/components/modal.module.sass";

interface ModalProps {
  onClose: () => void;
  onDelete: () => Promise<void>;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, onDelete, children }) => {
  return (
    <div className={s.overlay} onClick={onClose}>
      <div className={s.modal} onClick={(e) => e.stopPropagation()}>
        {children}
        <button
          onClick={async () => {
            console.log("Кнопка Удалить нажата");
            await onDelete();
          }}
        >
          Удалить
        </button>
      </div>
    </div>
  );
};

export default Modal;
