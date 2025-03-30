'use client';

import React from 'react';
import { Transaction } from '@/firebaseConfig';

interface EditTransactionProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: Transaction | null;
  onUpdate: (transactionId: string, newAmount: number) => Promise<void>;
  onDelete: (transactionId: string) => Promise<void>;
}

export function EditTransaction({ isOpen, onClose, transaction, onUpdate, onDelete }: EditTransactionProps) {
  const [amount, setAmount] = React.useState<string>('');

  React.useEffect(() => {
    if (transaction) {
      setAmount(transaction.amount.toString());
    }
  }, [transaction]);

  if (!isOpen || !transaction) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onUpdate(transaction.id, parseFloat(amount));
    onClose();
  };

  const handleDelete = async () => {
    await onDelete(transaction.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Edit Transaction</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ backgroundColor: transaction.color }}
          >
            <span className="text-white font-medium text-lg">
              {transaction.category.charAt(0)}
            </span>
          </div>
          <div>
            <p className="font-medium text-gray-900">{transaction.category}</p>
            <p className="text-sm text-gray-500">
              {transaction.date.toLocaleDateString()}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent"
              required
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-[#8B5CF6] text-white py-2 px-4 rounded-lg hover:bg-[#7C3AED] transition-colors"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 