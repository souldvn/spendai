'use client';

import { PieChart, Pie, Cell } from 'recharts';

interface ChartProps {
  expenses: { category: string; amount: number; color: string }[];
  income: number;
}

export default function Chart({ expenses, income }: ChartProps) {
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const hasTransactions = totalExpenses > 0;
  
  // If there's only one expense and no income, show the full circle in the expense color
  if (hasTransactions && expenses.length === 1 && income === 0) {
    const data = [
      { name: expenses[0].category, value: 1, color: expenses[0].color }
    ];

    return (
      <div className="w-full h-[200px] flex items-center justify-center">
        <PieChart width={200} height={200}>
          <Pie
            data={data}
            cx={100}
            cy={100}
            innerRadius={70}
            outerRadius={90}
            startAngle={180}
            endAngle={-180}
            paddingAngle={0}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </div>
    );
  }

  const data = hasTransactions ? [
    { name: 'Income', value: income, color: '#8B5CF6' },
    ...expenses.map(expense => ({
      name: expense.category,
      value: expense.amount,
      color: expense.color
    }))
  ] : [
    { name: 'No Data', value: 1, color: '#E5E7EB' }
  ];

  return (
    <div className="w-full h-[200px] flex items-center justify-center">
      <PieChart width={200} height={200}>
        <Pie
          data={data}
          cx={100}
          cy={100}
          innerRadius={70}
          outerRadius={90}
          startAngle={180}
          endAngle={-180}
          paddingAngle={0}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
} 