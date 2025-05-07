// src/lib/telegramBot.ts
import { Telegraf } from 'telegraf';

const token = process.env.TELEGRAM_BOT_TOKEN;
if (!token) throw new Error('TELEGRAM_BOT_TOKEN is required');

export const bot = new Telegraf(token);

// Обработка команды /start
bot.start((ctx) => {
  const webAppUrl = 'https://smartspendai.netlify.app';
  return ctx.reply(
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

// Обработка команды /help
bot.help((ctx) => {
  return ctx.reply(`
Доступные команды:
/start - Начать
/help - Помощь
/balance - Баланс
/transactions - Транзакции
/report - Отчет
  `);
});

// Обработка команды /balance
bot.command('balance', (ctx) => {
  return ctx.reply('Баланс: 0 ₽');
});

// Обработка команды /transactions
bot.command('transactions', (ctx) => {
  return ctx.reply('Последние транзакции:\nНет транзакций');
});

// Обработка команды /report
bot.command('report', async (ctx) => {
  const userId = ctx.from?.id;
  if (!userId) return ctx.reply('Не удалось получить ваш ID.');

  try {
    const report = await generateDailyReportForUser(userId);
    return ctx.reply(report);
  } catch (err) {
    console.error('Ошибка при генерации отчета:', err);
    return ctx.reply('Произошла ошибка при генерации отчета.');
  }
});

// Логирование входящих сообщений
bot.on('message', (ctx) => {
  if ('text' in ctx.message) {
    console.log('Received message:', ctx.message.text);
  }
});

// Функция генерации отчета
async function generateDailyReportForUser(userId: number) {
  return `Отчет для пользователя ${userId}:\nДоход: 1000 ₽\nРасход: 500 ₽`;
}