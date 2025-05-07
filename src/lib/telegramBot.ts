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

// 1. Инициализация окружения
dotenv.config();

// 2. Проверка токена
const token = process.env.TELEGRAM_BOT_TOKEN;
if (!token) {
  console.error('❌ Токен бота не найден в .env файле');
  process.exit(1);
}

// 3. Создание экземпляра бота
export const bot = new Telegraf(token);

// ==================== БАЗОВЫЕ КОМАНДЫ ====================

// Команда /start с улучшенной обработкой ошибок
bot.start(async (ctx) => {
  try {
    const webAppUrl = 'https://smartspendai.netlify.app';
    await ctx.reply(
      'Привет! Я бот для управления финансами. Нажми кнопку ниже, чтобы открыть приложение:',
      {
        reply_markup: {
          inline_keyboard: [
            [{
              text: 'Открыть приложение', 
              web_app: { 
                url: webAppUrl 
              }
            }]
          ]
        }
      }
    );
    console.log(`🟢 Пользователь ${ctx.from.id} запустил бота`);
  } catch (error) {
    console.error('🔴 Ошибка в команде start:', error);
    await ctx.reply('Произошла ошибка при запуске бота');
  }
});

// Команда /help
bot.help(async (ctx) => {
  try {
    await ctx.reply(`
📚 Доступные команды:
/start - Начать работу
/help - Справка по командам
/balance - Текущий баланс
/transactions - История операций
/report - Финансовый отчет
/testreport - Тест системы отчетов
    `);
  } catch (error) {
    console.error('Ошибка в команде help:', error);
  }
});

// ==================== ФИНАНСОВЫЕ КОМАНДЫ ====================

bot.command('balance', async (ctx) => {
  try {
    const userId = String(ctx.from.id);
    const balance = await getUserBalance(userId);
    await ctx.reply(`💰 Ваш баланс: ${balance.toFixed(2)} ₽`);
  } catch (error) {
    console.error('Ошибка получения баланса:', error);
    await ctx.reply('❌ Не удалось получить баланс');
  }
});

bot.command('transactions', async (ctx) => {
  try {
    const userId = String(ctx.from.id);
    const transactions = await getUserTransactions(userId);
    
    if (!transactions.length) {
      return await ctx.reply('📭 У вас пока нет транзакций');
    }
    
    const report = transactions
      .slice(0, 5)
      .map(t => `▸ ${t.date.toLocaleDateString()}: ${t.amount > 0 ? '+' : ''}${t.amount} ₽ (${t.category})`)
      .join('\n');
    
    await ctx.reply(`📋 Последние операции:\n${report}`);
  } catch (error) {
    console.error('Ошибка получения транзакций:', error);
    await ctx.reply('❌ Не удалось загрузить транзакции');
  }
});

// ==================== СИСТЕМА ОТЧЕТОВ ====================

bot.command('report', async (ctx) => {
  try {
    const userId = String(ctx.from.id);
    const report = await generateUserReport(userId, 'daily');
    await ctx.reply(report);
    console.log(`📊 Отчет отправлен пользователю ${userId}`);
  } catch (error) {
    console.error('Ошибка генерации отчета:', error);
    await ctx.reply('❌ Ошибка при формировании отчета');
  }
});

bot.command('testreport', async (ctx) => {
  try {
    const userId = String(ctx.from.id);
    console.log(`🔍 Тест отчета для ${userId}`);
    
    const settings = await getUserSettings(userId);
    if (!settings) {
      console.log('⚙️ Настройки не найдены');
      return await ctx.reply('⚙️ Настройте отчеты в веб-приложении');
    }
    
    const report = await generateUserReport(userId, 'daily');
    await ctx.reply(report);
    console.log('✅ Тест отчета выполнен');
    
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : 'Неизвестная ошибка';
    console.error('❌ Ошибка теста:', errMsg);
    await ctx.reply(`❌ Ошибка: ${errMsg}`);
  }
});

// ==================== ПЛАНИРОВЩИК ОТЧЕТОВ ====================

function setupScheduler() {
  console.log('⏳ Настройка планировщика...');

  // Проверка работы
  cron.schedule('*/10 * * * *', () => {
    console.log('🫀 Планировщик активен');
  });

  // Реальное расписание
  cron.schedule('0 9 * * *', () => sendReports('daily'));
  cron.schedule('0 10 * * 1', () => sendReports('weekly'));
  cron.schedule('0 11 1 * *', () => sendReports('monthly'));

  // Для отладки
  if (process.env.NODE_ENV !== 'production') {
    cron.schedule('*/5 * * * *', () => sendReports('daily'));
    console.log('🔧 Включен режим отладки (отчеты каждые 5 мин)');
  }

  console.log('✅ Планировщик настроен');
}

async function sendReports(type: 'daily' | 'weekly' | 'monthly') {
  console.log(`⏳ Запуск ${type} отчетов...`);
  
  try {
    const users = await getUsersWithEnabledReports();
    console.log(`👥 Найдено пользователей: ${users.length}`);
    
    for (const user of users) {
      try {
        if (!user.reports?.[type]) continue;
        
        const report = await generateUserReport(user.userId, type);
        await bot.telegram.sendMessage(user.userId, report);
        console.log(`✉️ Отчет отправлен ${user.userId}`);
        
      } catch (error) {
        console.error(`❌ Ошибка для ${user.userId}:`, error);
      }
    }
  } catch (error) {
    console.error('⛔ Критическая ошибка:', error);
  }
}

// ==================== ЗАПУСК СИСТЕМЫ ====================

// Настройка обработки ошибок
bot.catch((err, ctx) => {
  console.error('🔥 Глобальная ошибка:', err);
  ctx.reply('⚠️ Произошла системная ошибка');
});

// Инициализация
setupScheduler();

// Запуск бота
bot.launch()
  .then(() => console.log('🤖 Бот запущен и готов к работе'))
  .catch(err => console.error('🚨 Ошибка запуска:', err));

// Корректное завершение
process.once('SIGINT', () => {
  console.log('🛑 Завершение работы...');
  bot.stop('SIGINT');
  process.exit();
});