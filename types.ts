export interface Transaction {
  id: string;
  merchant: string;
  date: string;
  amount: string;
  categoryIcon: string;
  iconColorClass: string;
}

export interface ExpenseCategory {
  name: string;
  description: string;
  amount: string;
  percentage: number;
  color: string;
  tailwindColorClass: string;
}

export interface BudgetCategory {
  id: string;
  name: string;
  subtitle?: string;
  icon: string;
  spent: number;
  remaining?: number;
  total: number;
  // Styling
  iconBgClass: string; // e.g. bg-blue-50
  iconColorClass: string; // e.g. text-primary
  barColorClass: string; // e.g. bg-primary
  amountColorClass: string; // e.g. text-primary
}
