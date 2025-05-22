import React, { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { generateDailyReport, generateWeeklyReport, generateMonthlyReport} from '@/lib/reports';
import { Transaction } from '@/types';

interface ReportsProps {
  transactions: Transaction[];
  currentBalance: number;
  currencySymbol: string;
  currency: 'USD' | 'RUB';
  currencyRate: number;
}




export function Reports({ transactions, currentBalance, currencySymbol }: ReportsProps) {

  const [selectedReport, setSelectedReport] = useState<string>('daily');
  const [reportContent, setReportContent] = useState<string>('');

  const generateReport = () => {
    let report = '';
    switch (selectedReport) {
      case 'daily':
        report = generateDailyReport({ transactions, currentBalance, currencySymbol, currency: 'USD', currencyRate: 1 });

        break;
      case 'weekly':
       report = generateWeeklyReport({ transactions, currentBalance, currencySymbol, currency: 'USD', currencyRate: 1 });

        break;
      case 'monthly':
        report = generateMonthlyReport({ transactions, currentBalance, currencySymbol, currency: 'USD', currencyRate: 1 });

        break;
    }
    setReportContent(report);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{('settings.reports.title')}</h2>
      
      <div className="mb-4">
        <select
          value={selectedReport}
          onChange={(e) => setSelectedReport(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="daily">{('settings.reports.daily')}</option>
          <option value="weekly">{('settings.reports.weekly')}</option>
          <option value="monthly">{('settings.reports.monthly')}</option>
          <option value="optimization">{('settings.reports.optimization')}</option>
        </select>
      </div>

      <button
        onClick={generateReport}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        {('settings.reports.generate')}
      </button>

      {reportContent ? (
        <div className="bg-white p-4 rounded shadow">
          <pre className="whitespace-pre-wrap">{reportContent}</pre>
        </div>
      ) : (
        <p className="text-gray-500">{('settings.reports.noData')}</p>
      )}
    </div>
  );
} 