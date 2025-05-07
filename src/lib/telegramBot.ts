import dotenv from 'dotenv';
import { Telegraf } from 'telegraf';
import { 
  generateUserReport, 
  getUserSettings,
  getUsersWithEnabledReports,
  getUserTransactions,
  getUserBalance
} from '@/lib/firebaseConfig';
import cron from 'node-cron';

dotenv.config();

// Инициализация бота
const token = process.env.TELEGRAM_BOT_TOKEN;
if (!token) throw new Error('TELEGRAM_BOT_TOKEN is required');

export const bot = new Telegraf(token);

// ==================== КОМАНДЫ БОТА ====================

bot.start((ctx) => {
  const webAppUrl = 'https://smartspendai.netlify.app';
  ctx.reply(
    'Привет! Я бот для управления финансами. Нажми кнопку ниже, чтобы открыть приложение:',
    {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'Открыть приложение', web_app: { url: webAppUrl } }]
        ]
      }
    }
  );
});

bot.command('help', (ctx) => {
  ctx.reply(`
Доступные команды:
/start - Начать работу
/help - Помощь
/balance - Текущий баланс
/transactions - Последние транзакции
/report - Получить отчет
/testreport - Тест генерации отчета
  `);
});

bot.command('balance', async (ctx) => {
  try {
    const userId = String(ctx.from.id);
    const balance = await getUserBalance(userId);
    ctx.reply(`Текущий баланс: ${balance.toFixed(2)} ₽`);
  } catch (error) {
    console.error('Balance error:', error);
    ctx.reply('Не удалось получить баланс');
  }
});

bot.command('transactions', async (ctx) => {
  try {
    const userId = String(ctx.from.id);
    const transactions = await getUserTransactions(userId);
    
    if (transactions.length === 0) {
      return ctx.reply('У вас нет транзакций');
    }
    
    const lastTransactions = transactions
      .slice(0, 5)
      .map(t => `${t.date.toLocaleDateString()}: ${t.amount > 0 ? '+' : ''}${t.amount} ₽ (${t.category})`)
      .join('\n');
    
    ctx.reply(`Последние транзакции:\n${lastTransactions}`);
  } catch (error) {
    console.error('Transactions error:', error);
    ctx.reply('Не удалось получить транзакции');
  }
});

bot.command('report', async (ctx) => {
  try {
    const userId = String(ctx.from.id);
    const report = await generateUserReport(userId, 'daily');
    await ctx.reply(report);
  } catch (error) {
    console.error('Report error:', error);
    ctx.reply('Ошибка при генерации отчета');
  }
});

bot.command('testreport', async (ctx) => {
  const userId = String(ctx.from.id);
  console.log(`[TestReport] Start for user ${userId}`);
  
  try {
    // 1. Проверяем настройки пользователя
    const settings = await getUserSettings(userId);
    if (!settings) {
      console.log('[TestReport] No settings found');
      return ctx.reply('Настройки не найдены. Пожалуйста, настройте отчеты в веб-приложении.');
    }
    console.log('[TestReport] User settings:', settings.reports);
    
    // 2. Генерируем отчет
    const report = await generateUserReport(userId, 'daily');
    console.log('[TestReport] Generated report:', report);
    
    // 3. Отправляем отчет
    await ctx.reply(report);
    console.log('[TestReport] Report sent successfully');
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('[TestReport] Error:', errorMessage);
    await ctx.reply(`Ошибка: ${errorMessage}`);
  }
});

// ==================== ПЛАНИРОВЩИК ОТЧЕТОВ ====================

function initializeScheduler() {
  console.log('Initializing scheduler...');

  // Тестовая задача каждые 10 минут для проверки работы
  cron.schedule('*/10 * * * *', () => {
    console.log('[Scheduler] Heartbeat - scheduler is alive');
  });

  // Реальное расписание отправки отчетов
  cron.schedule('0 9 * * *', () => sendReports('daily'));    // Ежедневно в 9:00
  cron.schedule('0 10 * * 1', () => sendReports('weekly'));  // По понедельникам в 10:00
  cron.schedule('0 11 1 * *', () => sendReports('monthly')); // 1-го числа в 11:00

  // Для отладки - отправка каждые 5 минут
  if (process.env.NODE_ENV === 'development') {
    cron.schedule('*/5 * * * *', () => sendReports('daily'));
  }

  console.log('Scheduler initialized');
}

async function sendReports(type: 'daily' | 'weekly' | 'monthly') {
  console.log(`[Scheduler] Starting ${type} reports`);
  
  try {
    // 1. Получаем пользователей с включенными отчетами
    const users = await getUsersWithEnabledReports();
    console.log(`[Scheduler] Found ${users.length} users with enabled reports`);
    
    if (users.length === 0) {
      return console.log('[Scheduler] No users with enabled reports found');
    }

    // 2. Обрабатываем каждого пользователя
    for (const user of users) {
      try {
        if (!user.reports?.[type]) {
          console.log(`[Scheduler] Skipping user ${user.userId} - ${type} report disabled`);
          continue;
        }

        console.log(`[Scheduler] Generating report for ${user.userId}`);
        const report = await generateUserReport(user.userId, type);
        
        console.log(`[Scheduler] Sending report to ${user.userId}`);
        await bot.telegram.sendMessage(user.userId, report);
        
        console.log(`[Scheduler] Report sent to ${user.userId}`);
      } catch (error) {
        console.error(`[Scheduler] Error processing user ${user.userId}:`, error);
      }
    }
    
    console.log(`[Scheduler] Completed ${type} reports`);
  } catch (error) {
    console.error(`[Scheduler] System error during ${type} reports:`, error);
  }
}

// ==================== ЗАПУСК СИСТЕМЫ ====================

// Инициализация планировщика
initializeScheduler();

// Запуск бота
bot.launch()
  .then(() => console.log('🤖 Бот успешно запущен'))
  .catch(err => console.error('🚨 Ошибка запуска бота:', err));

// Обработка завершения работы
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

