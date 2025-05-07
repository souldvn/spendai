import dotenv from 'dotenv';
import { Telegraf } from 'telegraf';
import { generateUserReport } from '@/firebaseConfig';

dotenv.config(); // Загрузка переменных окружения

const token = process.env.TELEGRAM_BOT_TOKEN!;
if (!token) throw new Error('Bot token is required');

const bot = new Telegraf(token);

// Команды
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
/start - Начать
/help - Помощь
/balance - Баланс
/transactions - Транзакции
/report - Отчет
  `);
});

bot.command('balance', (ctx) => ctx.reply('Баланс: 0 ₽'));

bot.command('transactions', (ctx) => ctx.reply('Последние транзакции:\nНет транзакций'));

bot.command('report', async (ctx) => {
  const userId = ctx.from?.id;
  if (!userId) return ctx.reply('Не удалось получить ваш ID.');

  try {
    const report = await generateDailyReportForUser(userId);
    await ctx.reply(report);
  } catch (err) {
    console.error('Ошибка при генерации отчета:', err);
    ctx.reply('Произошла ошибка при генерации отчета.');
  }
});

bot.on('message', (ctx) => {
  if ('text' in ctx.message) {
    console.log('Message:', ctx.message.text);
  }
});

// Функция генерации отчета
async function generateDailyReportForUser(userId: number) {
  return `Отчет для пользователя ${userId}:\nДоход: 1000 ₽\nРасход: 500 ₽`;
}

bot.command('testreport', async (ctx) => {
  const userId = String(ctx.from.id);
  try {
    const report = await generateUserReport(userId, 'daily');
    await ctx.reply(report);
    console.log(`Test report sent to ${userId}`);
  } catch (error) {
    console.error('Test report failed:', error instanceof Error ? error.message : error);
    await ctx.reply('Ошибка генерации отчёта');
  }
});

// 👇 Вот это главное:
export { bot };
