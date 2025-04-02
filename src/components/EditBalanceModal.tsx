'use client';

import React, { useState } from 'react';

interface EditBalanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentBalance: number;
  onSave: (newBalance: number) => void;
}

export function EditBalanceModal({
  isOpen,
  onClose,
  currentBalance,
  onSave,
}: EditBalanceModalProps) {
  const [balance, setBalance] = useState(currentBalance.toString());

  const handleSubmit = () => {
    const newBalance = parseFloat(balance);
    onSave(newBalance);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center">
      <div className="bg-white w-full max-w-md rounded-t-3xl">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Edit Balance</h2>
            <button onClick={onClose} className="text-gray-400">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Balance
            </label>
            <div className="relative">
              <input
                type="number"
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent text-xl font-semibold bg-white text-gray-900"
                placeholder="Enter balance"
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                $
              </span>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!balance}
            className={`w-full py-3 rounded-lg font-medium ${
              balance ? 'bg-[#8B5CF6] text-white' : 'bg-gray-100 text-gray-400'
            }`}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
} 