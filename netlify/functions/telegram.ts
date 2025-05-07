// netlify/functions/telegram.ts
import { Handler } from '@netlify/functions';
import { bot } from '../../src/lib/telegramBot';

export const handler: Handler = async (event) => {
  // Проверка метода запроса
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  // Проверка наличия тела запроса
  if (!event.body) {
    return {
      statusCode: 400,
      body: 'Bad Request',
    };
  }

  try {
    // Обработка входящего обновления
    const update = JSON.parse(event.body);
    await bot.handleUpdate(update);
    
    return {
      statusCode: 200,
      body: 'OK',
    };
  } catch (error) {
    console.error('Error processing update:', error);
    return {
      statusCode: 500,
      body: 'Internal Server Error',
    };
  }
};