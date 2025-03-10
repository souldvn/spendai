import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useExpenses } from "../contextes/ExpenseContext";
import s from "../styles/components/Analysis.module.sass";

const Analysis: React.FC = () => {
  const router = useRouter();
  const { userId } = router.query; // Получаем userId из URL
  const { expenses, fetchExpenses } = useExpenses(); // Берем расходы из контекста

  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userId) {
      fetchExpenses(); // Загружаем расходы при заходе на страницу
    }
  }, [userId]);

  useEffect(() => {
    if (expenses.length > 0) {
      startAnalysis(); // Запускаем анализ, когда данные загружены
    }
  }, [expenses]);

  const startAnalysis = async () => {
    setIsLoading(true);
    setError(null);
  
    const text = expenses.map((exp) => `${exp.name}: ${exp.value} руб.`).join("\n");
  
    try {
      const response = await fetch("/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, isExpenseAnalysis: true }), // Указываем, что это анализ расходов
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.summary }]);
      } else {
        setError(data.error || "Ошибка анализа");
      }
    } catch (err) {
      setError("Ошибка сервера");
    } finally {
      setIsLoading(false);
    }
  };
  

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;
  
    const newMessage = { role: "user", content: inputText };
  
    setMessages((prev) => [...prev, newMessage]);
    setInputText("");
    setIsLoading(true);
    setError(null);
  
    try {
      const response = await fetch("/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: inputText, isExpenseAnalysis: false }), // Это обычный вопрос, не про финансы
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.summary }]);
      } else {
        setError(data.error || "Ошибка анализа");
      }
    } catch (err) {
      setError("Ошибка сервера");
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className={s.container}>
      <h1>💰 Financial Assistant</h1>

      <div className={s.chatContainer}>
        {messages.map((msg, index) => (
          <div key={index} className={`${s.message} ${msg.role === "user" ? s.userMessage : s.aiMessage}`}>
            <p>{msg.content}</p>
          </div>
        ))}

        {isLoading && <p className={s.loading}>⌛ Анализ...</p>}
        {error && <p className={s.error}>{error}</p>}
      </div>

      <div className={s.inputContainer}>
        <input
          type="text"
          placeholder="Задайте вопрос..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className={s.input}
        />
        <button onClick={handleSendMessage} className={s.sendButton} disabled={isLoading}>
          🚀
        </button>
      </div>
    </div>
  );
};

export default Analysis;
