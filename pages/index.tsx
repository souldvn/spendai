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
  const userId = (router.query.userId as string | null) || "test-user";
  const { expenses, fetchExpenses, balance, fetchBalance, addFunds } = useExpenses();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditingBalance, setIsEditingBalance] = useState(false);
  const [newBalance, setNewBalance] = useState(balance);

  useEffect(() => {
    if (userId) {
      fetchExpenses();
      fetchBalance();
    }

    const handleRouteChange = () => {
      fetchExpenses();
      fetchBalance();
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [userId, router]);

  useEffect(() => {
    setNewBalance(balance);
  }, [balance]);

  // Функция обновления баланса
  const handleBalanceChange = () => {
    if (newBalance !== balance) {
      addFunds(newBalance);
    }
    setIsEditingBalance(false);
  };

  return (
    <div className={s.container}>
      <div className={s.toppanel}>
        <Clocklight className={s.clickable} onClick={() => router.push("/history")} />
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
        <div className={`${s.bottombutton} ${s.analysis}`}>
          <Analysis />
          <p>Analysis</p>
        </div>
        <div className={`${s.bottombutton} ${s.noti}`}>
          <Notifications />
          <p>Notifications</p>
        </div>
      </div>

      {isModalOpen && (
        <div className={s.modalOverlay} onClick={() => setIsModalOpen(false)}>
          <div className={s.modalContent} onClick={(e) => e.stopPropagation()}>
            <AddExpense 
              userId={userId} 
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
