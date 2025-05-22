import { getAllUsersReportsSettings, getUserSettings, getUserTransactions } from '@/lib/firebaseConfig';
import { generateDailyReport } from '@/lib/reports';
import { sendTelegramMessage } from '@/lib/telegramBot';
import { getTranslator } from '@/lib/i18n';

export async function sendScheduledReports() {
  console.log('[sendScheduledReports] Вызов произошёл в', new Date().toISOString());

  const users = await getAllUsersReportsSettings();
  console.log('[sendScheduledReports] Найдено пользователей:', users.length);

  for (const user of users) {
    const userId = user.userId;
    const reports = user.reports;

    if (!reports) continue;

    const [settings, transactions] = await Promise.all([
      getUserSettings(userId),
      getUserTransactions(userId)
    ]);

    if (!settings) continue;

    const currency = settings.defaultCurrency; // 'USD' | 'RUB'
const currencySymbol = currency === 'USD' ? '$' : '₽';
const currencyRate = currency === 'USD' ? 1 : 80;




    const currentBalance = transactions.reduce((acc, transaction) => {
      const { type, amount } = transaction;
      return acc + (type === 'income' ? amount : -amount);
    }, 0);

    const commonProps = { 
      transactions, 
      currentBalance, 
      currencySymbol, 
      currencyRate,
      currency
    };
    
    

    if (reports.daily && settings.currencyRate !== undefined) {
      const report = generateDailyReport(commonProps);
      await sendTelegramMessage(userId, report);
    }
    
    // В дальнейшем можно добавить аналоги для недельных и месячных отчетов
  }
}
