// netlify/functions/telegram.ts
import { Handler } from '@netlify/functions';
import { bot } from '../../src/lib/telegramBot';

const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    await bot.handleUpdate(body);
    return {
      statusCode: 200,
      body: 'OK',
    };
  } catch (error) {
    console.error('Telegram Webhook Error:', error);
    return {
      statusCode: 500,
      body: 'Internal Server Error',
    };
  }
};

export { handler };
