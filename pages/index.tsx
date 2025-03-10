import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useExpenses } from "../contextes/ExpenseContext";
import Clocklight from "../components/icons/clocklight.svg";
import Arrowdown from "../components/icons/langchoose.svg";
import Moonlight from "../components/icons/moonlight.svg";
import Plus from "../components/icons/plus.svg";
import Minus from "../components/icons/minus.svg";
import Analysis from "../components/icons/bar-chart-2.svg";
import Notifications from "../components/icons/notifications.svg";
import AddExpense from "@/components/AddExpense";
import s from "../styles/components/Home.module.sass";
import AddFundsModal from "@/components/AddFundsModal";

const Piejs = dynamic(() => import("../components/Pie/Pie"), { ssr: false });

const MainScreen: React.FC = () => {
  const router = useRouter();
  const { expenses, fetchExpenses, balance, fetchBalance, addFunds, updateBalance } = useExpenses();

  const [userId, setUserId] = useState<string | null>(null);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);
  const [isEditingBalance, setIsEditingBalance] = useState(false);
  const [newBalance, setNewBalance] = useState(balance);

  // Состояния для API анализа
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  // Загружаем данные, когда установлен userId
  useEffect(() => {
    if (userId) {
      fetchExpenses();
      fetchBalance();
    }
  }, [userId]);

  // Следим за изменением баланса и обновляем локальный стейт
  useEffect(() => {
    setNewBalance(balance);
  }, [balance]);

  // Обновление баланса
  const handleBalanceChange = () => {
    if (newBalance !== balance) {
      updateBalance(newBalance);
    }
    setIsEditingBalance(false);
  };

  // Переходы с передачей userId
  const navigateWithUserId = (path: string) => {
    if (userId) {
      router.push(`${path}?userId=${userId}`);
    }
  };

  const handleAnalysisClick = () => {
    if (userId) {
      router.push(`/analysis?userId=${userId}`);
    }
  };
  

  // Функция вызова API для анализа
  // const handleAnalysisClick = async () => {
  //   setIsLoading(true);
  //   setError(null);

  //   try {
  //     const response = await fetch("/api/summarize", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ text: "Your expense analysis text goes here." }), // Здесь можно динамически передавать данные
  //     });

  //     const data = await response.json();

  //     if (response.ok) {
  //       setAnalysisResult(data.summary);
  //     } else {
  //       setError(data.error || "Failed to fetch analysis");
  //     }
  //   } catch (err) {
  //     setError("Internal server error");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

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
          <button className={`${s.button} ${s.plus}`} onClick={() => setIsIncomeModalOpen(true)}>
            <Plus />
          </button>
          <button className={`${s.button} ${s.minus}`} onClick={() => setIsExpenseModalOpen(true)}>
            <Minus />
          </button>
        </div>
      </div>

      <div className={s.bottomPanel}>
        <div className={`${s.bottombutton} ${s.analysis}`} onClick={handleAnalysisClick}>
          <Analysis />
          <p>Analysis</p>
        </div>
        <div className={`${s.bottombutton} ${s.noti}`} onClick={() => navigateWithUserId("/notifications")}>
          <Notifications />
          <p>Notifications</p>
        </div>
      </div>

      {/* Модальное окно для добавления расхода */}
      {isExpenseModalOpen && (
        <div className={s.modalOverlay} onClick={() => setIsExpenseModalOpen(false)}>
          <div className={s.modalContent} onClick={(e) => e.stopPropagation()}>
            <AddExpense
              userId={userId || ""}
              onAddExpense={(name, value, color) => console.log("Добавлен расход:", name, value, color)}
              onClose={() => setIsExpenseModalOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Модальное окно для добавления дохода */}
      {isIncomeModalOpen && (
        <div className={s.modalOverlay} onClick={() => setIsIncomeModalOpen(false)}>
          <div className={s.modalContent} onClick={(e) => e.stopPropagation()}>
            <AddFundsModal onClose={() => setIsIncomeModalOpen(false)} />
          </div>
        </div>
      )}

      {/* Отображение результата анализа */}
      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {analysisResult && (
        <div className={s.analysisResult}>
          <h3>Analysis Result:</h3>
          <p>{analysisResult}</p>
        </div>
      )}
    </div>
  );
};

export default MainScreen;
