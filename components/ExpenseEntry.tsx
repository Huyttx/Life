import React, { useState } from 'react';
import Icon from './Icon';
import { useTransactions } from '../context/TransactionContext';

interface Category {
  id: string;
  name: string;
  icon: string;
}

// Standardized Categories List
const expenseCategories: Category[] = [
  { id: 'food', name: 'Ăn uống', icon: 'restaurant' },
  { id: 'utilities', name: 'Hóa đơn', icon: 'bolt' },
  { id: 'transport', name: 'Di chuyển', icon: 'directions_car' },
  { id: 'education', name: 'Giáo dục', icon: 'school' },
  { id: 'shopping', name: 'Mua sắm', icon: 'shopping_bag' },
  { id: 'health', name: 'Y tế', icon: 'medical_services' },
  { id: 'entertainment', name: 'Giải trí', icon: 'attractions' },
  { id: 'other', name: 'Khác', icon: 'more_horiz' },
];

const incomeCategories: Category[] = [
  { id: 'salary', name: 'Lương', icon: 'payments' },
  { id: 'bonus', name: 'Thưởng', icon: 'military_tech' },
  { id: 'investment', name: 'Đầu tư', icon: 'trending_up' },
  { id: 'gift', name: 'Quà tặng', icon: 'card_giftcard' },
];

const ExpenseEntry: React.FC = () => {
  const { addTransaction } = useTransactions();
  const [type, setType] = useState<'expense' | 'income'>('expense');
  const [amount, setAmount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [note, setNote] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const categories = type === 'expense' ? expenseCategories : incomeCategories;
  const buttonBg = type === 'expense' ? 'bg-expense hover:bg-red-600 shadow-red-500/25' : 'bg-primary hover:bg-green-600 shadow-green-500/25';
  const focusRing = type === 'expense' ? 'focus:border-expense focus:ring-expense' : 'focus:border-primary focus:ring-primary';

  const handleSave = () => {
    // Remove commas from amount input
    const cleanAmount = parseInt(amount.replace(/,/g, ''));
    
    if (cleanAmount > 0 && selectedCategory) {
       addTransaction({
           amount: cleanAmount,
           type: type,
           category: selectedCategory,
           date: date,
           note: note || (type === 'expense' ? 'Giao dịch chi tiêu' : 'Khoản thu nhập'),
           merchant: categories.find(c => c.id === selectedCategory)?.name
       });
       alert('Đã lưu giao dịch thành công!');
       setAmount('');
       setNote('');
    } else {
        alert('Vui lòng nhập số tiền và chọn danh mục');
    }
  };

  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark w-full relative">
        <div className="flex-1 overflow-y-auto no-scrollbar pb-28">
            <div className="flex flex-col items-center py-8 px-4 w-full max-w-3xl mx-auto">
                <div className="w-full bg-card-light dark:bg-card-dark rounded-3xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
                    <div className="p-6 md:p-10 border-b border-gray-200 dark:border-gray-800">
                        <div className="flex justify-between items-center mb-8">
                            <h1 className="text-2xl md:text-3xl font-bold text-text-main-light dark:text-white">
                                {type === 'expense' ? 'Thêm Chi tiêu' : 'Thêm Thu nhập'}
                            </h1>
                            <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-xl inline-flex relative">
                                <button 
                                    onClick={() => setType('income')}
                                    className={`relative z-10 px-6 py-2.5 rounded-lg text-sm font-medium transition-colors ${type === 'income' ? 'bg-white dark:bg-gray-700 shadow-sm text-primary dark:text-green-400' : 'text-text-muted-light dark:text-gray-400 hover:text-primary dark:hover:text-green-400'}`}
                                >
                                    Thu nhập
                                </button>
                                <button 
                                    onClick={() => setType('expense')}
                                    className={`relative z-10 px-6 py-2.5 rounded-lg text-sm font-bold transition-colors ${type === 'expense' ? 'bg-white dark:bg-gray-700 shadow-sm text-expense dark:text-red-400' : 'text-text-muted-light dark:text-gray-400 hover:text-expense dark:hover:text-red-400'}`}
                                >
                                    Chi tiêu
                                </button>
                            </div>
                        </div>
                        <div className="relative group">
                            <label className="block text-sm font-medium text-text-muted-light dark:text-gray-400 uppercase tracking-wide mb-3">Số tiền</label>
                            <div className="flex items-baseline">
                                <input 
                                    autoFocus 
                                    className={`w-full text-5xl md:text-6xl font-bold bg-transparent border-0 border-b-2 border-gray-200 dark:border-gray-700 px-0 py-2 placeholder-gray-300 dark:placeholder-gray-700 text-text-main-light dark:text-white transition-all group-hover:border-gray-300 dark:group-hover:border-gray-600 tracking-tight focus:ring-0 ${type === 'expense' ? 'focus:border-expense' : 'focus:border-primary'}`}
                                    placeholder="0" 
                                    type="text" 
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                                <span className="text-3xl text-gray-400 dark:text-gray-600 font-light ml-2">₫</span>
                            </div>
                        </div>
                    </div>
                    <div className="p-6 md:p-10 space-y-8">
                        <div>
                            <label className="block text-sm font-medium text-text-muted-light dark:text-gray-400 mb-4 uppercase tracking-wide">Danh mục</label>
                            <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 gap-4 md:gap-6">
                                {categories.map((cat) => (
                                    <button 
                                        key={cat.id}
                                        onClick={() => setSelectedCategory(cat.id)}
                                        className="flex flex-col items-center gap-3 group"
                                    >
                                        <div className={`size-16 md:size-20 rounded-2xl flex items-center justify-center transition-all ${
                                            selectedCategory === cat.id 
                                            ? `${type === 'expense' ? 'bg-expense shadow-expense/25' : 'bg-primary shadow-primary/25'} text-white shadow-lg transform scale-105` 
                                            : `bg-gray-50 dark:bg-gray-800 text-secondary dark:text-blue-400 border border-transparent hover:border-secondary/30 hover:bg-white dark:hover:bg-gray-700`
                                        }`}>
                                            <Icon name={cat.icon} className="text-3xl" />
                                        </div>
                                        <span className={`text-sm font-medium text-center ${selectedCategory === cat.id ? 'text-text-main-light dark:text-white font-semibold' : 'text-text-muted-light dark:text-gray-400'}`}>
                                            {cat.name}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-text-muted-light dark:text-gray-400 mb-2 uppercase tracking-wide">Ngày</label>
                                <div className="relative">
                                    <input 
                                        className={`w-full h-14 pl-12 pr-4 rounded-xl bg-background-light dark:bg-gray-800 border-transparent text-text-main-light dark:text-white font-medium shadow-sm transition-shadow ${focusRing}`} 
                                        type="date" 
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                    />
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary">
                                        <Icon name="calendar_month" />
                                    </span>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-text-muted-light dark:text-gray-400 mb-2 uppercase tracking-wide">Người chi</label>
                                <div className="relative">
                                    <select className={`w-full h-14 pl-12 pr-10 rounded-xl bg-background-light dark:bg-gray-800 border-transparent text-text-main-light dark:text-white font-medium shadow-sm appearance-none transition-shadow cursor-pointer ${focusRing}`}>
                                        <option>Bố</option>
                                        <option>Mẹ</option>
                                    </select>
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary">
                                        <Icon name="person" />
                                    </span>
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted-light pointer-events-none">
                                        <Icon name="expand_more" />
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-text-muted-light dark:text-gray-400 mb-2 uppercase tracking-wide">Ghi chú</label>
                            <div className="relative">
                                <input 
                                    className={`w-full h-14 pl-12 pr-4 rounded-xl bg-background-light dark:bg-gray-800 border-transparent text-text-main-light dark:text-white placeholder-gray-400 text-base shadow-sm transition-shadow ${focusRing}`} 
                                    placeholder="Ví dụ: Ăn tối tại Phở Hòa" 
                                    type="text"
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                />
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary">
                                    <Icon name="edit_note" />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        {/* Sticky Footer */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/80 dark:bg-card-dark/90 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 p-4 z-40 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
            <div className="max-w-3xl mx-auto flex justify-between items-center gap-4">
                <div className="hidden sm:block">
                    <span className="text-sm text-text-muted-light dark:text-gray-400 block mb-1">Tổng {type === 'expense' ? 'Chi' : 'Thu'} hôm nay</span>
                    <span className="text-2xl font-bold text-text-main-light dark:text-white">
                        {parseInt(amount.replace(/,/g, '')) ? parseInt(amount.replace(/,/g, '')).toLocaleString() : 0} ₫
                    </span>
                </div>
                <button 
                    onClick={handleSave}
                    className={`flex-1 sm:flex-none sm:w-auto min-w-[200px] h-14 text-white font-bold text-lg rounded-xl shadow-lg transition-all transform active:scale-95 flex items-center justify-center gap-2 ${buttonBg}`}
                >
                    <Icon name="save" />
                    Lưu Giao Dịch
                </button>
            </div>
        </div>
    </div>
  );
};

export default ExpenseEntry;