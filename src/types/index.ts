export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: Date;
  color: string;
}

export interface FinancialAnalysis {
  summary: string;
  recommendations: string[];
  insights: string[];
} 