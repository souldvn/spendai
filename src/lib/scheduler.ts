import { bot } from './telegramBot';
import { getUsersWithEnabledReports, generateUserReport } from './firebaseConfig';
import cron from 'node-cron';

const log = (message: string, data?: any) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${message}`, data || '');
};

async function sendReports(type: 'daily'|'weekly'|'monthly') {
  try {
    log(`Starting ${type} reports`);
    
    const users = await getUsersWithEnabledReports();
    log(`Found ${users.length} users with reports enabled`);
    
    if (users.length === 0) {
      log('No users found with enabled reports');
      return;
    }

    for (const user of users) {
      try {
        if (!user.reports?.[type]) {
          log(`Skipping user ${user.userId} - ${type} report disabled`);
          continue;
        }

        log(`Generating report for ${user.userId}`);
        const report = await generateUserReport(user.userId, type);
        
        log(`Sending to ${user.userId}`, { reportLength: report.length });
        await bot.telegram.sendMessage(user.userId, report);
        
        log(`Report sent to ${user.userId}`);
      } catch (error) {
        log(`Error processing user ${user.userId}:`, 
            error instanceof Error ? error.message : error);
      }
    }
  } catch (error) {
    log(`System error in ${type} reports:`, 
        error instanceof Error ? error.message : error);
  }
}

// Для отладки - каждые 2 минуты
cron.schedule('*/2 * * * *', () => {
  log('Scheduler heartbeat');
  sendReports('daily').catch(console.error);
});

// Реальное расписание
cron.schedule('0 9 * * *', () => sendReports('daily'));
cron.schedule('0 10 * * 1', () => sendReports('weekly'));
cron.schedule('0 11 1 * *', () => sendReports('monthly'));

log('Scheduler started');