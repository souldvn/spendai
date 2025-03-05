// pages/_app.tsx
import "../styles/globals.sass";
import type { AppProps } from "next/app";
import { ExpensesProvider } from "../contextes/ExpenseContext";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const userId = router.query.userId as string | null;

  return (
    <ExpensesProvider userId={userId}>
      <Component {...pageProps} />
    </ExpensesProvider>
  );
}

export default MyApp;
