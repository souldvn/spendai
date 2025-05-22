import cron from 'node-cron';
import { bot } from './telegramBot';
import { getUsersWithEnabledReports, generateUserReport } from './firebaseConfig';

const log = (message: string, data?: any) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${message}`, data || '');
};

export async function sendReports(type: 'daily' | 'weekly' | 'monthly') {
  try {
    log(`📤 Starting ${type} reports`);

    const users = await getUsersWithEnabledReports();
    log(`👥 Found ${users.length} users with reports enabled`);

    if (users.length === 0) {
      log('❌ No users found with enabled reports');
      return;
    }

    for (const user of users) {
      try {
        if (!user.reports?.[type]) {
          log(`⏭ Skipping user ${user.userId} - ${type} report disabled`);
          continue;
        }

        log(`🛠 Generating report for ${user.userId}`);
        const report = await generateUserReport(user.userId, type);

        await bot.telegram.sendMessage(user.userId, report);
        log(`✅ ${type} report sent to ${user.userId}`);
      } catch (error) {
        log(`⚠️ Error with user ${user.userId}:`, error instanceof Error ? error.message : error);
      }
    }
  } catch (error) {
    log(`🔥 Global error in ${type} reports:`, error instanceof Error ? error.message : error);
  }
}

// 🧪 Для отладки — каждые 2 минуты, только если включена переменная DEBUG_CRON
// if (process.env.DEBUG_CRON === 'true') {
//   cron.schedule('*/2 * * * *', () => {
//     log('🐞 [DEBUG] Cron heartbeat (every 2 min)');
//     sendReports('daily').catch(console.error);
//   });
// }

// 🕘 Продакшн-расписание:
cron.schedule('0 9 * * *', () => sendReports('daily'));   // каждый день в 9:00
cron.schedule('0 10 * * 1', () => sendReports('weekly')); // каждый понедельник в 10:00
cron.schedule('0 11 1 * *', () => sendReports('monthly')); // 1 числа каждого месяца в 11:00

log('✅ Scheduler initialized');
