'use client';
import { Suspense } from 'react';
import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { AddTransaction } from '@/components/AddTransaction';
import EditTransactionModal from '@/components/EditTransactionModal';
import { EditBalanceModal } from '@/components/EditBalanceModal';
import BottomNav from '@/components/BottomNav';
import ExpenseChart from '@/components/ExpenseChart';
import BarChart from '@/components/BarChart';
import { addTransaction as addTransactionToFirebase, getUserTransactions, updateTransaction, deleteTransaction } from '@/lib/firebaseConfig';
import type { Transaction } from '@/types';
import { useSearchParams, useRouter } from 'next/navigation';
import { useBalance } from '@/context/BalanceContext';
import { useTheme } from '@/context/ThemeContext';
import { useTranslation } from '@/hooks/useTranslation';
import { useCurrency } from '@/context/CurrencyContext';
const pie = '/icon/pie.svg';
const bar = '/icon/bar.svg';

const barChartData = [
  { name: 'Пн', amount: 45000 },
  { name: 'Вт', amount: 35000 },
  { name: 'Ср', amount: 55000 },
  { name: 'Чт', amount: 40000 },
  { name: 'Пт', amount: 65000 },
  { name: 'Сб', amount: 50000 },
  { name: 'Вс', amount: 45000 },
];

function HomeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const urlUserId = searchParams.get('userId');
  const { balance, setBalance, isLoading: isBalanceLoading } = useBalance();
  const { isLightTheme } = useTheme();
  const { t } = useTranslation();
  const { convertAmount, getCurrencySymbol } = useCurrency();
  
  const [activeChart, setActiveChart] = useState<'pie' | 'bar'>('pie');
  const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false);
  const [isEditBalanceOpen, setIsEditBalanceOpen] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Determine if we're on localhost and set the appropriate userId
        const isLocalhost = window.location.hostname === 'localhost';
        let newUserId = isLocalhost ? 'test-user-123' : urlUserId;
        
        // If no userId in URL, try to get from localStorage
        if (!newUserId) {
          newUserId = localStorage.getItem('userId');
        }
        
        // If still no userId, redirect to error page
        if (!newUserId) {
          router.push('/error?message=Please open this app from Telegram');
          return;
        }
        
        setUserId(newUserId);
        
        // Save userId to localStorage if it's not already there
        if (!localStorage.getItem('userId')) {
          localStorage.setItem('userId', newUserId);
        }

        const userTransactions = await getUserTransactions(newUserId);
        setTransactions(userTransactions);
      } catch (error) {
        console.error('Error initializing app:', error);
        router.push('/error?message=Failed to load transactions');
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();
  }, [urlUserId, router]);

  const handleAddTransaction = async (category: string, amount: number, color: string) => {
    if (!userId) return;

    try {
      await addTransactionToFirebase(userId, amount, category, color);
      const userTransactions = await getUserTransactions(userId);
      setTransactions(userTransactions);
      // Update balance immediately
      setBalance(balance + amount);
      setIsAddTransactionOpen(false);
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  const handleEditTransaction = async (updatedTransaction: Transaction) => {
    try {
      await updateTransaction(updatedTransaction.id, updatedTransaction.amount);
      setTransactions(prev => 
        prev.map(t => t.id === updatedTransaction.id ? updatedTransaction : t)
      );
    } catch (error) {
      console.error('Error updating transaction:', error);
    }
  };

  const handleDeleteTransaction = async (transactionId: string) => {
    try {
      const transactionToDelete = transactions.find(t => t.id === transactionId);
      if (!transactionToDelete) return;

      await deleteTransaction(transactionId);
      setTransactions(prev => prev.filter(t => t.id !== transactionId));
      setSelectedTransaction(null);
      // Update balance
      setBalance(balance - transactionToDelete.amount);
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  // Group transactions by category and sum amounts
  const expensesByCategory = transactions
    .filter(transaction => transaction.amount < 0) // Only include expenses
    .reduce((acc: { category: string; amount: number; color: string }[], transaction) => {
      const existing = acc.find(e => e.category === transaction.category);
      if (existing) {
        existing.amount += Math.abs(transaction.amount); // Use absolute value for chart
      } else {
        acc.push({
          category: transaction.category,
          amount: Math.abs(transaction.amount), // Use absolute value for chart
          color: transaction.color
        });
      }
      return acc;
    }, []);

  // Group transactions by date for bar chart
  const transactionsByDate = transactions
    .filter(transaction => transaction.amount < 0) // Only include expenses
    .reduce((acc: { name: string; amount: number; color: string }[], transaction) => {
      const date = new Date(transaction.date);
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' }).toLowerCase();
      const existing = acc.find(d => d.name === dayName);
      if (existing) {
        existing.amount += Math.abs(transaction.amount);
      } else {
        acc.push({
          name: dayName,
          amount: Math.abs(transaction.amount),
          color: transaction.color
        });
      }
      return acc;
    }, []);

  // Sort by day of week
  const sortedTransactionsByDate = transactionsByDate.sort((a: { name: string }, b: { name: string }) => {
    const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
    return days.indexOf(a.name) - days.indexOf(b.name);
  }).map(day => ({
    ...day,
    name: t(`weekdays.${day.name}`)
  }));

  const handleEditBalance = (newBalance: number) => {
    setBalance(newBalance);
  };

  // Calculate total from transactions
  const transactionsTotal = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
  
  // If manual balance is set, use it directly
  // If not set, use transactions total
  const totalExpenses = balance !== null ? balance : transactionsTotal;

  if (isLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isLightTheme ? 'bg-white' : 'bg-gray-900'}`}>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#8B5CF6] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className={`text-lg font-medium ${isLightTheme ? 'text-gray-900' : 'text-white'}`}>{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  if (!userId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-semibold text-gray-800">{t('common.openFromTelegram')}</h1>
          <button
            onClick={() => router.push('/error')}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mt-4"
          >
            {t('common.goToError')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className={`min-h-screen pb-16 ${isLightTheme ? 'bg-gray-50' : 'bg-gray-900'  }`} >
  <div className="p-4 " >
    <div className={`rounded-lg p-6 mb-6 ${isLightTheme ? 'bg-white' : 'bg-gray-800'} shadow`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className={`text-2xl font-bold ${isLightTheme ? 'text-gray-800' : 'text-white'}`}>{t('home.myFinance')}</h1>
      </div>

      <div className="flex items-center justify-between mb-6" >
        <div>
          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-500">{t('home.totalBalance')}</p>
            <button
              onClick={() => setIsEditBalanceOpen(true)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          <p className={`text-2xl font-bold ${balance < 0 ? 'text-red-500' : isLightTheme ? 'text-gray-900' : 'text-white'}`}>
            {getCurrencySymbol()}{convertAmount(balance).toFixed(2)}
          </p>
        </div>
        
      </div>

      <div className="h-59">
        {activeChart === 'pie' ? (
          <ExpenseChart expenses={expensesByCategory} income={0} />
        ) : (
          <BarChart data={sortedTransactionsByDate} />
        )}
      </div>
      <div className="flex gap-2 justify-end mt-3">
 <button
  onClick={() => setActiveChart('pie')}
  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors flex  items-center justify-center ${
    activeChart === 'pie'
      ? 'bg-[#8B5CF6] text-white'
      : 'bg-gray-100 hover:bg-gray-200 text-black'
  }`}
>
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">

      <path d="M9.07031 0.773438C5.03906 1.90312 1.88438 5.19375 0.91875 9.28125C0.69375 10.2328 0.632812 10.7719 0.632812 11.9297C0.6375 13.1484 0.703125 13.7203 0.960938 14.7469C1.7625 17.8969 3.90469 20.5922 6.80625 22.0969C8.47969 22.9687 10.2094 23.3906 12.1125 23.3906C16.9266 23.3906 21.2484 20.2969 22.8516 15.6984C23.0813 15.0422 23.25 14.3766 23.25 14.1375C23.25 13.8656 23.0859 13.6031 22.8281 13.4672L22.6219 13.3547L20.25 13.3687L17.8781 13.3828L17.6859 13.5094C17.5266 13.6125 17.4703 13.7016 17.2969 14.1047C16.5188 15.9469 15.1125 17.1375 13.2188 17.5453C12.6375 17.6719 11.5453 17.6766 11.0016 17.5594C8.65313 17.0484 6.89063 15.2719 6.44063 12.9516C6.33281 12.4078 6.33281 11.4141 6.44063 10.8609C6.525 10.4109 6.74063 9.76875 6.92344 9.39844C7.51875 8.20781 8.64844 7.14844 9.9 6.60469C10.0875 6.525 10.3031 6.40312 10.3781 6.33281C10.6406 6.08906 10.6406 6.1125 10.6406 3.55312V1.19531L10.5328 1.00781C10.3969 0.768749 10.1203 0.609375 9.84375 0.614061C9.72656 0.614061 9.37969 0.684374 9.07031 0.773438Z" fill="currentColor" fillOpacity="0.88" />
      <path d="M13.9786 0.689063C13.777 0.7875 13.6083 0.989063 13.5473 1.20938C13.4723 1.49063 13.4864 5.78906 13.5661 6.01406C13.6645 6.28594 13.763 6.36563 14.3301 6.63281C15.7036 7.28438 16.6692 8.23594 17.3255 9.58594C17.4895 9.92344 17.6583 10.2328 17.7051 10.2797C17.9489 10.4953 18.0051 10.5 20.4239 10.5C22.9692 10.5 22.9411 10.5 23.2176 10.1766C23.4661 9.87656 23.4426 9.58125 23.063 8.42813C22.5239 6.78281 21.5864 5.24531 20.3536 3.975C18.8489 2.41875 17.0958 1.36406 15.0567 0.773438C14.4145 0.590626 14.2083 0.576563 13.9786 0.689063Z" fill="currentColor" fillOpacity="0.88" />


  </svg>
</button>

<button
  onClick={() => setActiveChart('bar')}
  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors flex items-center justify-center ${
    activeChart === 'bar'
      ? 'bg-[#8B5CF6] text-white'
      : 'bg-gray-100 hover:bg-gray-200 text-black'
  }`}
>
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
    <path d="M17.6968 1.0762C16.9074 1.28709 16.2908 1.91976 16.0806 2.72114C15.9731 3.12417 15.9731 19.8735 16.0806 20.2766C16.2908 21.0873 16.912 21.7153 17.7155 21.9262C18.1078 22.0246 19.8922 22.0246 20.2845 21.9262C21.088 21.7153 21.7092 21.0873 21.9194 20.2766C22.0269 19.8735 22.0269 3.12417 21.9194 2.72114C21.7092 1.91038 21.088 1.2824 20.2845 1.07151C19.9062 0.973095 18.0658 0.977781 17.6968 1.0762Z" fill="currentColor" fillOpacity="0.88" />
    <path d="M10.696 7.07619C9.90614 7.28706 9.2892 7.91967 9.07888 8.72098C8.97138 9.12867 8.97606 19.8737 9.07888 20.2861C9.2892 21.0921 9.91549 21.7153 10.7241 21.9262C11.1026 22.0246 12.8974 22.0246 13.2759 21.9262C14.0845 21.7153 14.7108 21.0921 14.9211 20.2861C15.0239 19.8737 15.0286 9.12867 14.9211 8.72098C14.7108 7.9103 14.0892 7.28238 13.2853 7.0715C12.9067 6.9731 11.0652 6.97778 10.696 7.07619Z" fill="currentColor" fillOpacity="0.88" />
    <path d="M2.69525 11.0798C1.90491 11.3007 1.28761 11.9633 1.07716 12.8027C0.974279 13.2199 0.974279 19.7777 1.07716 20.1949C1.28761 21.0441 1.90959 21.7018 2.71395 21.9227C3.10678 22.0258 4.89322 22.0258 5.28605 21.9227C6.09041 21.7018 6.71239 21.0441 6.92284 20.1949C7.02572 19.7777 7.02572 13.2199 6.92284 12.8027C6.71239 11.9535 6.09041 11.2958 5.28605 11.0749C4.90725 10.9718 3.06469 10.9767 2.69525 11.0798Z" fill="currentColor" fillOpacity="0.88" />
  </svg>
</button>

</div>


      <div className="space-y-4">
        <h2 className={`text-lg font-semibold ${isLightTheme ? 'text-gray-800' : 'text-white'}`}>{t('home.recentTransactions')}</h2>
        {transactions.length === 0 ? (
          <p className={`text-center ${isLightTheme ? 'text-gray-600' : 'text-gray-400'}`}>{t('common.noTransactions')}</p>
        ) : (
          transactions.map((transaction) => (
            <div
              key={transaction.id}
              onClick={() => setSelectedTransaction(transaction)}
              className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-colors duration-200 relative ${
    isLightTheme
      ? 'bg-gray-50 hover:bg-gray-100'
      : 'bg-gray-700 hover:bg-gray-600'
  }`}
  style={{
    borderLeft: `6px solid ${transaction.color}`,
  }}
>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'white' }}
                >
                  <img
                            src={`/icon/${transaction.category.toLowerCase()}.svg`}
                            alt={transaction.category}
                            className="w-5 h-5," 
                          />
                </div>
                <div>
                  <p className={`font-medium ${isLightTheme ? 'text-gray-900' : 'text-white'}`}>
                    {t(`categories.${transaction.category}`)}
                  </p>
                  <p className="text-sm text-gray-500">
                    {transaction.date.toLocaleDateString()}
                  </p>
                </div>
              </div>
              <p className={`font-semibold ${transaction.amount < 0 ? 'text-red-500' : 'text-green-500'}`}>
                {transaction.amount < 0 ? '-' : '+'}
                {getCurrencySymbol()}{convertAmount(Math.abs(transaction.amount)).toFixed(2)}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  </div>

  <button
    onClick={() => setIsAddTransactionOpen(true)}
    className="fixed bottom-24 right-4 w-14 h-14 bg-[#8B5CF6] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#7C3AED] transition-colors z-50"
  >
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  </button>

  <BottomNav />

  {isAddTransactionOpen && (
    <AddTransaction
      isOpen={isAddTransactionOpen}
      onClose={() => setIsAddTransactionOpen(false)}
      onAddTransaction={handleAddTransaction}
    />
  )}

  {selectedTransaction && (
    <EditTransactionModal
      isOpen={true}
      onClose={() => setSelectedTransaction(null)}
      transaction={selectedTransaction}
      onEdit={handleEditTransaction}
      onDelete={handleDeleteTransaction}
    />
  )}

  {isEditBalanceOpen && (
    <EditBalanceModal
      isOpen={isEditBalanceOpen}
      onClose={() => setIsEditBalanceOpen(false)}
      currentBalance={balance}
      onSave={setBalance}
      transactions={transactions}
    />
  )}
</main>

  );
}

// Wrap the component that uses Suspense
const HomeContentWithSuspense = () => {
  const { isLightTheme } = useTheme();
  const { t } = useTranslation();
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
};

export default HomeContentWithSuspense;
