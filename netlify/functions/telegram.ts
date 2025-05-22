import { Handler } from '@netlify/functions';
import { bot } from '../../src/lib/telegramBot';

export const handler: Handler = async (event) => {
  // Только POST-запросы
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const body = event.body ? JSON.parse(event.body) : {};
    await bot.handleUpdate(body);
    return { statusCode: 200, body: 'OK' };
  } catch (error) {
    console.error('Error:', error);
    return { statusCode: 500, body: 'Internal Error' };
  }
};