import { useEffect, useState } from "react";
import "../styles/global.sass";
import type { AppProps } from "next/app";
import { ExpensesProvider } from "../contextes/ExpenseContext";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    if (router.isReady) {
      const id = (router.query.userId as string | undefined) || "test-user"; // 👈 Добавляем fallback
      setUserId(id);
    }
  }, [router.isReady, router.query.userId]);

  console.log("userId в MyApp перед рендером:", userId);

  // Не рендерим, пока userId не определился
  if (!userId) return null;

  return (
    <ExpensesProvider userId={userId}>
      <Component {...pageProps} />
    </ExpensesProvider>
  );
}

export default MyApp;
