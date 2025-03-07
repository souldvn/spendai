import { useEffect, useState } from "react";
import "../styles/global.sass";
import type { AppProps } from "next/app";
import { ExpensesProvider } from "../contextes/ExpenseContext";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    if (!router.isReady) return;

    let id = router.query.userId as string | undefined;
    const storedId = sessionStorage.getItem("userId");

    if (id) {
      sessionStorage.setItem("userId", id);
    } else if (storedId) {
      id = storedId;
    } else {
      id = "test-user";
      sessionStorage.setItem("userId", id);
    }

    setUserId(id);

    // Если в URL нет userId, добавляем его
    if (!router.query.userId) {
      router.replace({ pathname: router.pathname, query: { userId: id } }, undefined, { shallow: true });
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
