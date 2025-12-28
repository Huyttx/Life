import React, { useState } from 'react';
import Icon from './Icon';
import { useTransactions } from '../context/TransactionContext';

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Standardized Categories List
const categories = [
  { id: 'food', name: 'Ăn uống', icon: 'restaurant' },
  { id: 'utilities', name: 'Hóa đơn', icon: 'bolt' },
  { id: 'transport', name: 'Di chuyển', icon: 'directions_car' },
  { id: 'education', name: 'Giáo dục', icon: 'school' },
  { id: 'shopping', name: 'Mua sắm', icon: 'shopping_bag' },
  { id: 'health', name: 'Y tế', icon: 'medical_services' },
  { id: 'entertainment', name: 'Giải trí', icon: 'attractions' },
  { id: 'other', name: 'Khác', icon: 'more_horiz' },
];

const AddTransactionModal: React.FC<AddTransactionModalProps> = ({ isOpen, onClose }) => {
  const { addTransaction } = useTransactions();
  const [transactionType, setTransactionType] = useState<'expense' | 'income'>('expense');
  const [amount, setAmount] = useState<string>('0');
  const [selectedCategory, setSelectedCategory] = useState<string>('food');

  if (!isOpen) return null;

  const handleDigit = (digit: string) => {
    setAmount(prev => {
      if (prev === '0') return digit;
      if (prev.length > 10) return prev; // Limit length
      return prev + digit;
    });
  };

  const handleDoubleZero = () => {
    setAmount(prev => {
      if (prev === '0') return '0';
      if (prev.length > 10) return prev;
      return prev + '000';
    });
  };

  const handleBackspace = () => {
    setAmount(prev => {
      if (prev.length <= 1) return '0';
      return prev.slice(0, -1);
    });
  };

  const formatCurrency = (val: string) => {
    return parseInt(val).toLocaleString('vi-VN');
  };

  const handleSubmit = () => {
    const value = parseInt(amount);
    if (value > 0) {
      addTransaction({
        amount: value,
        type: transactionType,
        category: selectedCategory,
        date: new Date().toISOString().split('T')[0],
        note: categories.find(c => c.id === selectedCategory)?.name || 'Giao dịch mới',
        merchant: categories.find(c => c.id === selectedCategory)?.name
      });
      setAmount('0');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      {/* Modal Container */}
      <div className="relative w-full max-w-[400px] h-full max-h-[85vh] bg-white dark:bg-[#1a202c] shadow-2xl rounded-3xl overflow-hidden flex flex-col border border-gray-200 dark:border-gray-800">
        
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-[#1a202c] z-10 shrink-0">
          <h2 className="text-[#0d131b] dark:text-white text-lg font-bold leading-tight">Thêm Giao Dịch</h2>
          <button 
            onClick={onClose}
            className="flex items-center justify-center rounded-full size-8 bg-gray-100 dark:bg-gray-800 text-[#0d131b] dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <Icon name="close" size={20} />
          </button>
        </header>

        {/* Scrollable Main Area */}
        <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col">
          
          {/* Segmented Control */}
          <div className="px-6 py-4">
            <div className="flex h-12 w-full items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800 p-1">
              <button
                onClick={() => setTransactionType('expense')}
                className={`flex cursor-pointer h-full grow items-center justify-center rounded-lg px-2 text-sm font-semibold transition-all ${
                  transactionType === 'expense'
                    ? 'bg-white dark:bg-gray-700 shadow-sm text-primary dark:text-white'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                Chi phí
              </button>
              <button
                onClick={() => setTransactionType('income')}
                className={`flex cursor-pointer h-full grow items-center justify-center rounded-lg px-2 text-sm font-semibold transition-all ${
                  transactionType === 'income'
                    ? 'bg-white dark:bg-gray-700 shadow-sm text-green-600 dark:text-green-400'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                Thu nhập
              </button>
            </div>
          </div>

          {/* Amount Display */}
          <div className="px-6 pb-2 pt-2 text-center">
            <p className="text-gray-400 dark:text-gray-500 text-sm font-medium mb-1">Số tiền</p>
            <h1 className="text-[#0d131b] dark:text-white text-[44px] font-extrabold leading-none tracking-tight flex items-start justify-center gap-1">
              {formatCurrency(amount)}
              <span className="text-2xl text-gray-400 mt-2">₫</span>
            </h1>
          </div>

          {/* Date & Note Buttons */}
          <div className="flex items-center justify-center gap-3 px-6 py-4">
            <button className="flex h-9 items-center justify-center gap-x-2 rounded-full bg-primary/10 dark:bg-primary/20 pl-3 pr-4 active:scale-95 transition-transform">
              <Icon name="calendar_today" className="text-primary dark:text-blue-400" size={18} />
              <span className="text-primary dark:text-blue-400 text-sm font-semibold">Hôm nay</span>
            </button>
            <button className="flex h-9 items-center justify-center gap-x-2 rounded-full bg-gray-100 dark:bg-gray-800 pl-3 pr-4 active:scale-95 transition-transform">
              <Icon name="edit_note" className="text-gray-500 dark:text-gray-400" size={18} />
              <span className="text-gray-600 dark:text-gray-300 text-sm font-medium">Ghi chú</span>
            </button>
          </div>

          {/* Categories Grid */}
          <div className="px-4 pb-4">
            <p className="px-2 pb-3 text-sm font-semibold text-gray-500 dark:text-gray-400">Danh mục</p>
            <div className="grid grid-cols-4 gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`group flex flex-col items-center gap-2 p-2 rounded-xl transition-all ${
                    selectedCategory === cat.id ? 'opacity-100' : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <div
                    className={`size-14 rounded-2xl flex items-center justify-center transition-all ${
                      selectedCategory === cat.id
                        ? 'bg-primary text-white shadow-lg shadow-blue-500/30 ring-2 ring-primary ring-offset-2 ring-offset-white dark:ring-offset-[#1a202c]'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 group-hover:bg-gray-200 dark:group-hover:bg-gray-700'
                    }`}
                  >
                    <Icon name={cat.icon} size={24} />
                  </div>
                  <span
                    className={`text-xs font-medium text-center leading-tight ${
                      selectedCategory === cat.id
                        ? 'text-primary dark:text-blue-400 font-bold'
                        : 'text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    {cat.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Keypad */}
        <div className="bg-gray-50 dark:bg-[#151b23] border-t border-gray-100 dark:border-gray-800 p-4 shrink-0 rounded-t-3xl shadow-[0_-5px_15px_-5px_rgba(0,0,0,0.05)] z-20">
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <button
                key={num}
                onClick={() => handleDigit(num.toString())}
                className="h-14 rounded-xl bg-white dark:bg-[#1e2630] shadow-sm border-b-2 border-gray-200 dark:border-gray-700 active:border-b-0 active:translate-y-[2px] text-2xl font-bold text-[#0d131b] dark:text-white transition-all"
              >
                {num}
              </button>
            ))}
            <button
              onClick={handleDoubleZero}
              className="h-14 rounded-xl bg-white dark:bg-[#1e2630] shadow-sm border-b-2 border-gray-200 dark:border-gray-700 active:border-b-0 active:translate-y-[2px] text-lg font-bold text-[#0d131b] dark:text-white transition-all"
            >
              000
            </button>
            <button
              onClick={() => handleDigit('0')}
              className="h-14 rounded-xl bg-white dark:bg-[#1e2630] shadow-sm border-b-2 border-gray-200 dark:border-gray-700 active:border-b-0 active:translate-y-[2px] text-2xl font-bold text-[#0d131b] dark:text-white transition-all"
            >
              0
            </button>
            <button
              onClick={handleBackspace}
              className="h-14 rounded-xl bg-gray-200 dark:bg-gray-700 shadow-sm border-b-2 border-gray-300 dark:border-gray-600 active:border-b-0 active:translate-y-[2px] flex items-center justify-center text-[#0d131b] dark:text-white transition-all group"
            >
              <Icon name="backspace" className="group-active:scale-90 transition-transform" />
            </button>
          </div>
          <button 
            onClick={handleSubmit}
            className="w-full h-14 bg-primary hover:bg-blue-600 text-white font-bold text-lg rounded-xl shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
          >
            Thêm ngay
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTransactionModal;