import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useExpenses } from "../contextes/ExpenseContext";
import Clocklight from "../components/icons/clocklight.svg";
import Arrowdown from "../components/icons/langchoose.svg";
import Moonlight from "../components/icons/moonlight.svg";
import Plus from "../components/icons/plus.svg";
import Minis from "../components/icons/minus.svg";
import Analysis from "../components/icons/bar-chart-2.svg";
import Notifications from "../components/icons/notifications.svg";
import AddExpense from "@/components/AddExpense";
import s from "../styles/components/Home.module.sass";

const Piejs = dynamic(() => import("../components/Pie/Pie"), { ssr: false });

const MainScreen: React.FC = () => {
  const router = useRouter();
  const { expenses, fetchExpenses, balance, fetchBalance, addFunds, setExpenses, setBalance } = useExpenses();

  const [userId, setUserId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditingBalance, setIsEditingBalance] = useState(false);
  const [newBalance, setNewBalance] = useState(balance);

  // Загружаем userId из query или sessionStorage
  useEffect(() => {
    const queryUserId = router.query.userId as string;
    const storedUserId = sessionStorage.getItem("userId");

    if (queryUserId) {
      setUserId(queryUserId);
      sessionStorage.setItem("userId", queryUserId);
    } else if (storedUserId) {
      setUserId(storedUserId);
    }
  }, [router.query.userId]);

  // Загружаем данные после установки userId
  useEffect(() => {
    if (userId) {
      setExpenses([]); // Очищаем список расходов перед загрузкой новых
      setBalance(0); // Очищаем баланс перед загрузкой нового
      fetchExpenses();
      fetchBalance();
    }
  }, [userId]);

  useEffect(() => {
    setNewBalance(balance);
  }, [balance]);

  // Обновление баланса
  const handleBalanceChange = () => {
    if (newBalance !== balance) {
      addFunds(newBalance);
    }
    setIsEditingBalance(false);
  };

  // Функция для переходов с передачей userId
  const navigateWithUserId = (path: string) => {
    if (userId) {
      router.push(`${path}?userId=${userId}`);
    }
  };

  return (
    <div className={s.container}>
      <div className={s.toppanel}>
        <Clocklight className={s.clickable} onClick={() => navigateWithUserId("/history")} />
        <div className={s.lang}>
          EN
          <Arrowdown />
        </div>
        <Moonlight />
      </div>

      {/* Блок с балансом */}
      <div className={s.balanceContainer} onClick={() => setIsEditingBalance(true)}>
        {isEditingBalance ? (
          <input
            type="number"
            className={s.balanceInput}
            value={newBalance}
            onChange={(e) => setNewBalance(Number(e.target.value))}
            onBlur={handleBalanceChange}
            onKeyDown={(e) => e.key === "Enter" && handleBalanceChange()}
            autoFocus
          />
        ) : (
          <p className={s.balanceText}>{newBalance.toLocaleString()}₫</p>
        )}
      </div>

      <div className={s.mainContent}>
        <Piejs data={expenses} />
        <div className={s.buttons}>
          <button className={`${s.button} ${s.minus}`} onClick={() => setIsModalOpen(true)}>
            <Plus />
          </button>
          <button className={`${s.button} ${s.plus}`} onClick={() => setIsModalOpen(true)}>
            <Minis />
          </button>
        </div>
      </div>

      <div className={s.bottomPanel}>
        <div className={`${s.bottombutton} ${s.analysis}`} onClick={() => navigateWithUserId("/analysis")}>
          <Analysis />
          <p>Analysis</p>
        </div>
        <div className={`${s.bottombutton} ${s.noti}`} onClick={() => navigateWithUserId("/notifications")}>
          <Notifications />
          <p>Notifications</p>
        </div>
      </div>

      {isModalOpen && (
        <div className={s.modalOverlay} onClick={() => setIsModalOpen(false)}>
          <div className={s.modalContent} onClick={(e) => e.stopPropagation()}>
            <AddExpense 
              userId={userId || ""} 
              onAddExpense={(name, value, color) => console.log(name, value, color)} 
              onClose={() => setIsModalOpen(false)} 
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MainScreen;
