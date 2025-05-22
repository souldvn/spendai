// /src/app/api/send-report/crontasks/route.ts
import { sendReports } from '@/lib/scheduler'; // твоя функция отправки отчетов

export async function GET(request: Request) {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 = Sunday, 1 = Monday
  const dateOfMonth = now.getDate(); // 1, 2, ..., 31

  const results: string[] = [];

  try {
    await sendReports('daily');
    results.push('✅ Daily report sent');

    if (dayOfWeek === 1) {
      await sendReports('weekly');
      results.push('✅ Weekly report sent');
    }

    if (dateOfMonth === 1) {
      await sendReports('monthly');
      results.push('✅ Monthly report sent');
    }

    return new Response(results.join('\n'), { status: 200 });
  } catch (error) {
    return new Response(
      `🔥 Error: ${error instanceof Error ? error.message : String(error)}`,
      { status: 500 }
    );
  }
}
