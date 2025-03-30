import { useState } from 'react';
import { Transaction, deleteTransaction, updateTransaction } from '@/firebaseConfig';

interface TransactionHistoryProps {
  transactions: Transaction[];
  onTransactionUpdate: () => void;
}

export default function TransactionHistory({ transactions, onTransactionUpdate }: TransactionHistoryProps) {
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [editAmount, setEditAmount] = useState<string>('');

  const handleDelete = async (transactionId: string) => {
    try {
      await deleteTransaction(transactionId);
      onTransactionUpdate();
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setEditAmount(transaction.amount.toString());
  };

  const handleSaveEdit = async () => {
    if (!editingTransaction || !editAmount) return;
    try {
      await updateTransaction(editingTransaction.id, parseFloat(editAmount));
      setEditingTransaction(null);
      setEditAmount('');
      onTransactionUpdate();
    } catch (error) {
      console.error('Error updating transaction:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingTransaction(null);
    setEditAmount('');
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">История транзакций</h2>
      <div className="space-y-4">
        {transactions.length === 0 ? (
          <p className="text-gray-500 text-center py-4">Нет транзакций</p>
        ) : (
          transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: transaction.color }}
                >
                  <span className="text-white font-medium">
                    {transaction.category.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-800">{transaction.category}</p>
                  <p className="text-sm text-gray-500">
                    {transaction.date.toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {editingTransaction?.id === transaction.id ? (
                  <>
                    <input
                      type="number"
                      value={editAmount}
                      onChange={(e) => setEditAmount(e.target.value)}
                      className="w-24 px-2 py-1 border rounded"
                    />
                    <button
                      onClick={handleSaveEdit}
                      className="text-green-500 hover:text-green-600"
                    >
                      Сохранить
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="text-gray-500 hover:text-gray-600"
                    >
                      Отмена
                    </button>
                  </>
                ) : (
                  <>
                    <p className="font-semibold text-gray-800">
                      {transaction.amount} ₽
                    </p>
                    <button
                      onClick={() => handleEdit(transaction)}
                      className="text-blue-500 hover:text-blue-600"
                    >
                      ✎
                    </button>
                    <button
                      onClick={() => handleDelete(transaction.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      ×
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 