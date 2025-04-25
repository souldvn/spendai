import https from 'https';
import fs from 'fs';
import path from 'path';
import { bot } from './telegramBot';

const PORT = process.env.PORT || 8443;
const WEBHOOK_URL = process.env.WEBHOOK_URL || `https://localhost:${PORT}/bot`;

const options = {
  key: fs.readFileSync(path.join(__dirname, 'cert/key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'cert/cert.pem'))
};

const server = https.createServer(options, async (req, res) => {
  if (req.url === '/bot' && req.method === 'POST') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      try {
        const update = JSON.parse(body);
        await bot.handleUpdate(update);
        res.writeHead(200);
        res.end('OK');
      } catch (error) {
        console.error('Error processing webhook:', error);
        res.writeHead(500);
        res.end('Error processing webhook');
      }
    });
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

// Set webhook
bot.setWebHook(WEBHOOK_URL, {
  certificate: fs.readFileSync(path.join(__dirname, 'cert/cert.pem'))
}).then(() => {
  console.log('Webhook set successfully');
}).catch((error) => {
  console.error('Error setting webhook:', error);
});

server.listen(PORT, () => {
  console.log(`Webhook server is running on port ${PORT}`);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (error) => {
  console.error('Unhandled Rejection:', error);
}); 