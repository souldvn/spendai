import { Telegraf, Context } from 'telegraf';

const token = '7770234898:AAG4_N1_M5gnSY-U9fBWfPtFr6FLRIfM7wM';
if (!token) throw new Error('Bot token is required');

const bot = new Telegraf(token);

// Запуск логов
console.log('Initializing bot...');

// /start
bot.start((ctx) => {
  const webAppUrl = 'https://smartspendai.netlify.app';
  ctx.reply(
    'Привет! Я бот для управления финансами. Нажми кнопку ниже, чтобы открыть приложение:',
    {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'Открыть приложение',
              web_app: { url: webAppUrl }
            }
          ]
        ]
      }
    }
  );
  console.log('/start from:', ctx.from?.username, 'chatId:', ctx.chat?.id);
});

// /help
bot.command('help', (ctx) => {
  const helpMessage = `
Доступные команды:
/start - Начать работу с ботом
/help - Показать список команд
/balance - Показать текущий баланс
/transactions - Показать последние транзакции
/report - Получить ежедневный отчет
  `;
  ctx.reply(helpMessage);
  console.log('/help from:', ctx.from?.username, 'chatId:', ctx.chat?.id);
});

// /balance
bot.command('balance', (ctx) => {
  ctx.reply('Баланс: 0 ₽');
  console.log('/balance from:', ctx.from?.username, 'chatId:', ctx.chat?.id);
});

// /transactions
bot.command('transactions', (ctx) => {
  ctx.reply('Последние транзакции:\nНет транзакций');
  console.log('/transactions from:', ctx.from?.username, 'chatId:', ctx.chat?.id);
});

// /report
bot.command('report', async (ctx) => {
  const userId = ctx.from?.id;
  const chatId = ctx.chat?.id;

  if (!userId || !chatId) {
    ctx.reply('Не удалось получить ваш ID. Попробуйте снова.');
    return;
  }

  try {
    const report = await generateDailyReportForUser(userId);
    await ctx.reply(report);
    console.log('Report sent to', userId);
  } catch (error) {
    console.error('Error generating report:', error);
    ctx.reply('Произошла ошибка при генерации отчета. Попробуйте позже.');
  }
});

// Получение любых сообщений
bot.on('message', (ctx) => {
  const message = ctx.message;
  if ('text' in message) {
    console.log('Message from:', ctx.from?.username, 'text:', message.text);
  } else {
    console.log('Received non-text message from:', ctx.from?.username);
  }
});


// Генерация отчета (пример)
async function generateDailyReportForUser(userId: number) {
  return `Отчет для пользователя ${userId}:\nДоход: 1000 ₽\nРасход: 500 ₽`;
}

// Запуск (если без webhook)
bot.launch().then(() => {
  console.log('Telegram bot started with Telegraf!');
});

// Обработка ошибок
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

export { bot };
