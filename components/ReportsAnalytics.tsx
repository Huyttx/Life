import React, { useMemo, useState } from 'react';
import Icon from './Icon';
import { useTransactions } from '../context/TransactionContext';

const ReportsAnalytics: React.FC = () => {
  const { transactions, totalIncome, totalExpense, balance, formatCurrency } = useTransactions();
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');

  // 1. Calculate Monthly Stats for Chart (Last 6 months)
  const monthlyStats = useMemo(() => {
    const today = new Date();
    const last6Months = [];
    
    // Generate last 6 months placeholders
    for (let i = 5; i >= 0; i--) {
        const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
        last6Months.push({
            label: d.toLocaleString('en-US', { month: 'short' }), // e.g., Oct
            year: d.getFullYear(),
            monthIndex: d.getMonth(),
            income: 0,
            expense: 0
        });
    }

    // Aggregate data
    transactions.forEach(t => {
        // Apply Category Filter if selected
        if (selectedCategoryFilter !== 'all' && t.category !== selectedCategoryFilter) return;

        const d = new Date(t.date);
        const monthIdx = d.getMonth();
        const year = d.getFullYear();
        
        const period = last6Months.find(p => p.monthIndex === monthIdx && p.year === year);
        if (period) {
            if (t.type === 'income') period.income += t.amount;
            else period.expense += t.amount;
        }
    });
    
    // Find max value for scaling the chart bars
    const maxVal = Math.max(...last6Months.map(m => Math.max(m.income, m.expense)), 1000000); // Min 1M scale

    return { data: last6Months, maxVal };
  }, [transactions, selectedCategoryFilter]);

  // 2. Calculate Category Breakdown
  const categoryStats = useMemo(() => {
    const stats: Record<string, number> = {};
    let totalExp = 0;

    transactions.filter(t => t.type === 'expense').forEach(t => {
       const amount = t.amount;
       stats[t.category] = (stats[t.category] || 0) + amount;
       totalExp += amount;
    });

    const categories = Object.keys(stats).map(cat => ({
      id: cat,
      amount: stats[cat],
      percent: totalExp > 0 ? (stats[cat] / totalExp) * 100 : 0
    })).sort((a, b) => b.amount - a.amount);

    return { categories, totalExp };
  }, [transactions]);

  // Helpers for display
  const getCategoryName = (cat: string) => {
    const map: Record<string, string> = {
       food: 'Ăn uống',
       utilities: 'Hóa đơn',
       education: 'Giáo dục',
       health: 'Y tế',
       transport: 'Di chuyển',
       shopping: 'Mua sắm',
       entertainment: 'Giải trí',
       other: 'Khác',
       salary: 'Lương',
       bonus: 'Thưởng',
       investment: 'Đầu tư',
       gift: 'Quà tặng'
    };
    return map[cat] || cat;
  };

  const getCategoryColor = (cat: string) => {
    const map: Record<string, string> = {
        food: 'bg-orange-400',
        utilities: 'bg-blue-400',
        education: 'bg-indigo-400',
        health: 'bg-red-400',
        transport: 'bg-teal-400',
        shopping: 'bg-pink-400',
        entertainment: 'bg-purple-400',
        other: 'bg-gray-400'
    };
    return map[cat] || 'bg-gray-400';
  };

  const topCategory = categoryStats.categories.length > 0 ? categoryStats.categories[0] : null;

  // Mock Family Member Data based on Total Expense
  const familyStats = [
      { label: 'Bố', val: totalExpense * 0.35, percent: '35%', color: 'bg-secondary', initial: 'B', initialBg: 'bg-secondary/20', initialText: 'text-blue-700' },
      { label: 'Mẹ', val: totalExpense * 0.45, percent: '45%', color: 'bg-primary', initial: 'M', initialBg: 'bg-primary/20', initialText: 'text-green-700' },
      { label: 'Con', val: totalExpense * 0.20, percent: '20%', color: 'bg-orange-400', initial: 'C', initialBg: 'bg-orange-100', initialText: 'text-orange-600' },
  ];

  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark w-full relative">
      <header className="bg-white dark:bg-card-dark border-b border-gray-200 dark:border-gray-800 sticky top-0 z-20 shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-6 gap-4">
            <div className="flex flex-col gap-1">
              <h2 className="text-3xl font-bold tracking-tight text-text-main-light dark:text-white">Báo cáo &amp; Phân tích</h2>
              <p className="text-text-muted-light dark:text-text-muted-dark text-base">Xem xét sức khỏe tài chính của gia đình bạn.</p>
            </div>
            <button className="flex items-center justify-center gap-2 h-10 px-5 rounded-lg bg-primary hover:bg-primary-hover text-text-main-light text-sm font-bold transition-all shadow-sm hover:shadow-md">
              <Icon name="download" size={20} />
              <span className="hidden sm:inline">Xuất PDF</span>
            </button>
          </div>
          
          {/* Filters Row */}
          <div className="flex flex-col gap-6 pb-0">
            <div className="flex flex-wrap items-center gap-3 pb-2">
              <div className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
                <Icon name="calendar_month" className="text-gray-400" size={18} />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">6 tháng qua</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
                <Icon name="category" className="text-gray-400" size={18} />
                <select 
                    value={selectedCategoryFilter}
                    onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                    className="border-none bg-transparent p-0 text-sm font-medium text-gray-700 dark:text-gray-200 focus:ring-0 cursor-pointer outline-none min-w-[120px]"
                >
                  <option value="all">Tất cả danh mục</option>
                  <option value="food">Ăn uống</option>
                  <option value="utilities">Hóa đơn</option>
                  <option value="transport">Di chuyển</option>
                  <option value="education">Giáo dục</option>
                  <option value="shopping">Mua sắm</option>
                  <option value="health">Y tế</option>
                  <option value="entertainment">Giải trí</option>
                  <option value="other">Khác</option>
                </select>
              </div>
            </div>
            <div className="flex gap-8 border-b border-gray-200 dark:border-gray-800">
              <button className="pb-3 px-1 border-b-2 border-primary text-primary font-bold text-sm flex items-center gap-2">
                <Icon name="bar_chart" size={20} />
                Hàng tháng
              </button>
              <button className="pb-3 px-1 border-b-2 border-transparent hover:border-gray-300 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 font-medium text-sm flex items-center gap-2 transition-colors">
                <Icon name="donut_large" size={20} />
                Danh mục
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col gap-8 overflow-y-auto no-scrollbar">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col gap-2 p-6 rounded-2xl bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-800 shadow-sm relative overflow-hidden group transition-all hover:shadow-md">
            <div className="absolute right-0 top-0 w-24 h-24 bg-primary/5 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-500"></div>
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-1 z-10">
              <div className="p-1.5 rounded-full bg-primary/10 text-primary">
                <Icon name="arrow_upward" size={18} />
              </div>
              <span className="text-sm font-semibold uppercase tracking-wide">Tổng Thu nhập</span>
            </div>
            <p className="text-3xl font-bold text-text-main-light dark:text-white z-10">{formatCurrency(totalIncome)}</p>
          </div>
          <div className="flex flex-col gap-2 p-6 rounded-2xl bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-800 shadow-sm relative overflow-hidden group transition-all hover:shadow-md">
            <div className="absolute right-0 top-0 w-24 h-24 bg-alert/5 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-500"></div>
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-1 z-10">
              <div className="p-1.5 rounded-full bg-alert/10 text-alert">
                <Icon name="arrow_downward" size={18} />
              </div>
              <span className="text-sm font-semibold uppercase tracking-wide">Tổng Chi tiêu</span>
            </div>
            <p className="text-3xl font-bold text-text-main-light dark:text-white z-10">{formatCurrency(totalExpense)}</p>
          </div>
          <div className="flex flex-col gap-2 p-6 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 dark:from-secondary/20 dark:to-secondary/10 border border-slate-700 dark:border-secondary/20 shadow-lg relative overflow-hidden transition-all hover:shadow-xl">
            <div className="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10"></div>
            <div className="flex items-center gap-2 text-white/80 dark:text-secondary mb-1 z-10">
              <div className="p-1.5 rounded-full bg-white/10 dark:bg-secondary/20">
                <Icon name="savings" size={18} />
              </div>
              <span className="text-sm font-semibold uppercase tracking-wide">Số dư (Tiết kiệm)</span>
            </div>
            <p className="text-3xl font-bold text-white dark:text-secondary z-10">{formatCurrency(balance)}</p>
          </div>
        </div>

        {/* Monthly Chart */}
        <div className="flex flex-col gap-6">
          <div className="rounded-2xl bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-800 p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <div>
                <h3 className="text-lg font-bold text-text-main-light dark:text-white">Thu nhập & Chi tiêu theo tháng</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {selectedCategoryFilter === 'all' 
                        ? 'So sánh dòng tiền trong 6 tháng gần nhất' 
                        : `Lọc theo: ${getCategoryName(selectedCategoryFilter)}`}
                </p>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-primary ring-2 ring-primary/20"></span>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Thu nhập</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-secondary ring-2 ring-secondary/20"></span>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Chi tiêu</span>
                </div>
              </div>
            </div>
            <div className="relative h-72 w-full flex items-end justify-between gap-2 sm:gap-4 px-2 pt-10">
              {/* Grid Lines */}
              <div className="absolute inset-0 top-10 flex flex-col justify-between pointer-events-none">
                <div className="w-full h-px bg-gray-100 dark:bg-gray-800 border-t border-dashed border-gray-200 dark:border-gray-700"></div>
                <div className="w-full h-px bg-gray-100 dark:bg-gray-800 border-t border-dashed border-gray-200 dark:border-gray-700"></div>
                <div className="w-full h-px bg-gray-100 dark:bg-gray-800 border-t border-dashed border-gray-200 dark:border-gray-700"></div>
                <div className="w-full h-px bg-gray-100 dark:bg-gray-800 border-t border-dashed border-gray-200 dark:border-gray-700"></div>
                <div className="w-full h-px bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700"></div>
              </div>
              
              {/* Bars */}
              {monthlyStats.data.map((month, i) => {
                 const incomeHeight = monthlyStats.maxVal > 0 ? (month.income / monthlyStats.maxVal) * 100 : 0;
                 const expenseHeight = monthlyStats.maxVal > 0 ? (month.expense / monthlyStats.maxVal) * 100 : 0;
                 
                 return (
                    <div key={i} className="relative z-10 flex-1 flex flex-col justify-end items-center gap-3 group cursor-pointer">
                        <div className="w-full flex justify-center items-end gap-1.5 h-full max-w-[60px]">
                            {/* Income Bar */}
                            <div className="w-1/2 bg-primary rounded-t-md hover:bg-primary-hover transition-all duration-300 relative group/bar" style={{height: `${Math.max(2, incomeHeight * 0.85)}%`}}>
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] font-bold py-1 px-1.5 rounded-md opacity-0 group-hover/bar:opacity-100 transition-all z-20 shadow-lg pointer-events-none whitespace-nowrap">
                                    {month.income > 0 ? (month.income / 1000000).toFixed(1) + 'M' : '0'}
                                </div>
                            </div>
                            {/* Expense Bar */}
                            <div className="w-1/2 bg-secondary rounded-t-md hover:bg-secondary/80 transition-all duration-300 relative group/bar" style={{height: `${Math.max(2, expenseHeight * 0.85)}%`}}>
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] font-bold py-1 px-1.5 rounded-md opacity-0 group-hover/bar:opacity-100 transition-all z-20 shadow-lg pointer-events-none whitespace-nowrap">
                                    {month.expense > 0 ? (month.expense / 1000000).toFixed(1) + 'M' : '0'}
                                </div>
                            </div>
                        </div>
                        <span className={`text-xs font-semibold ${i === 5 ? 'text-primary dark:text-primary bg-primary/10 px-2 py-0.5 rounded-full' : 'text-gray-500 dark:text-gray-400 group-hover:text-primary transition-colors'}`}>
                            {month.label}
                        </span>
                    </div>
                 );
              })}
            </div>
          </div>
        </div>

        {/* Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-24">
            {/* Expense by Category */}
            <div className="rounded-2xl bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-800 p-8 shadow-sm flex flex-col">
                <div className="flex justify-between items-start mb-6">
                    <h3 className="text-lg font-bold text-text-main-light dark:text-white">Chi tiêu theo Danh mục</h3>
                    <button className="text-primary hover:text-primary-hover text-sm font-semibold transition-colors">Chi tiết</button>
                </div>
                {totalExpense === 0 ? (
                    <div className="flex-1 flex items-center justify-center text-gray-500 py-10">Chưa có dữ liệu chi tiêu</div>
                ) : (
                    <div className="flex-1 flex flex-col sm:flex-row items-center gap-10 justify-center">
                        <div className="relative w-56 h-56 rounded-full shrink-0 shadow-sm" style={{background: 'conic-gradient(#4ade80 0% 45%, #fb923c 45% 70%, #60a5fa 70% 85%, #e2e8f0 85% 100%)'}}>
                            {/* Note: In a real implementation with Chart.js/Recharts, this gradient would be dynamic. Here it's static for CSS viz */}
                            <div className="absolute inset-0 m-auto w-40 h-40 bg-white dark:bg-card-dark rounded-full flex items-center justify-center flex-col shadow-inner">
                                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Top 1</span>
                                <span className="text-xl font-black text-text-main-light dark:text-white mt-1">
                                    {topCategory ? getCategoryName(topCategory.id) : '--'}
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 w-full max-w-[200px]">
                            {categoryStats.categories.slice(0, 5).map((item, idx) => (
                                <div key={idx} className="flex items-center justify-between text-sm group">
                                    <div className="flex items-center gap-3">
                                        <span className={`w-3 h-3 rounded-full ${getCategoryColor(item.id)} ring-2 ring-opacity-20`}></span>
                                        <span className="text-gray-600 dark:text-gray-300 font-medium">{getCategoryName(item.id)}</span>
                                    </div>
                                    <span className="font-bold text-text-main-light dark:text-white">{item.percent.toFixed(0)}%</span>
                                </div>
                            ))}
                            {categoryStats.categories.length > 5 && (
                                <div className="text-xs text-center text-gray-400 mt-2">+ {categoryStats.categories.length - 5} danh mục khác</div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Expense by Family Member (Mocked Logic) */}
            <div className="rounded-2xl bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-800 p-8 shadow-sm flex flex-col">
                <div className="flex justify-between items-start mb-6">
                    <h3 className="text-lg font-bold text-text-main-light dark:text-white">Chi tiêu theo Thành viên</h3>
                    <button className="text-primary hover:text-primary-hover text-sm font-semibold transition-colors">Chi tiết</button>
                </div>
                <div className="flex flex-col gap-6 justify-center flex-1">
                    {totalExpense === 0 ? (
                        <div className="text-center text-gray-500 py-10">Chưa có dữ liệu</div>
                    ) : familyStats.map((member, idx) => (
                         <div key={idx} className="flex flex-col gap-2">
                            <div className="flex justify-between items-center text-sm">
                                <div className="flex items-center gap-3">
                                    <span className={`w-8 h-8 rounded-full ${member.initialBg} ${member.initialText} flex items-center justify-center text-xs font-black`}>{member.initial}</span>
                                    <span className="font-semibold text-gray-700 dark:text-gray-200">{member.label}</span>
                                </div>
                                <span className="font-bold text-text-main-light dark:text-white text-base">{formatCurrency(member.val)}</span>
                            </div>
                            <div className="w-full h-2.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div className={`h-full ${member.color} rounded-full shadow-sm`} style={{width: member.percent}}></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default ReportsAnalytics;