import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from '@/components/ClientLayout';
import { ThemeProvider } from '@/context/ThemeContext';
import { BalanceProvider } from '@/context/BalanceContext';
import { CurrencyProvider } from '@/context/CurrencyContext';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "My Finance App",
  description: "Track your finances with ease",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <CurrencyProvider>
            <BalanceProvider>
              <ClientLayout>
                {children}
              </ClientLayout>
            </BalanceProvider>
          </CurrencyProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
