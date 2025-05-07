import cron from 'node-cron';
import { bot } from './telegramBot';
import { 
  getUsersWithEnabledReports, 
  generateUserReport 
} from '../firebaseConfig';

console.log('Scheduler initialized');

// Тестовая задача - проверка работы планировщика (раз в 10 минут)
cron.schedule('*/10 * * * *', () => {
  console.log('[Scheduler] Test task executed');
});

// Реальные задачи отправки отчетов
// Временное расписание для теста (каждые 2 минуты)
cron.schedule('*/2 * * * *', () => sendReports('daily'));    // Ежедневно в 9:00
cron.schedule('0 10 * * 1', () => sendReports('weekly'));  // Понедельник в 10:00
cron.schedule('0 11 1 * *', () => sendReports('monthly')); // 1-го числа в 11:00

async function sendReports(type: 'daily' | 'weekly' | 'monthly') {
  try {
    console.log(`[Reports] Starting ${type} reports generation`);
    
    // Получаем только пользователей с включенными отчетами
    const users = await getUsersWithEnabledReports();
    console.log(`[Reports] Found ${users.length} users with enabled reports`);

    for (const user of users) {
      try {
        // Проверяем, включен ли конкретный тип отчета
        if (user.reports?.[type]) {
          console.log(`[Reports] Generating ${type} report for user ${user.userId}`);
          
          // Генерируем отчет с использованием новой функции
          const report = await generateUserReport(user.userId, type);
          
          // Отправляем отчет через бота
          await bot.telegram.sendMessage(user.userId, report);
          console.log(`[Reports] Report sent to ${user.userId}`);
        }
      } catch (error) {
        // Явная проверка типа ошибки
        if (error instanceof Error) {
          console.error(`[Reports] Error processing user ${user.userId}:`, error.message);
        } else {
          console.error(`[Reports] Unknown error processing user ${user.userId}:`, error);
        }
      }
    }
    
    console.log(`[Reports] ${type} reports completed`);
  } catch (error) {
    // Явная проверка типа ошибки
    if (error instanceof Error) {
      console.error(`[Reports] System error during ${type} reports:`, error.message);
    } else {
      console.error(`[Reports] Unknown system error during ${type} reports:`, error);
    }
  }
}

console.log('Scheduler started successfully');