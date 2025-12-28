import React from 'react';
import Icon from '../Icon';

const ExpenseChart: React.FC = () => {
  return (
    <div className="flex flex-col rounded-3xl bg-card-light p-8 shadow-sm ring-1 ring-gray-100 dark:bg-card-dark dark:ring-gray-800 xl:col-span-1 h-fit">
      <div className="mb-8 flex items-center justify-between">
        <h3 className="text-xl font-bold text-text-main-light dark:text-white">Expense by Category</h3>
        <button className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300">
          <Icon name="more_vert" />
        </button>
      </div>
      
      <div className="flex flex-col items-center gap-10">
          {/* Conic Gradient Donut */}
        <div 
          className="relative flex h-72 w-72 items-center justify-center rounded-full shadow-sm" 
          style={{ background: 'conic-gradient(#fb923c 0% 25%, #60a5fa 25% 45%, #4ade80 45% 75%, #f472b6 75% 85%, #9ca3af 85% 100%)' }}
        >
          <div className="absolute h-56 w-56 rounded-full bg-card-light shadow-inner dark:bg-card-dark">
            <div className="flex h-full flex-col items-center justify-center">
              <span className="text-sm font-semibold uppercase tracking-wider text-text-muted-light dark:text-text-muted-dark">Total Spent</span>
              <span className="text-3xl font-black text-text-main-light dark:text-white">32M ₫</span>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex w-full flex-col gap-5 px-4">
            <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="h-4 w-4 rounded-full bg-green-400"></span>
              <span className="text-base font-semibold text-text-main-light dark:text-white">Food</span>
            </div>
            <span className="text-base font-bold text-text-muted-light dark:text-text-muted-dark">30%</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="h-4 w-4 rounded-full bg-orange-400"></span>
              <span className="text-base font-semibold text-text-main-light dark:text-white">Education</span>
            </div>
            <span className="text-base font-bold text-text-muted-light dark:text-text-muted-dark">25%</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="h-4 w-4 rounded-full bg-blue-400"></span>
              <span className="text-base font-semibold text-text-main-light dark:text-white">Utilities</span>
            </div>
            <span className="text-base font-bold text-text-muted-light dark:text-text-muted-dark">20%</span>
          </div>
          <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
              <span className="h-4 w-4 rounded-full bg-pink-400"></span>
              <span className="text-base font-semibold text-text-main-light dark:text-white">Wed/Fun</span>
            </div>
            <span className="text-base font-bold text-text-muted-light dark:text-text-muted-dark">10%</span>
          </div>
          <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
              <span className="h-4 w-4 rounded-full bg-gray-400"></span>
              <span className="text-base font-semibold text-text-main-light dark:text-white">Others</span>
            </div>
            <span className="text-base font-bold text-text-muted-light dark:text-text-muted-dark">15%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseChart;