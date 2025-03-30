'use client';

import { BarChart as RechartsBarChart, Bar, XAxis, ResponsiveContainer } from 'recharts';

interface BarChartProps {
  data: Array<{
    name: string;
    amount: number;
  }>;
}

export default function BarChart({ data }: BarChartProps) {
  return (
    <div className="w-full h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart data={data}>
          <XAxis dataKey="name" axisLine={false} tickLine={false} />
          <Bar dataKey="amount" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
} 