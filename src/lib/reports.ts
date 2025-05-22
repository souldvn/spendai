import { Transaction } from '@/types';
import { useTranslation } from '@/hooks/useTranslation';
import { getTranslator } from './i18n';



interface ReportData {
  transactions: Transaction[];
  currentBalance: number;
  currencySymbol: string;
  currency: 'USD' | 'RUB';
  currencyRate: number;
}

// 🔧 Подсчет доходов и расходов
export function analyze(transactions: Transaction[], currencyRate: number) {
  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + Number(t.amount) * currencyRate, 0);

  const expenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + Number(t.amount) * currencyRate, 0);

  const expensesByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      const amount = Number(t.amount) * currencyRate;
      acc[t.category] = (acc[t.category] || 0) + amount;
      return acc;
    }, {} as Record<string, number>);

  return { income, expenses, expensesByCategory };
}

// 📅 Фильтрация по дате
function isToday(date: Date): boolean {
  const now = new Date();
  return (
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  );
}

function isThisWeek(date: Date): boolean {
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 7);

  return date >= startOfWeek && date < endOfWeek;
}

function isThisMonth(date: Date): boolean {
  const now = new Date();
  return (
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  );
}

// 📄 Генерация отчётов
// export function generateDailyReport(data: ReportData): string {
//   const filtered = data.transactions.filter(tx => isToday(new Date(tx.date)));
//   const { income, expenses, expensesByCategory } = analyze(filtered, data.currencyRate);

//   let report = `📅 Ежедневный отчет\n\n`;
//   report += `Баланс: ${data.currencySymbol}${(data.currentBalance * data.currencyRate).toFixed(2)}\n`;
//   report += `Общий доход: +${data.currencySymbol}${income.toFixed(2)}\n`;
//   report += `Общие расходы: -${data.currencySymbol}${expenses.toFixed(2)}\n\n`;

//   if (Object.keys(expensesByCategory).length > 0) {
//     report += `По категориям:\n`;
//     for (const [cat, amt] of Object.entries(expensesByCategory)) {
//       report += `• ${cat}: ${data.currencySymbol}${amt.toFixed(2)}\n`;
//     }
//   }

//   return report;
// }

// export function generateWeeklyReport(data: ReportData): string {
//   const filtered = data.transactions.filter(tx => isThisWeek(new Date(tx.date)));
//   const { income, expenses, expensesByCategory } = analyze(filtered, data.currencyRate);

//   let report = `📅 Недельный отчет\n\n`;
//   report += `Баланс: ${data.currencySymbol}${(data.currentBalance * data.currencyRate).toFixed(2)}\n`;
//   report += `Общий доход: +${data.currencySymbol}${income.toFixed(2)}\n`;
//   report += `Общие расходы: -${data.currencySymbol}${expenses.toFixed(2)}\n\n`;

//   if (Object.keys(expensesByCategory).length > 0) {
//     report += `По категориям:\n`;
//     for (const [cat, amt] of Object.entries(expensesByCategory)) {
//       report += `• ${cat}: ${data.currencySymbol}${amt.toFixed(2)}\n`;
//     }
//   }

//   return report;
// }

// export function generateMonthlyReport(data: ReportData): string {
//   const filtered = data.transactions.filter(tx => isThisMonth(new Date(tx.date)));
//   const { income, expenses, expensesByCategory } = analyze(filtered, data.currencyRate);

//   let report = `📅 Месячный отчет\n\n`;
//   report += `Баланс: ${data.currencySymbol}${(data.currentBalance * data.currencyRate).toFixed(2)}\n`;
//   report += `Общий доход: +${data.currencySymbol}${income.toFixed(2)}\n`;
//   report += `Общие расходы: -${data.currencySymbol}${expenses.toFixed(2)}\n\n`;

//   if (Object.keys(expensesByCategory).length > 0) {
//     report += `По категориям:\n`;
//     for (const [cat, amt] of Object.entries(expensesByCategory)) {
//       report += `• ${cat}: ${data.currencySymbol}${amt.toFixed(2)}\n`;
//     }
//   }

//   return report;
// }
