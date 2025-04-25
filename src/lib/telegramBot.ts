import TelegramBot from 'node-telegram-bot-api';
import axios from 'axios';

// Create a bot instance with the new token
const token = '7770234898:AAG4_N1_M5gnSY-U9fBWfPtFr6FLRIfM7wM';
console.log('Initializing bot with token:', token);

// Test the token by making a direct API call
async function testBotToken() {
  try {
    const response = await axios.get(`https://api.telegram.org/bot${token}/getMe`);
    const data = response.data;
    console.log('Bot API test response:', data);
    if (data.ok) {
      console.log('Bot token is valid! Bot name:', data.result.username);
    } else {
      console.error('Bot token is invalid:', data.description);
      process.exit(1);
    }
  } catch (error: any) {
    console.error('Error testing bot token:', error?.response?.data || error?.message || 'Unknown error');
    process.exit(1);
  }
}

// Test the token before starting the bot
testBotToken();

const bot = new TelegramBot(token, { 
  polling: true,
  filepath: false
});

// Log when bot is ready
bot.on('message', (msg) => {
  if (msg.from) {
    console.log('Received message:', msg.text, 'from:', msg.from.username);
  } else {
    console.log('Received message from an unknown user');
  }
});

// Handle /start command
bot.onText(/\/start/, (msg) => {
  if (msg.from) {
    console.log('Received /start command from:', msg.from.username, 'chatId:', msg.chat.id);
  }
  const chatId = msg.chat.id;

  // Ссылка на приложение
  const webAppUrl = 'https://smartspendai.netlify.app';

  // Создаем кнопку с ссылкой на приложение
  const options = {
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
  };

  // Отправляем сообщение с кнопкой
  bot.sendMessage(chatId, 'Привет! Я бот для управления финансами. Нажми кнопку ниже, чтобы открыть приложение:', options)
    .then(() => console.log('Start message with button sent successfully'))
    .catch(error => console.error('Error sending start message:', error));
});


// Handle /help command
bot.onText(/\/help/, (msg) => {
  if (msg.from) {
    console.log('Received /help command from:', msg.from.username, 'chatId:', msg.chat.id);
  }
  const chatId = msg.chat.id;
  const helpMessage = `
Доступные команды:
  /start - Начать работу с ботом
  /help - Показать список команд
  /balance - Показать текущий баланс
  /transactions - Показать последние транзакции
  /report - Получить ежедневный отчет
  `;
  bot.sendMessage(chatId, helpMessage)
    .then(() => console.log('Help message sent successfully'))
    .catch(error => console.error('Error sending help message:', error));
});

// Handle /balance command
bot.onText(/\/balance/, (msg) => {
  if (msg.from) {
    console.log('Received /balance command from:', msg.from.username, 'chatId:', msg.chat.id);
  }
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Баланс: 0 ₽')
    .then(() => console.log('Balance message sent successfully'))
    .catch(error => console.error('Error sending balance message:', error));
});

// Handle /transactions command
bot.onText(/\/transactions/, (msg) => {
  if (msg.from) {
    console.log('Received /transactions command from:', msg.from.username, 'chatId:', msg.chat.id);
  }
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Последние транзакции:\nНет транзакций')
    .then(() => console.log('Transactions message sent successfully'))
    .catch(error => console.error('Error sending transactions message:', error));
});

// Handle /report command
bot.onText(/\/report/, async (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from?.id; // Если msg.from существует, то извлекаем userId
  if (!userId) {
    // Если userId не существует, отправляем сообщение об ошибке
    bot.sendMessage(chatId, 'Не удалось получить ваш ID. Попробуйте снова.');
    return;
  }

  try {
    const report = await generateDailyReportForUser(userId); // Генерация отчета для пользователя
    sendReportToUser(chatId, report); // Отправка отчета пользователю
  } catch (error) {
    console.error('Error generating or sending report:', error);
    bot.sendMessage(chatId, 'Произошла ошибка при генерации отчета. Попробуйте позже.');
  }
});

// Error handling
bot.on('error', (error) => {
  console.error('Telegram bot error:', error);
});

// Log when bot is ready
bot.on('polling_error', (error) => {
  console.error('Polling error:', error);
});

console.log('Telegram bot started successfully!');

// Function to generate daily report for user (example)
async function generateDailyReportForUser(userId: number) {
  // Здесь логика генерации отчета для пользователя
  return `Отчет для пользователя ${userId}: \nДоход: 1000 ₽\nРасход: 500 ₽`;
}

// Function to send report to user
function sendReportToUser(chatId: number, report: string) {
  bot.sendMessage(chatId, report)
    .then(() => console.log('Report sent successfully'))
    .catch(error => console.error('Error sending report:', error));
}

export { bot };
