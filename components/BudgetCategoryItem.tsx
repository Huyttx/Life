import React from 'react';
import Icon from './Icon';
import { BudgetCategory } from '../types';

interface BudgetCategoryItemProps {
  category: BudgetCategory;
}

const BudgetCategoryItem: React.FC<BudgetCategoryItemProps> = ({ category }) => {
  const percentage = Math.min(100, (category.spent / category.total) * 100);
  
  // Format currency
  const formatMoney = (amount: number) => amount.toLocaleString('vi-VN') + ' đ';

  return (
    <div className="p-4 bg-white dark:bg-[#1a2634] rounded-xl shadow-sm border border-slate-100 dark:border-slate-700/50">
      <div className="flex items-start justify-between mb-3">
        <div className="flex gap-3">
          <div className={`size-12 rounded-full flex items-center justify-center ${category.iconBgClass} ${category.iconColorClass}`}>
            <Icon name={category.icon} />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-[#0d131b] dark:text-white text-lg">{category.name}</span>
            <span className="text-xs text-secondary dark:text-slate-400">
              {category.subtitle || `Đã tiêu ${formatMoney(category.spent)}`}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-xs text-secondary dark:text-slate-400">
             {category.remaining !== undefined ? 'Còn lại' : 'Đã tiêu'}
          </span>
          <span className={`font-bold text-lg ${category.amountColorClass}`}>
            {category.remaining !== undefined ? formatMoney(category.remaining) : formatMoney(category.spent)}
          </span>
        </div>
      </div>
      {/* Progress */}
      <div className="relative w-full h-2.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
        <div 
          className={`absolute top-0 left-0 h-full rounded-full ${category.barColorClass}`} 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default BudgetCategoryItem;