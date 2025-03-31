'use client';

import React, { useState } from 'react';
import { Transaction } from '@/firebaseConfig';

interface EditTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: Transaction;
  onEdit: (transactionId: string, newAmount: number) => void;
  onDelete: (transactionId: string) => void;
}

export function EditTransactionModal({
  isOpen,
  onClose,
  transaction,
  onEdit,
  onDelete,
}: EditTransactionModalProps) {
  const [amount, setAmount] = useState(Math.abs(transaction.amount).toString());

  const handleSubmit = () => {
    const newAmount = transaction.amount < 0 
      ? -Math.abs(parseFloat(amount))
      : Math.abs(parseFloat(amount));
    onEdit(transaction.id, newAmount);
    onClose();
  };

  const handleDelete = () => {
    onDelete(transaction.id);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-t-3xl p-6">
        <div className="flex items-center mb-6">
          <button onClick={onClose} className="text-gray-400 mr-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <h2 className="text-xl font-semibold">Edit transaction</h2>
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl mb-6">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: transaction.color }}
            >
              <span className="text-white font-medium">
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

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount
            </label>
            <div className="relative">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent text-xl font-semibold"
                placeholder="Enter amount"
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                {/* {transaction.amount < 0 ? '-' : '+'}$ */}
              </span>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSubmit}
              disabled={!amount}
              className="flex-1 bg-[#8B5CF6] text-white py-3 px-4 rounded-xl font-medium hover:bg-[#7C3AED] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save Changes
            </button>
            <button
              onClick={handleDelete}
              className="flex-1 bg-red-500 text-white py-3 px-4 rounded-xl font-medium hover:bg-red-600 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 