import React from 'react';
import Icon from '../Icon';
import { useTransactions } from '../../context/TransactionContext';

interface SummaryCardData {
  label: string;
  value: string;
  icon: string;
  iconColorClass: string;
  iconBgClass: string;
  trend?: string;
  trendIcon?: string;
  trendColorClass?: string;
  trendBgClass?: string;
  isPrimary?: boolean;
}

const SummaryCards: React.FC = () => {
  const { totalIncome, totalExpense, balance, formatCurrency } = useTransactions();

  // Basic calculation for "Trend" (Mock logic for now, could be improved with historical data comparison)
  const incomeTrend = "+12% vs last month"; 
  const expenseTrend = "High spending";

  const data: SummaryCardData[] = [
    {
      label: "Total Income",
      value: formatCurrency(totalIncome),
      icon: "payments",
      iconColorClass: "text-blue-500 dark:text-blue-400",
      iconBgClass: "bg-blue-50 dark:bg-blue-900/30",
      trend: incomeTrend,
      trendIcon: "trending_up",
      trendColorClass: "text-green-600 dark:text-green-400",
      trendBgClass: "bg-green-50 dark:bg-green-900/30"
    },
    {
      label: "Total Expense",
      value: formatCurrency(totalExpense),
      icon: "shopping_cart",
      iconColorClass: "text-orange-500 dark:text-orange-400",
      iconBgClass: "bg-orange-50 dark:bg-orange-900/30",
      trend: expenseTrend,
      trendIcon: "trending_up",
      trendColorClass: "text-alert dark:text-red-400",
      trendBgClass: "bg-red-50 dark:bg-red-900/30"
    },
    {
      label: "Remaining Balance",
      value: formatCurrency(balance),
      icon: "account_balance",
      iconColorClass: "text-white",
      iconBgClass: "bg-white/20",
      isPrimary: true
    }
  ];

  return (
    <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {data.map((item, index) => (
        <div 
          key={index} 
          className={`group flex flex-col justify-between rounded-3xl p-6 shadow-sm transition-all hover:shadow-md ${
            item.isPrimary 
              ? 'relative overflow-hidden bg-green-600 shadow-lg shadow-green-200 hover:shadow-xl hover:shadow-green-300 dark:bg-green-900 dark:shadow-none' 
              : 'bg-card-light ring-1 ring-gray-100 dark:bg-card-dark dark:ring-gray-800'
          }`}
        >
          {item.isPrimary && (
            <>
              <div className="absolute right-0 top-0 -mr-6 -mt-6 h-48 w-48 rounded-full bg-white/20 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 -ml-6 -mb-6 h-32 w-32 rounded-full bg-white/10 blur-2xl"></div>
            </>
          )}

          <div className={`relative flex items-center justify-between mb-4 ${item.isPrimary ? 'z-10' : ''}`}>
            <p className={`text-lg font-semibold ${item.isPrimary ? 'text-white/90' : 'text-text-muted-light dark:text-text-muted-dark'}`}>
              {item.label}
            </p>
            <div className={`rounded-full p-3 backdrop-blur-sm ${item.iconBgClass} ${item.iconColorClass}`}>
              <Icon name={item.icon} size={28} />
            </div>
          </div>
          
          <div className={`relative mt-auto ${item.isPrimary ? 'z-10' : ''}`}>
            <p className={`text-3xl md:text-4xl font-bold tracking-tight ${item.isPrimary ? 'text-white' : 'text-text-main-light dark:text-white'}`}>
              {item.value}
            </p>
            
            {item.trend && (
              <p className={`mt-3 flex items-center gap-2 text-sm font-semibold w-fit px-2 py-1 rounded-lg ${item.trendColorClass} ${item.trendBgClass}`}>
                <Icon name={item.trendIcon || "trending_up"} size={18} />
                {item.trend}
              </p>
            )}

            {item.isPrimary && (
              <p className="mt-3 flex items-center gap-1 text-sm font-bold text-white/80">
                  Available for use
              </p>
            )}
          </div>
        </div>
      ))}
    </section>
  );
};

export default SummaryCards;