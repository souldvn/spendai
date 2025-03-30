'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('./Chart'), { ssr: false });

interface ExpenseChartProps {
  expenses: { category: string; amount: number; color: string }[];
  income: number;
}

export default function ExpenseChart({ expenses, income }: ExpenseChartProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div className="w-full h-[200px] flex items-center justify-center" />;
  }

  return <Chart expenses={expenses} income={income} />;
} 