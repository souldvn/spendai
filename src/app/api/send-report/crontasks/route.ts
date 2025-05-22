// src/app/api/send-report/crontasks/route.ts

import { sendReports } from '@/lib/scheduler'; // Экспортируем sendReports из логики для отправки отчетов

export async function GET(request: Request) {
  const url = new URL(request.url);
  const type = url.searchParams.get('type') || 'daily'; // по умолчанию daily

  try {
    await sendReports(type as 'daily' | 'weekly' | 'monthly');  // Запускаем нужный отчет
    return new Response(`${type.charAt(0).toUpperCase() + type.slice(1)} reports sent`, { status: 200 });
  } catch (error) {
    return new Response(`Error sending reports: ${error instanceof Error ? error.message : error}`, { status: 500 });
  }
}
