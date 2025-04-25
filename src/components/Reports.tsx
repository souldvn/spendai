import React, { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { generateDailyReport, generateWeeklyReport, generateMonthlyReport, generateOptimizationReport } from '@/lib/reports';
import { Transaction } from '@/types';

interface ReportsProps {
  transactions: Transaction[];
  currentBalance: number;
  currencySymbol: string;
}

export function Reports({ transactions, currentBalance, currencySymbol }: ReportsProps) {
  const { t } = useTranslation();
  const [selectedReport, setSelectedReport] = useState<string>('daily');
  const [reportContent, setReportContent] = useState<string>('');

  const generateReport = () => {
    let report = '';
    switch (selectedReport) {
      case 'daily':
        report = generateDailyReport({ transactions, currentBalance, currencySymbol, t });
        break;
      case 'weekly':
        report = generateWeeklyReport({ transactions, currentBalance, currencySymbol, t });
        break;
      case 'monthly':
        report = generateMonthlyReport({ transactions, currentBalance, currencySymbol, t });
        break;
      case 'optimization':
        report = generateOptimizationReport({ transactions, currentBalance, currencySymbol, t });
        break;
    }
    setReportContent(report);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{t('settings.reports.title')}</h2>
      
      <div className="mb-4">
        <select
          value={selectedReport}
          onChange={(e) => setSelectedReport(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="daily">{t('settings.reports.daily')}</option>
          <option value="weekly">{t('settings.reports.weekly')}</option>
          <option value="monthly">{t('settings.reports.monthly')}</option>
          <option value="optimization">{t('settings.reports.optimization')}</option>
        </select>
      </div>

      <button
        onClick={generateReport}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        {t('settings.reports.generate')}
      </button>

      {reportContent ? (
        <div className="bg-white p-4 rounded shadow">
          <pre className="whitespace-pre-wrap">{reportContent}</pre>
        </div>
      ) : (
        <p className="text-gray-500">{t('settings.reports.noData')}</p>
      )}
    </div>
  );
} 