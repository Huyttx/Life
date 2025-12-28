import React from 'react';
import Icon from './Icon';

interface SidebarProps {
  currentView?: string;
  onViewChange?: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView = 'dashboard', onViewChange }) => {
  const menuItems = [
    { id: 'dashboard', icon: 'dashboard', label: 'Dashboard', filled: true },
    { id: 'expense-entry', icon: 'add_circle', label: 'Add Transaction' },
    { id: 'history', icon: 'receipt_long', label: 'Transactions' },
    { id: 'income', icon: 'account_balance_wallet', label: 'Income', filled: true },
    { id: 'budget', icon: 'pie_chart', label: 'Budget' },
    { id: 'reports', icon: 'analytics', label: 'Reports' },
    { id: 'account', icon: 'settings', label: 'Settings' },
  ];

  return (
    <aside className="hidden md:flex w-72 flex-col border-r border-gray-200 bg-card-light dark:bg-card-dark dark:border-gray-800 transition-colors duration-200 h-full shrink-0">
      <div className="flex h-full flex-col justify-between p-6">
        <div className="flex flex-col gap-8">
          {/* Brand */}
          <div className="flex items-center gap-3 px-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/20 text-green-600 dark:text-primary">
              <Icon name="account_balance_wallet" className="text-3xl" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-text-main-light dark:text-white">VietFin Family</h1>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onViewChange && onViewChange(item.id)}
                className={`flex items-center gap-4 rounded-xl px-4 py-3.5 text-base transition-colors w-full text-left ${
                  currentView === item.id
                    ? 'bg-primary/10 font-semibold text-green-700 dark:text-primary'
                    : 'font-medium text-text-muted-light hover:bg-gray-50 dark:text-text-muted-dark dark:hover:bg-white/5'
                }`}
              >
                <Icon name={item.icon} className={item.filled && currentView === item.id ? 'filled' : ''} />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* User Profile */}
        <div 
          onClick={() => onViewChange && onViewChange('account')}
          className={`flex items-center gap-4 rounded-2xl border p-4 cursor-pointer transition-colors ${
            currentView === 'account' 
             ? 'border-primary/50 bg-primary/5 dark:bg-primary/10' 
             : 'border-gray-100 bg-gray-50 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800/50 dark:hover:bg-gray-800'
          }`}
        >
          <div 
            className="h-12 w-12 overflow-hidden rounded-full border-2 border-white shadow-sm dark:border-gray-700 bg-center bg-cover" 
            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBCSat8Xcn9H5S0DwmjOiNEXAGiRtS2PzUxrDfcdhJiiXHLsrS9tYpvbxva_Rh6HnwrxfoqU_F0D1S4ZkWYgSAaBlih-W6hUFYa1ksTZszNX5Im1phayP4s2IudVDjnqie96UnxVK5ijR9KtVBAnPPnZoBH4hvb8GQON-aceDX5ksiMJhIlAXS_6kvZXQqUc6ep-AcDfj_wKR-Eql_Sey9LKaeJG90OHBnRW74QuHmLJUMAjIfN_NPV5BBqYkKm4B-VZmvpfC6xv1k")' }}
          ></div>
          <div className="flex flex-col">
            <p className="text-base font-bold text-text-main-light dark:text-white">Nguyen Van A</p>
            <p className="text-sm text-text-muted-light dark:text-text-muted-dark">Family Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;