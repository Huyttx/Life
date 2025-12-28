import React from 'react';
import { Transaction } from '../types';
import Icon from './Icon';

interface RecentTransactionsProps {
  transactions: Transaction[];
}

const RecentTransactions: React.FC<RecentTransactionsProps> = ({ transactions }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-[#0d131b] text-xl font-bold">Recent Transactions</h3>
        <a href="#" className="text-primary text-sm font-bold hover:underline">View All</a>
      </div>
      <div className="flex flex-col gap-3">
        {transactions.map((tx) => (
          <div 
            key={tx.id}
            className="flex items-center justify-between p-4 bg-white border border-[#e7ecf3] rounded-2xl shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className={`flex items-center justify-center size-12 rounded-full ${tx.iconColorClass}`}>
                <Icon name={tx.categoryIcon} />
              </div>
              <div className="flex flex-col">
                <span className="text-[#0d131b] font-bold text-base">{tx.merchant}</span>
                <span className="text-[#4c6c9a] text-sm">{tx.date}</span>
              </div>
            </div>
            <span className="text-red-600 font-bold text-base">- {tx.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;