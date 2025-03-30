'use client';

interface CategoryIconProps {
  name: string;
  color: string;
  size?: 'sm' | 'lg';
}

const icons: Record<string, string> = {
  'Housing': '🏠',
  'Transport': '🚌',
  'Food & Groceries': '🍴',
  'Shopping': '🛒',
  'Phone & Internet': '📱',
  'Travel': '✈️',
  'Health & Wellness': '➕',
  'Entertainment': '🎬',
  'Education': '🎓',
  'Debts & Loans': '💰',
  'Savings & Investments': '📊',
  'Other Expenses': '•••',
};

export function CategoryIcon({ name, color, size = 'sm' }: CategoryIconProps) {
  const icon = icons[name] || '•••';
  const sizeClasses = size === 'sm' ? 'w-8 h-8 text-base' : 'w-10 h-10 text-lg';
  
  return (
    <div className={`${sizeClasses} ${color} rounded-2xl flex items-center justify-center text-white`}>
      {icon}
    </div>
  );
} 