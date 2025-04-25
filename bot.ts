import { bot } from './src/lib/telegramBot.js';

console.log('Starting Telegram bot...');

// Error handling
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

process.on('unhandledRejection', (error) => {
  console.error('Unhandled Rejection:', error);
}); 