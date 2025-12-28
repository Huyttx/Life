import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import MobileBottomNav from './components/MobileBottomNav';
import Dashboard from './components/Dashboard';
import TransactionHistory from './components/TransactionHistory';
import CategoryManagement from './components/CategoryManagement';
import AccountSettings from './components/AccountSettings';
import IncomeManagement from './components/IncomeManagement';
import BudgetPlanning from './components/BudgetPlanning';
import ReportsAnalytics from './components/ReportsAnalytics';
import ExpenseEntry from './components/ExpenseEntry';
import { TransactionProvider } from './context/TransactionContext';

type View = 'dashboard' | 'history' | 'reports' | 'account' | 'categories' | 'income' | 'budget' | 'expense-entry';

const App: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState<View>('dashboard');

  const handleViewChange = (view: string) => {
    setCurrentView(view as View);
  };

  const handleAddTransaction = () => {
    setCurrentView('expense-entry');
  };

  return (
    <TransactionProvider>
      <div className="flex h-screen w-full font-display bg-background-light dark:bg-background-dark transition-colors duration-200">
        {/* Sidebar - Desktop (Hidden on Mobile) */}
        <Sidebar currentView={currentView} onViewChange={handleViewChange} />

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col h-full overflow-hidden relative">
          
          {/* Content Container - Scrollable */}
          <div className="flex-1 overflow-y-auto no-scrollbar relative w-full h-full">
            
            {/* Main View Switcher */}
            {currentView === 'dashboard' && (
              <Dashboard 
                onAddTransaction={handleAddTransaction} 
                setMobileMenuOpen={setMobileMenuOpen}
              />
            )}

            {currentView === 'history' && (
              <TransactionHistory 
                onBack={() => setCurrentView('dashboard')}
                onAddTransaction={handleAddTransaction}
              />
            )}

            {currentView === 'income' && (
              <IncomeManagement />
            )}

            {currentView === 'budget' && (
              <BudgetPlanning />
            )}

            {currentView === 'categories' && (
              <CategoryManagement
                onBack={() => setCurrentView('account')}
              />
            )}

            {currentView === 'account' && (
              <AccountSettings 
                onNavigateToCategories={() => setCurrentView('categories')}
              />
            )}

            {currentView === 'reports' && (
              <ReportsAnalytics />
            )}

            {currentView === 'expense-entry' && (
              <ExpenseEntry />
            )}

          </div>

          {/* Bottom Nav (Mobile Only) - Fixed at bottom */}
          {currentView !== 'categories' && currentView !== 'expense-entry' && (
              <MobileBottomNav 
                activeTab={currentView}
                onTabChange={(tab) => setCurrentView(tab as View)}
                onAdd={handleAddTransaction}
              />
          )}

        </main>
      </div>
    </TransactionProvider>
  );
};

export default App;