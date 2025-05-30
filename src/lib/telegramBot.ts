import { Telegraf } from 'telegraf';

const token = process.env.TELEGRAM_BOT_TOKEN;
if (!token) throw new Error('TELEGRAM_BOT_TOKEN is required');

export const bot = new Telegraf(token);

// Обработчики команд (минимальный набор)
bot.start((ctx) => {
  const userId = ctx.from?.id;
  if (!userId) return ctx.reply('Ошибка: не удалось получить ID пользователя.');

  const webAppUrl = `https://smartspendai.netlify.app?userId=${userId}`;

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


bot.command('help', (ctx) => ctx.reply('Помощь: /start /help'));

// Логирование входящих сообщений
bot.on('text', (ctx) => {
  console.log('Received:', ctx.message.text);
});

export async function sendTelegramMessage(userId: string, message: string) {
  try {
    await bot.telegram.sendMessage(userId, message, { parse_mode: 'HTML' }); // можно markdown или html
  } catch (err) {
    console.error(`Failed to send message to ${userId}:`, err);
  }
}