import "@/styles/global.sass";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";

const App = ({ Component, pageProps }: AppProps) => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("userId");
    setUserId(id);
  }, []);

  return <Component {...pageProps} userId={userId} />;
};

export default App;
