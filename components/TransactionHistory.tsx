import React, { useState } from 'react';
import Icon from './Icon';
import { useTransactions } from '../context/TransactionContext';

interface TransactionHistoryProps {
  onBack: () => void;
  onAddTransaction: () => void;
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ onBack, onAddTransaction }) => {
  const { transactions, totalIncome, totalExpense, balance, formatCurrency, deleteTransaction } = useTransactions();

  // State for filtering
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Helper for Icon Styles based on Standardized Category IDs
  const getCategoryStyles = (category: string) => {
    switch(category) {
      case 'food': 
        return { icon: 'restaurant', bg: 'bg-orange-50 dark:bg-orange-900/30', color: 'text-orange-500 dark:text-orange-400', name: 'Ăn uống' };
      case 'utilities':
        return { icon: 'bolt', bg: 'bg-purple-50 dark:bg-purple-900/30', color: 'text-purple-500 dark:text-purple-400', name: 'Hóa đơn' };
      case 'transport':
        return { icon: 'directions_car', bg: 'bg-red-50 dark:bg-red-900/30', color: 'text-alert dark:text-red-400', name: 'Di chuyển' };
      case 'education':
        return { icon: 'school', bg: 'bg-blue-50 dark:bg-blue-900/20', color: 'text-blue-600 dark:text-blue-400', name: 'Giáo dục' };
      case 'shopping':
        return { icon: 'shopping_bag', bg: 'bg-pink-50 dark:bg-pink-900/30', color: 'text-pink-500 dark:text-pink-400', name: 'Mua sắm' };
      case 'health':
        return { icon: 'medical_services', bg: 'bg-cyan-50 dark:bg-cyan-900/30', color: 'text-cyan-500 dark:text-cyan-400', name: 'Y tế' };
      case 'entertainment':
        return { icon: 'attractions', bg: 'bg-indigo-50 dark:bg-indigo-900/30', color: 'text-indigo-500 dark:text-indigo-400', name: 'Giải trí' };
      case 'salary':
      case 'income':
        return { icon: 'payments', bg: 'bg-emerald-50 dark:bg-emerald-900/30', color: 'text-emerald-500 dark:text-emerald-400', name: 'Thu nhập' };
      case 'bonus':
        return { icon: 'military_tech', bg: 'bg-yellow-50 dark:bg-yellow-900/30', color: 'text-yellow-600 dark:text-yellow-400', name: 'Thưởng' };
      case 'investment':
        return { icon: 'trending_up', bg: 'bg-green-50 dark:bg-green-900/30', color: 'text-green-600 dark:text-green-400', name: 'Đầu tư' };
      default:
        return { icon: 'category', bg: 'bg-gray-50 dark:bg-gray-800', color: 'text-gray-500', name: 'Khác' };
    }
  };

  // Filter Logic
  const filteredTransactions = transactions.filter(t => {
    // 1. Filter by Type (Thu/Chi)
    if (filterType !== 'all' && t.type !== filterType) return false;

    // 2. Filter by Category
    if (categoryFilter !== 'all' && t.category !== categoryFilter) return false;

    // 3. Filter by Search Term (Note, Merchant, Amount)
    if (searchTerm) {
        const lowerTerm = searchTerm.toLowerCase();
        const matchNote = t.note.toLowerCase().includes(lowerTerm);
        const matchMerchant = (t.merchant || '').toLowerCase().includes(lowerTerm);
        const matchAmount = t.amount.toString().includes(lowerTerm);
        
        if (!matchNote && !matchMerchant && !matchAmount) return false;
    }

    return true;
  });

  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark w-full relative">
       {/* Header */}
       <header className="h-16 flex items-center justify-between px-6 bg-card-light dark:bg-card-dark border-b border-gray-200 dark:border-gray-800 shrink-0 sticky top-0 z-30">
        <div className="lg:hidden flex items-center">
             <button onClick={onBack} className="p-2 -ml-2 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                <Icon name="arrow_back" />
            </button>
        </div>
        
        {/* Search Bar - Desktop */}
        <div className="hidden md:flex items-center max-w-md w-full ml-4 lg:ml-0">
          <div className="relative w-full">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
              <Icon name="search" size={20} />
            </span>
            <input 
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border-none text-sm text-text-main-light dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary/50 transition-shadow outline-none" 
              placeholder="Tìm kiếm nhanh..." 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center gap-4 ml-auto">
          <button className="relative p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <Icon name="notifications" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-alert rounded-full border-2 border-white dark:border-gray-900"></span>
          </button>
          <div 
            className="h-8 w-8 rounded-full bg-cover bg-center border border-gray-200 dark:border-gray-700 cursor-pointer" 
            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBCSat8Xcn9H5S0DwmjOiNEXAGiRtS2PzUxrDfcdhJiiXHLsrS9tYpvbxva_Rh6HnwrxfoqU_F0D1S4ZkWYgSAaBlih-W6hUFYa1ksTZszNX5Im1phayP4s2IudVDjnqie96UnxVK5ijR9KtVBAnPPnZoBH4hvb8GQON-aceDX5ksiMJhIlAXS_6kvZXQqUc6ep-AcDfj_wKR-Eql_Sey9LKaeJG90OHBnRW74QuHmLJUMAjIfN_NPV5BBqYkKm4B-VZmvpfC6xv1k")' }}
          >
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 no-scrollbar">
        <div className="max-w-6xl mx-auto flex flex-col gap-6">
          
          {/* Title Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="flex flex-col gap-1">
              <h2 className="text-3xl font-extrabold tracking-tight text-text-main-light dark:text-white">Lịch sử giao dịch</h2>
              <p className="text-text-muted-light dark:text-text-muted-dark font-medium">Xem lại toàn bộ thu chi của gia đình bạn</p>
            </div>
            <button 
              onClick={onAddTransaction}
              className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-green-500/30 transition-all transform active:scale-95"
            >
              <Icon name="add" size={22} />
              <span>Thêm giao dịch</span>
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Income */}
            <div className="flex flex-col gap-3 p-6 rounded-2xl bg-card-light dark:bg-card-dark border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
              <div className="absolute right-[-15px] top-[-15px] opacity-10 text-emerald-500 group-hover:scale-110 transition-transform duration-300">
                <Icon name="trending_up" size={140} />
              </div>
              <p className="text-text-muted-light dark:text-text-muted-dark text-sm font-semibold uppercase tracking-wider z-10">Tổng thu nhập</p>
              <div className="flex items-baseline gap-3 z-10">
                <h3 className="text-3xl lg:text-4xl font-extrabold text-text-main-light dark:text-white">+{formatCurrency(totalIncome)}</h3>
              </div>
            </div>
            
            {/* Expense */}
            <div className="flex flex-col gap-3 p-6 rounded-2xl bg-card-light dark:bg-card-dark border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
              <div className="absolute right-[-15px] top-[-15px] opacity-10 text-alert group-hover:scale-110 transition-transform duration-300">
                <Icon name="trending_down" size={140} />
              </div>
              <p className="text-text-muted-light dark:text-text-muted-dark text-sm font-semibold uppercase tracking-wider z-10">Tổng chi tiêu</p>
              <div className="flex items-baseline gap-3 z-10">
                <h3 className="text-3xl lg:text-4xl font-extrabold text-alert">-{formatCurrency(totalExpense)}</h3>
              </div>
            </div>

            {/* Balance */}
            <div className="flex flex-col gap-3 p-6 rounded-2xl bg-card-light dark:bg-card-dark border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
              <div className="absolute right-[-15px] top-[-15px] opacity-10 text-primary group-hover:scale-110 transition-transform duration-300">
                 <Icon name="account_balance_wallet" size={140} />
              </div>
              <p className="text-text-muted-light dark:text-text-muted-dark text-sm font-semibold uppercase tracking-wider z-10">Số dư hiện tại</p>
              <div className="flex items-baseline gap-3 z-10">
                <h3 className="text-3xl lg:text-4xl font-extrabold text-primary dark:text-primary">{formatCurrency(balance)}</h3>
              </div>
            </div>
          </div>

          {/* Filters Bar */}
          <div className="flex flex-col md:flex-row gap-4 bg-card-light dark:bg-card-dark p-4 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm items-center">
            <div className="relative flex-1 w-full">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Icon name="search" size={20} />
              </span>
              <input 
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-background-light dark:bg-black/20 text-sm font-medium focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all outline-none dark:text-white" 
                placeholder="Tìm theo ghi chú, số tiền..." 
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="relative min-w-[160px] w-full md:w-auto">
              <select className="w-full pl-9 pr-8 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-background-light dark:bg-black/20 text-sm font-medium appearance-none focus:ring-2 focus:ring-primary/50 cursor-pointer transition-all outline-none dark:text-white">
                <option>Tháng này</option>
                <option>Tháng trước</option>
                <option>Tuần này</option>
                <option>Tùy chọn...</option>
              </select>
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                <Icon name="calendar_today" size={18} />
              </span>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                 <Icon name="expand_more" size={18} />
              </span>
            </div>

            <div className="relative min-w-[160px] w-full md:w-auto">
              <select 
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-background-light dark:bg-black/20 text-sm font-medium appearance-none focus:ring-2 focus:ring-primary/50 cursor-pointer transition-all outline-none dark:text-white"
              >
                <option value="all">Tất cả danh mục</option>
                <option value="food">Ăn uống</option>
                <option value="transport">Di chuyển</option>
                <option value="utilities">Hóa đơn</option>
                <option value="education">Giáo dục</option>
                <option value="shopping">Mua sắm</option>
                <option value="health">Y tế</option>
                <option value="entertainment">Giải trí</option>
                <option value="other">Khác</option>
                <option value="salary">Lương (Thu)</option>
              </select>
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                <Icon name="category" size={18} />
              </span>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                <Icon name="expand_more" size={18} />
              </span>
            </div>

            <div className="flex bg-background-light dark:bg-black/20 p-1.5 rounded-xl border border-gray-200 dark:border-gray-700 w-full md:w-auto">
              <button 
                onClick={() => setFilterType('all')}
                className={`flex-1 md:flex-none px-4 py-1.5 rounded-lg text-xs font-bold transition-colors ${filterType === 'all' ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}
              >
                Tất cả
              </button>
              <button 
                onClick={() => setFilterType('income')}
                className={`flex-1 md:flex-none px-4 py-1.5 rounded-lg text-xs font-bold transition-colors ${filterType === 'income' ? 'bg-white dark:bg-gray-700 shadow-sm text-green-600 dark:text-green-400' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}
              >
                Thu
              </button>
              <button 
                onClick={() => setFilterType('expense')}
                className={`flex-1 md:flex-none px-4 py-1.5 rounded-lg text-xs font-bold transition-colors ${filterType === 'expense' ? 'bg-white dark:bg-gray-700 shadow-sm text-alert dark:text-red-400' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}
              >
                Chi
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="bg-card-light dark:bg-card-dark rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full whitespace-nowrap text-left">
                <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-700">
                  <tr>
                    <th className="px-6 py-5 text-xs font-bold text-text-muted-light dark:text-text-muted-dark uppercase tracking-wider">Ngày</th>
                    <th className="px-6 py-5 text-xs font-bold text-text-muted-light dark:text-text-muted-dark uppercase tracking-wider">Danh mục</th>
                    <th className="px-6 py-5 text-xs font-bold text-text-muted-light dark:text-text-muted-dark uppercase tracking-wider">Ghi chú</th>
                    <th className="px-6 py-5 text-xs font-bold text-text-muted-light dark:text-text-muted-dark uppercase tracking-wider text-right">Số tiền</th>
                    <th className="px-6 py-5 text-xs font-bold text-text-muted-light dark:text-text-muted-dark uppercase tracking-wider text-center">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                  {filteredTransactions.length === 0 ? (
                    <tr>
                       <td colSpan={5} className="text-center py-10 text-gray-500">Không tìm thấy giao dịch nào</td>
                    </tr>
                  ) : filteredTransactions.map(tx => {
                    const style = getCategoryStyles(tx.category);
                    return (
                    <tr key={tx.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
                      <td className="px-6 py-5">
                        <div className="flex flex-col">
                          <span className="text-base font-bold text-text-main-light dark:text-white">{tx.date.split('-')[2]} Th{tx.date.split('-')[1]}</span>
                          <span className="text-xs font-medium text-text-muted-light dark:text-text-muted-dark">{tx.date.split('-')[0]}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className={`flex items-center justify-center w-11 h-11 rounded-full ${style.bg} ${style.color}`}>
                            <Icon name={style.icon} size={22} />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-text-main-light dark:text-white">{style.name}</p>
                            <p className="text-xs font-medium text-text-muted-light dark:text-text-muted-dark">{tx.category}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <p className="text-sm font-medium text-text-main-light dark:text-gray-300">{tx.note}</p>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <span className={`text-base font-bold ${tx.type === 'income' ? 'text-primary dark:text-primary' : 'text-text-main-light dark:text-white'}`}>
                          {tx.type === 'expense' ? '- ' : '+ '} 
                          {formatCurrency(tx.amount)}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-center">
                        <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
                            <Icon name="edit" size={20} />
                          </button>
                          <button 
                            onClick={() => deleteTransaction(tx.id)}
                            className="p-2 text-gray-400 hover:text-alert hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                          >
                             <Icon name="delete" size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 dark:border-gray-800">
              <div className="text-sm font-medium text-text-muted-light dark:text-text-muted-dark">
                  Hiển thị <span className="text-text-main-light dark:text-white">{filteredTransactions.length > 0 ? 1 : 0}</span> đến <span className="text-text-main-light dark:text-white">{Math.min(5, filteredTransactions.length)}</span> trong tổng số <span className="text-text-main-light dark:text-white">{filteredTransactions.length}</span> giao dịch
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-text-muted-light dark:text-text-muted-dark hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 text-sm font-medium transition-colors">Trước</button>
                <button className="px-3 py-1.5 rounded-lg bg-primary text-white font-bold text-sm shadow-sm shadow-primary/30">1</button>
                <button className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-text-muted-light dark:text-text-muted-dark hover:bg-gray-50 dark:hover:bg-gray-800 text-sm font-medium transition-colors">2</button>
                <span className="px-2 py-1.5 text-gray-400">...</span>
                <button className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-text-muted-light dark:text-text-muted-dark hover:bg-gray-50 dark:hover:bg-gray-800 text-sm font-medium transition-colors">Sau</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;