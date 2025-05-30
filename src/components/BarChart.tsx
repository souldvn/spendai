'use client';

import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { useCurrency } from '@/context/CurrencyContext';

interface BarChartProps {
  data: Array<{
    name: string;
    amount: number;
    color: string;
  }>;
}

export default function BarChart({ data }: BarChartProps) {
  const { convertAmount, getCurrencySymbol } = useCurrency();

  // Convert amounts to current currency
  const convertedData = data.map(item => ({
    ...item,
    amount: convertAmount(item.amount)
  }));

  return (
    <div className="w-full h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart data={convertedData}>
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false}
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false}
            tick={{ fontSize: 12 }}
          />
          <Tooltip 
            formatter={(value: number) => [`${getCurrencySymbol()}${value.toLocaleString()}`, 'Amount']}
            cursor={{ fill: 'rgba(139, 92, 246, 0.1)' }}
            contentStyle={{
              backgroundColor: '#ffffff',
              border: 'none',
              borderRadius: '0.5rem',
              color: '#111827',
            }}
            labelStyle={{ color: '#111827' }}
          />
          <Bar 
            dataKey="amount" 
            radius={[4, 4, 0, 0]}
            fill="#8B5CF6"
          />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
} 