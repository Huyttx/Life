import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Transaction {
  id: string;
  amount: number;
  date: string; // ISO string YYYY-MM-DD
  type: 'expense' | 'income';
  category: string;
  note: string;
  merchant?: string; // Optional, acts as title/description
}

export interface FinancialEvent {
  id: string;
  name: string;
  date: string;
  estimatedAmount: number;
  status: 'upcoming' | 'completed' | 'past';
  icon: string;
}

export interface BudgetLimits {
  food: number;
  utilities: number;
  education: number;
  other: number;
}

interface TransactionContextType {
  transactions: Transaction[];
  events: FinancialEvent[];
  budgetLimits: BudgetLimits;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  addEvent: (event: Omit<FinancialEvent, 'id'>) => void;
  updateBudgetLimits: (limits: BudgetLimits) => void;
  totalIncome: number;
  totalExpense: number;
  balance: number;
  formatCurrency: (amount: number) => string;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

// Initial mock data to make the app look populated
const initialTransactions: Transaction[] = [
  { id: '1', amount: 300000, date: '2023-10-26', type: 'expense', category: 'food', note: 'Dinner', merchant: 'Ăn tối' },
  { id: '2', amount: 2500000, date: '2023-10-24', type: 'expense', category: 'food', note: 'WinMart Weekly', merchant: 'Siêu thị' },
  { id: '3', amount: 20000000, date: '2023-10-20', type: 'income', category: 'salary', note: 'Monthly Salary', merchant: 'Lương tháng 10' },
  // Transactions matching events
  { id: '4', amount: 11850000, date: '2023-09-05', type: 'expense', category: 'education', note: 'Học phí Kỳ 1 cho con', merchant: 'Trường Vinschool' },
  { id: '5', amount: 1000000, date: '2023-10-22', type: 'expense', category: 'other', note: 'Mừng đám cưới Minh Lan (đặt cọc)', merchant: 'Đám cưới' },
  { id: '6', amount: 5500000, date: '2023-08-20', type: 'expense', category: 'other', note: 'Chi phí đám tang Bác Tư', merchant: 'Dịch vụ tang lễ' },
];

const initialEvents: FinancialEvent[] = [
  { id: '1', name: 'Đám cưới Minh & Lan', date: '2023-12-15', estimatedAmount: 50000000, status: 'upcoming', icon: 'celebration' },
  { id: '2', name: 'Học phí Kỳ 1', date: '2023-09-05', estimatedAmount: 12000000, status: 'completed', icon: 'school' },
  { id: '3', name: 'Đám tang Bác Tư', date: '2023-08-20', estimatedAmount: 5000000, status: 'past', icon: 'diversity_1' },
];

const initialBudgetLimits: BudgetLimits = {
  utilities: 1500000,
  food: 8000000,
  education: 5000000,
  other: 2500000
};

export const TransactionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [events, setEvents] = useState<FinancialEvent[]>(initialEvents);
  const [budgetLimits, setBudgetLimits] = useState<BudgetLimits>(initialBudgetLimits);

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = {
      ...transaction,
      id: Date.now().toString(),
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const addEvent = (event: Omit<FinancialEvent, 'id'>) => {
      const newEvent = {
          ...event,
          id: Date.now().toString()
      };
      setEvents(prev => [...prev, newEvent]);
  }

  const updateBudgetLimits = (limits: BudgetLimits) => {
    setBudgetLimits(limits);
  }

  // Calculations
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const balance = totalIncome - totalExpense;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <TransactionContext.Provider value={{ 
      transactions, 
      events,
      budgetLimits,
      addTransaction, 
      deleteTransaction,
      addEvent,
      updateBudgetLimits,
      totalIncome, 
      totalExpense, 
      balance,
      formatCurrency
    }}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
};