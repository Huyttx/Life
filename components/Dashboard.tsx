import React from 'react';
import Icon from './Icon';
import SummaryCards from './dashboard/SummaryCards';
import RecentTable from './dashboard/RecentTable';
import ExpenseChart from './dashboard/ExpenseChart';

interface DashboardProps {
  onAddTransaction: () => void;
  setMobileMenuOpen: (open: boolean) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onAddTransaction, setMobileMenuOpen }) => {
  return (
    <div className="flex flex-col w-full h-full">
      {/* Header */}
      <header className="sticky top-0 z-20 w-full border-b border-gray-200 bg-card-light/90 backdrop-blur-md dark:bg-card-dark/90 dark:border-gray-800 shrink-0">
        <div className="flex flex-wrap items-center justify-between gap-4 px-6 md:px-8 py-6">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3 md:hidden mb-2">
                 <button onClick={() => setMobileMenuOpen(true)}>
                    <Icon name="menu" className="text-text-main-light dark:text-white" />
                 </button>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-text-main-light dark:text-white">Dashboard</h2>
            <p className="text-sm md:text-base font-medium text-text-muted-light dark:text-text-muted-dark">Financial status for October 2023</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="hidden md:flex h-12 items-center gap-2 rounded-xl bg-white px-6 text-sm font-bold text-text-main-light shadow-sm ring-1 ring-gray-200 transition hover:bg-gray-50 dark:bg-gray-800 dark:text-white dark:ring-gray-700 dark:hover:bg-gray-700">
              <Icon name="calendar_month" size={20} />
              <span>Oct 2023</span>
            </button>
            <button 
              onClick={onAddTransaction}
              className="flex h-12 items-center gap-2 rounded-xl bg-primary px-6 text-sm font-bold text-white shadow-lg shadow-green-500/20 transition hover:bg-primary-hover hover:scale-105 active:scale-95 dark:text-gray-900"
            >
              <Icon name="add" size={22} />
              <span className="hidden md:inline">Add Transaction</span>
              <span className="md:hidden">Add</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-col gap-8 p-6 md:p-8 max-w-[1600px] mx-auto w-full pb-24 md:pb-8">
        <SummaryCards />
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
          <RecentTable />
          <ExpenseChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;