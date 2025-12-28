import React, { useState } from 'react';
import Icon from './Icon';
import { useTransactions } from '../context/TransactionContext';

const IncomeManagement: React.FC = () => {
  const { transactions, addTransaction, deleteTransaction, totalIncome, formatCurrency } = useTransactions();
  
  // Form State
  const [source, setSource] = useState('');
  const [amount, setAmount] = useState('');
  const [frequency, setFrequency] = useState('Hàng tháng');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  // Filter only income transactions
  const incomeList = transactions.filter(t => t.type === 'income');

  const handleAddIncome = (e: React.FormEvent) => {
    e.preventDefault();
    if (!source || !amount) {
      alert("Vui lòng nhập nguồn thu và số tiền");
      return;
    }

    const value = parseInt(amount.replace(/[^0-9]/g, ''));
    if (isNaN(value) || value <= 0) return;

    addTransaction({
      amount: value,
      type: 'income',
      category: 'salary', // Default category for quick add
      date: date,
      merchant: source,
      note: frequency // Storing frequency in note for now
    });

    // Reset form
    setSource('');
    setAmount('');
    setFrequency('Hàng tháng');
    setDate(new Date().toISOString().split('T')[0]);
  };

  // Helper to determine icon/color based on merchant name or random logic for visual variety
  const getStyle = (merchant: string = '') => {
    const lower = merchant.toLowerCase();
    if (lower.includes('lương') || lower.includes('salary')) return { icon: 'work', bg: 'bg-blue-50 dark:bg-blue-900/20', text: 'text-blue-600 dark:text-blue-400' };
    if (lower.includes('thưởng') || lower.includes('bonus')) return { icon: 'military_tech', bg: 'bg-purple-50 dark:bg-purple-900/20', text: 'text-purple-600 dark:text-purple-400' };
    if (lower.includes('đầu tư') || lower.includes('lãi')) return { icon: 'trending_up', bg: 'bg-green-50 dark:bg-green-900/20', text: 'text-green-600 dark:text-green-400' };
    return { icon: 'attach_money', bg: 'bg-orange-50 dark:bg-orange-900/20', text: 'text-orange-600 dark:text-orange-400' };
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-background-light dark:bg-background-dark">
      <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-10 pb-24 no-scrollbar">
        <div className="max-w-[1200px] mx-auto flex flex-col gap-8">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-gray-200 dark:border-gray-800">
            <div className="flex flex-col gap-1">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text-main-light dark:text-white">
                Quản lý Thu nhập
              </h2>
              <p className="text-text-muted-light dark:text-text-muted-dark text-base font-normal">
                Theo dõi và quản lý các nguồn thu của gia đình bạn một cách hiệu quả.
              </p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center justify-center size-11 rounded-full bg-card-light dark:bg-card-dark border border-gray-200 dark:border-gray-700 text-text-muted-light hover:text-primary hover:border-primary/50 shadow-sm transition-all hover:shadow-md">
                <Icon name="notifications" />
              </button>
              <button className="flex items-center justify-center size-11 rounded-full bg-card-light dark:bg-card-dark border border-gray-200 dark:border-gray-700 text-text-muted-light hover:text-secondary hover:border-secondary/50 shadow-sm transition-all hover:shadow-md">
                <Icon name="settings" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Form */}
            <div className="xl:col-span-7 flex flex-col gap-6">
              <div className="bg-card-light dark:bg-card-dark p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 relative">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-3 text-text-main-light dark:text-white">
                  <div className="p-2 rounded-lg bg-primary/10 text-green-600 dark:text-primary">
                    <Icon name="add_circle" />
                  </div>
                  Thêm khoản thu mới
                </h3>
                <form className="flex flex-col gap-6" onSubmit={handleAddIncome}>
                  <label className="flex flex-col gap-2">
                    <span className="text-sm font-medium text-text-main-light dark:text-gray-300">Nguồn thu nhập</span>
                    <div className="relative group">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-secondary transition-colors">
                        <Icon name="description" />
                      </span>
                      <input 
                        className="w-full pl-12 pr-4 h-14 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all" 
                        placeholder="Ví dụ: Lương bố, Tiền thưởng Tết..." 
                        type="text"
                        value={source}
                        onChange={(e) => setSource(e.target.value)}
                      />
                    </div>
                  </label>
                  <div className="flex flex-col md:flex-row gap-6">
                    <label className="flex flex-col gap-2 flex-1">
                      <span className="text-sm font-medium text-text-main-light dark:text-gray-300">Số tiền (VND)</span>
                      <div className="relative group">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
                          <Icon name="attach_money" />
                        </span>
                        <input 
                          className="w-full pl-12 pr-4 h-14 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-mono font-medium text-lg" 
                          placeholder="0" 
                          type="text" 
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                        />
                      </div>
                    </label>
                    <label className="flex flex-col gap-2 md:w-1/3">
                      <span className="text-sm font-medium text-text-main-light dark:text-gray-300">Tần suất</span>
                      <div className="relative">
                        <select 
                          value={frequency}
                          onChange={(e) => setFrequency(e.target.value)}
                          className="w-full h-14 pl-4 pr-10 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary appearance-none cursor-pointer transition-all"
                        >
                          <option>Hàng tháng</option>
                          <option>Một lần</option>
                          <option>Hàng năm</option>
                        </select>
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                          <Icon name="expand_more" />
                        </span>
                      </div>
                    </label>
                  </div>
                  <label className="flex flex-col gap-2">
                    <span className="text-sm font-medium text-text-main-light dark:text-gray-300">Ngày nhận</span>
                    <div className="relative group">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-secondary transition-colors">
                        <Icon name="calendar_today" />
                      </span>
                      <input 
                        className="w-full pl-12 pr-4 h-14 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all" 
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                      />
                    </div>
                  </label>
                  <div className="pt-2">
                    <button type="submit" className="w-full h-14 bg-primary hover:bg-green-500 text-white text-lg font-semibold rounded-xl shadow-lg shadow-green-500/30 hover:shadow-green-500/40 transition-all transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] flex items-center justify-center gap-2">
                      <Icon name="add" />
                      Thêm khoản thu
                    </button>
                  </div>
                </form>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/10 p-5 rounded-2xl border border-blue-100 dark:border-blue-800/30 flex items-start gap-4 shadow-sm">
                <div className="p-2 bg-white dark:bg-blue-900/30 rounded-xl text-secondary shadow-sm">
                  <Icon name="lightbulb" />
                </div>
                <div>
                  <h4 className="font-bold text-blue-900 dark:text-blue-100 mb-1">Mẹo nhỏ</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    Ghi lại thu nhập ngay khi bạn nhận được để báo cáo tài chính luôn chính xác. Bạn có thể chỉnh sửa lại sau ở danh sách bên phải.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Summary & List */}
            <div className="xl:col-span-5 flex flex-col gap-6">
              
              {/* Total Card */}
              <div className="bg-card-light dark:bg-card-dark p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 relative overflow-hidden group">
                <div className="absolute right-0 top-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-bl-full -mr-4 -mt-4 opacity-50 blur-2xl pointer-events-none"></div>
                <div className="relative z-10 flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-text-muted-light dark:text-text-muted-dark">
                    <div className="bg-gray-100 dark:bg-gray-800 p-1.5 rounded-lg">
                      <Icon name="monitoring" className="text-lg" />
                    </div>
                    <p className="text-xs font-semibold uppercase tracking-wider">Tổng thu nhập</p>
                  </div>
                  <p className="text-4xl lg:text-5xl font-black text-text-main-light dark:text-white tracking-tight flex items-baseline gap-1">
                    {formatCurrency(totalIncome).replace('₫', '')}
                    <span className="text-2xl font-bold text-gray-400 dark:text-gray-500">đ</span>
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs font-bold border border-green-100 dark:border-green-800">
                      <Icon name="trending_up" className="text-sm mr-1" /> +12%
                    </span>
                    <span className="text-sm text-text-muted-light dark:text-text-muted-dark">so với tháng trước</span>
                  </div>
                </div>
              </div>

              {/* List */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between px-1">
                  <h3 className="text-lg font-bold text-text-main-light dark:text-white">Danh sách thu nhập</h3>
                  <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
                    <button className="px-3 py-1 text-xs font-bold rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm transition-all ring-1 ring-black/5 dark:ring-white/10">Hiệu lực</button>
                    <button className="px-3 py-1 text-xs font-medium rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-all">Kết thúc</button>
                  </div>
                </div>
                
                <div className="flex flex-col gap-3">
                  {incomeList.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">Chưa có khoản thu nào.</div>
                  ) : incomeList.map((item) => {
                    const style = getStyle(item.merchant);
                    return (
                      <div key={item.id} className="group flex items-center justify-between p-4 bg-card-light dark:bg-card-dark rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary/50 dark:hover:border-primary/50 hover:shadow-md hover:shadow-green-500/5 transition-all cursor-default">
                        <div className="flex items-center gap-4">
                          <div className={`size-12 rounded-xl flex items-center justify-center border border-opacity-50 ${style.bg} ${style.text}`}>
                            <Icon name={style.icon} />
                          </div>
                          <div className="flex flex-col">
                            <p className="font-bold text-text-main-light dark:text-white">{item.merchant}</p>
                            <p className="text-xs font-medium text-text-muted-light dark:text-text-muted-dark">{item.note} • {item.date}</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <span className="font-bold text-lg text-green-600 dark:text-primary">{formatCurrency(item.amount)}</span>
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 duration-200">
                            <button className="p-1.5 rounded-lg hover:bg-secondary/10 text-gray-400 hover:text-secondary transition-colors" title="Sửa">
                              <Icon name="edit" className="text-lg" />
                            </button>
                            <button 
                              onClick={() => deleteTransaction(item.id)}
                              className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400 hover:text-red-500 transition-colors" 
                              title="Xóa"
                            >
                              <Icon name="delete" className="text-lg" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <button className="mt-4 w-full py-3 rounded-xl border border-dashed border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-primary dark:hover:text-primary transition-all flex items-center justify-center gap-2 text-sm font-semibold">
                  Xem lịch sử thu nhập cũ hơn
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomeManagement;