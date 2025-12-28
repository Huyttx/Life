import React from 'react';
import Icon from './Icon';

interface MobileBottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onAdd?: () => void;
}

const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ activeTab, onTabChange, onAdd }) => {
  return (
    <nav className="absolute bottom-0 w-full border-t border-gray-200 dark:border-gray-800 bg-card-light dark:bg-card-dark py-2 z-50 md:hidden shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
      <ul className="flex justify-around items-center">
        {/* Home */}
        <li className="flex-1">
          <button 
            onClick={() => onTabChange('dashboard')}
            className={`flex w-full flex-col items-center justify-center gap-1 py-2 ${activeTab === 'dashboard' ? 'text-primary' : 'text-text-muted-light hover:text-primary dark:text-text-muted-dark'} transition-colors`}
          >
            <Icon name="dashboard" className={`text-2xl ${activeTab === 'dashboard' ? 'filled' : ''}`} />
            <span className={`text-[10px] ${activeTab === 'dashboard' ? 'font-bold' : 'font-medium'}`}>Dashboard</span>
          </button>
        </li>
        
        {/* Income (Replaced News) */}
        <li className="flex-1">
          <button 
            onClick={() => onTabChange('income')}
            className={`flex w-full flex-col items-center justify-center gap-1 py-2 ${activeTab === 'income' ? 'text-primary' : 'text-text-muted-light hover:text-primary dark:text-text-muted-dark'} transition-colors`}
          >
            <Icon name="account_balance_wallet" className={`text-2xl ${activeTab === 'income' ? 'filled' : ''}`} />
            <span className={`text-[10px] ${activeTab === 'income' ? 'font-bold' : 'font-medium'}`}>Income</span>
          </button>
        </li>

        {/* Central Add Button (FAB) */}
        <li className="flex-1 -mt-8">
          <button 
            onClick={onAdd}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-green-500/40 hover:scale-105 transition-transform mx-auto"
          >
            <Icon name="add" className="text-3xl" />
          </button>
        </li>

        {/* Wallet / History */}
        <li className="flex-1">
          <button 
            onClick={() => onTabChange('history')}
            className={`flex w-full flex-col items-center justify-center gap-1 py-2 ${activeTab === 'history' ? 'text-primary' : 'text-text-muted-light hover:text-primary dark:text-text-muted-dark'} transition-colors`}
          >
            <Icon name="receipt_long" className={`text-2xl ${activeTab === 'history' ? 'filled' : ''}`} />
            <span className={`text-[10px] ${activeTab === 'history' ? 'font-bold' : 'font-medium'}`}>Trans.</span>
          </button>
        </li>

        {/* Account */}
        <li className="flex-1">
          <button 
            onClick={() => onTabChange('account')}
            className={`flex w-full flex-col items-center justify-center gap-1 py-2 ${activeTab === 'account' ? 'text-primary' : 'text-text-muted-light hover:text-primary dark:text-text-muted-dark'} transition-colors`}
          >
            <Icon name="person" className={`text-2xl ${activeTab === 'account' ? 'filled' : ''}`} />
            <span className={`text-[10px] ${activeTab === 'account' ? 'font-bold' : 'font-medium'}`}>Account</span>
          </button>
        </li>
      </ul>
      {/* Safe Area for mobile gestures */}
      <div className="h-4 w-full"></div>
    </nav>
  );
};

export default MobileBottomNav;