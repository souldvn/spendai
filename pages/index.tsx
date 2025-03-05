import React, { useState } from "react";
import dynamic from "next/dynamic";
import Clocklight from "../components/icons/clocklight.svg";
import Arrowdown from "../components/icons/langchoose.svg";
import Moonlight from "../components/icons/moonlight.svg";
import Plus from "../components/icons/plus.svg";
import Minis from "../components/icons/minus.svg";
import Analysis from "../components/icons/bar-chart-2.svg";
import Notifications from "../components/icons/notifications.svg";
import AddExpense from "@/components/AddExpense";
import ExpenseChart from "@/components/Pie/ExpenseChart";
import s from "../styles/components/Home.module.sass";
import { useRouter } from "next/router";

// Отключаем SSR для Piejs
const Piejs = dynamic(() => import("../components/Pie/Pie"), { ssr: false });

// Тип данных для расходов
type Expense = {
  name: string;
  value: number;
  color: string;
};

const MainScreen: React.FC = () => {
  const route = useRouter();
  const userId = route.query.userId as string | null;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  // Функция для добавления расхода
  const handleAddExpense = (name: string, value: number, color: string) => {
    setExpenses((prev) => [...prev, { name, value, color }]);
    setIsModalOpen(false);
  };

  // Группируем расходы по категориям, суммируя их значения
  const mergedExpenses = expenses.reduce<Expense[]>((acc, expense) => {
    const existing = acc.find((item) => item.name === expense.name);
    if (existing) {
      existing.value += expense.value;
    } else {
      acc.push({ ...expense });
    }
    return acc;
  }, []);

  const router = useRouter();

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
      <div className={s.mainContent}>
        <ExpenseChart userId={userId}/>
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
          <AddExpense userId={userId} onAddExpense={handleAddExpense} onClose={() => setIsModalOpen(false)} />

          </div>
        </div>
      )}
    </div>
  );
};

export default MainScreen;
