import React from 'react';
import Icon from '../Icon';
import { useTransactions } from '../../context/TransactionContext';

const RecentTable: React.FC = () => {
  const { transactions, formatCurrency } = useTransactions();

  // Get only the last 5 transactions
  const recentTransactions = transactions.slice(0, 5);

  // Helper to get icon props based on category (Simple mapping)
  const getCategoryStyles = (category: string) => {
    switch(category.toLowerCase()) {
      case 'food': 
      case 'groceries':
      case 'dining':
        return { icon: 'restaurant', bg: 'bg-orange-100 dark:bg-orange-900/30', color: 'text-orange-600 dark:text-orange-400', name: 'Food' };
      case 'education':
        return { icon: 'school', bg: 'bg-blue-100 dark:bg-blue-900/30', color: 'text-blue-600 dark:text-blue-400', name: 'Education' };
      case 'utilities':
        return { icon: 'water_drop', bg: 'bg-cyan-100 dark:bg-cyan-900/30', color: 'text-cyan-600 dark:text-cyan-400', name: 'Utilities' };
      case 'salary':
      case 'income':
        return { icon: 'payments', bg: 'bg-green-100 dark:bg-green-900/30', color: 'text-green-600 dark:text-green-400', name: 'Income' };
      default:
        return { icon: 'shopping_bag', bg: 'bg-gray-100 dark:bg-gray-800', color: 'text-gray-600 dark:text-gray-400', name: 'General' };
    }
  };

  return (
    <div className="flex flex-col rounded-3xl bg-card-light shadow-sm ring-1 ring-gray-100 dark:bg-card-dark dark:ring-gray-800 xl:col-span-2 overflow-hidden">
      <div className="flex items-center justify-between border-b border-gray-100 p-6 md:p-8 dark:border-gray-800">
        <h3 className="text-xl font-bold text-text-main-light dark:text-white">Recent Transactions</h3>
        <button className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-bold text-secondary hover:bg-blue-50 hover:text-blue-600 dark:text-blue-400 dark:hover:bg-blue-900/20">
          View Full History
          <Icon name="arrow_forward" size={18} />
        </button>
      </div>
      <div className="overflow-x-auto p-4">
        <table className="w-full text-left text-base min-w-[600px]">
          <thead className="text-text-muted-light dark:text-text-muted-dark border-b border-gray-50 dark:border-gray-800">
            <tr>
              <th className="px-6 py-4 font-semibold w-1/4">Category</th>
              <th className="px-6 py-4 font-semibold w-1/3">Description</th>
              <th className="px-6 py-4 text-right font-semibold">Amount</th>
              <th className="px-6 py-4 text-right font-semibold">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {recentTransactions.map((tx) => {
              const style = getCategoryStyles(tx.category);
              return (
                <tr key={tx.id} className="group transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${style.bg} ${style.color}`}>
                        <Icon name={style.icon} />
                      </div>
                      <span className="font-bold text-text-main-light dark:text-white">{style.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 font-medium text-text-main-light dark:text-gray-300">
                    {tx.merchant || tx.note}
                  </td>
                  <td className={`px-6 py-5 text-right font-bold ${tx.type === 'income' ? 'text-primary' : 'text-text-main-light dark:text-white'}`}>
                    {tx.type === 'expense' ? '- ' : '+ '}
                    {formatCurrency(tx.amount)}
                  </td>
                  <td className="px-6 py-5 text-right text-sm text-text-muted-light dark:text-text-muted-dark">{tx.date}</td>
                </tr>
              );
            })}
            {recentTransactions.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-8 text-text-muted-light">No transactions found. Add one to get started!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentTable;