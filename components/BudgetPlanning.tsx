import React, { useMemo, useState } from 'react';
import Icon from './Icon';
import { useTransactions, FinancialEvent, BudgetLimits } from '../context/TransactionContext';

const BudgetPlanning: React.FC = () => {
  const { transactions, events, formatCurrency, budgetLimits, updateBudgetLimits } = useTransactions();
  
  // State for Edit Modal
  const [isEditing, setIsEditing] = useState(false);
  const [tempLimits, setTempLimits] = useState<BudgetLimits>(budgetLimits);

  // Sync temp state when opening modal
  const handleOpenEdit = () => {
    setTempLimits(budgetLimits);
    setIsEditing(true);
  };

  const handleSaveLimits = () => {
    updateBudgetLimits(tempLimits);
    setIsEditing(false);
  };

  const handleLimitChange = (key: keyof BudgetLimits, value: string) => {
    const numValue = parseInt(value.replace(/[^0-9]/g, '')) || 0;
    setTempLimits(prev => ({
      ...prev,
      [key]: numValue
    }));
  };

  // Calculate actual spending based on standardized category IDs
  const spending = useMemo(() => {
    const current = {
      utilities: 0,
      food: 0,
      education: 0,
      other: 0
    };

    transactions.forEach(t => {
      if (t.type === 'expense') {
        const cat = t.category;
        
        // Map transaction categories to budget buckets
        if (cat === 'utilities') {
          current.utilities += t.amount;
        } else if (cat === 'food') {
          current.food += t.amount;
        } else if (cat === 'education') {
          current.education += t.amount;
        } else {
          // Transport, Shopping, Health, Entertainment, Other go here
          current.other += t.amount;
        }
      }
    });
    return current;
  }, [transactions]);

  const totalBudget = (Object.values(budgetLimits) as number[]).reduce((a, b) => a + b, 0);

  // Helper to calculate spending for a specific event
  const getEventSpending = (eventName: string) => {
    const lowerName = eventName.toLowerCase();
    
    return transactions.filter(t => {
        if (t.type !== 'expense') return false;
        const note = t.note.toLowerCase();
        const merchant = (t.merchant || '').toLowerCase();
        
        // Simple heuristic matching for demo purposes
        if (lowerName.includes('đám cưới') && (note.includes('đám cưới') || merchant.includes('đám cưới'))) return true;
        if (lowerName.includes('học phí') && (note.includes('học phí') || merchant.includes('học phí'))) return true;
        if (lowerName.includes('đám tang') && (note.includes('đám tang') || merchant.includes('tang lễ'))) return true;
        
        return note.includes(lowerName) || merchant.includes(lowerName);
    }).reduce((sum, t) => sum + t.amount, 0);
  };

  // Helper to render budget item
  const renderBudgetItem = (
    label: string, 
    subLabel: string, 
    spent: number, 
    limit: number, 
    icon: string, 
    iconColorClass: string, 
    bgClass: string
  ) => {
    const percent = limit > 0 ? Math.min(100, Math.round((spent / limit) * 100)) : (spent > 0 ? 100 : 0);
    const isOver = spent > limit;
    
    // Dynamic styling based on percentage
    let progressBarColor = 'bg-primary';
    let percentTextColor = 'text-primary';
    
    if (percent >= 100) {
      progressBarColor = 'bg-alert';
      percentTextColor = 'text-alert';
    } else if (percent >= 80) {
      progressBarColor = 'bg-orange-400';
      percentTextColor = 'text-orange-500';
    } else if (percent < 50) {
        progressBarColor = 'bg-green-500';
        percentTextColor = 'text-green-600';
    }

    const remaining = limit - spent;

    return (
      <div className="bg-white dark:bg-card-dark p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-4">
            <div className={`size-12 ${bgClass} rounded-xl flex items-center justify-center ${iconColorClass}`}>
              <Icon name={icon} size={24} />
            </div>
            <div>
              <h3 className="font-bold text-lg text-text-main-light dark:text-white">{label}</h3>
              <span className="text-sm text-text-muted-light">{subLabel}</span>
            </div>
          </div>
          <div className="text-right">
            <p className="font-bold text-2xl text-text-main-light dark:text-white">
              {formatCurrency(spent).replace('₫', '')} <span className="text-sm font-normal text-gray-400">đ</span>
            </p>
            <p className="text-sm font-medium text-text-muted-light">/ {formatCurrency(limit)}</p>
          </div>
        </div>
        <div className="relative w-full h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
          <div 
            className={`absolute top-0 left-0 h-full rounded-full transition-all duration-500 ${progressBarColor}`} 
            style={{ width: `${percent}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-3 text-sm">
          <span className={`${percentTextColor} font-semibold flex items-center gap-1`}>
            {isOver && <Icon name="warning" size={16} />}
            {percent}% đã dùng
          </span>
          <span className="text-text-muted-light">
            {remaining >= 0 ? `Còn lại: ${formatCurrency(remaining)}` : `Vượt: ${formatCurrency(Math.abs(remaining))}`}
          </span>
        </div>
      </div>
    );
  };

  const getEventStatusStyle = (status: string) => {
      switch(status) {
          case 'upcoming': return {
              bg: 'bg-purple-100 dark:bg-purple-900/30', 
              text: 'text-purple-600 dark:text-purple-300', 
              label: 'Sắp tới',
              headerGradient: 'from-purple-50 to-white dark:from-purple-900/10 dark:to-card-dark',
              iconColor: 'text-purple-500'
          };
          case 'completed': return {
              bg: 'bg-green-100 dark:bg-green-900/30', 
              text: 'text-green-600 dark:text-green-300', 
              label: 'Hoàn thành',
              headerGradient: 'from-blue-50 to-white dark:from-blue-900/10 dark:to-card-dark',
              iconColor: 'text-secondary'
          };
          default: return {
              bg: 'bg-gray-200 dark:bg-gray-700', 
              text: 'text-gray-600 dark:text-gray-300', 
              label: 'Đã qua',
              headerGradient: 'from-gray-50 to-white dark:from-gray-800 dark:to-card-dark',
              iconColor: 'text-gray-500'
          };
      }
  }

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-background-light dark:bg-background-dark relative">
      <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-10 pb-24 no-scrollbar">
        <div className="max-w-[1280px] w-full mx-auto flex flex-col gap-10">
          
          {/* Header Section */}
          <div className="flex flex-wrap justify-between items-end gap-4">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-secondary font-medium bg-blue-50 dark:bg-blue-900/20 w-fit px-3 py-1 rounded-full">
                <Icon name="calendar_month" size={18} />
                <span className="text-sm uppercase tracking-wide">Tháng 10, 2023</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight text-text-main-light dark:text-white">
                Ngân sách &amp; Sự kiện
              </h1>
              <p className="text-text-muted-light dark:text-text-muted-dark text-lg">
                Theo dõi dòng tiền và lên kế hoạch cho tương lai
              </p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center justify-center h-12 px-6 bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-bold shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-text-main-light dark:text-white">
                <Icon name="file_download" size={20} className="mr-2" />
                Xuất báo cáo
              </button>
              <button 
                onClick={handleOpenEdit}
                className="flex items-center justify-center h-12 px-6 bg-primary text-white rounded-xl text-sm font-bold shadow-md shadow-green-200 dark:shadow-none hover:bg-primary-hover transition-colors"
              >
                <Icon name="edit" size={20} className="mr-2" />
                Điều chỉnh hạn mức
              </button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            
            {/* Left Column: Monthly Budget */}
            <section className="flex-1 flex flex-col gap-6 w-full">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold tracking-tight flex items-center gap-3 text-text-main-light dark:text-white">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg text-primary">
                    <Icon name="pie_chart" />
                  </div>
                  Ngân sách Hàng tháng
                </h2>
                <div className="text-right">
                  <span className="block text-xs font-medium text-text-muted-light uppercase">Tổng ngân sách</span>
                  <span className="text-xl font-bold text-text-main-light dark:text-white">{formatCurrency(totalBudget)}</span>
                </div>
              </div>

              <div className="flex flex-col gap-5">
                {renderBudgetItem(
                  "Điện & Nước", 
                  "Hóa đơn sinh hoạt", 
                  spending.utilities, 
                  budgetLimits.utilities, 
                  "bolt", 
                  "text-orange-500", 
                  "bg-orange-50 dark:bg-orange-900/20"
                )}

                {renderBudgetItem(
                  "Ăn uống", 
                  "Thực phẩm & Chợ", 
                  spending.food, 
                  budgetLimits.food, 
                  "restaurant", 
                  "text-primary", 
                  "bg-green-50 dark:bg-green-900/20"
                )}

                {renderBudgetItem(
                  "Giáo dục", 
                  "Học phí & Sách vở", 
                  spending.education, 
                  budgetLimits.education, 
                  "school", 
                  "text-secondary", 
                  "bg-blue-50 dark:bg-blue-900/20"
                )}

                {renderBudgetItem(
                  "Khác", 
                  "Chi tiêu linh tinh", 
                  spending.other, 
                  budgetLimits.other, 
                  "more_horiz", 
                  "text-gray-500", 
                  "bg-gray-50 dark:bg-gray-800"
                )}
              </div>
            </section>

            {/* Right Column: Financial Events */}
            <section className="lg:w-[480px] flex flex-col gap-6 w-full">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold tracking-tight flex items-center gap-3 text-text-main-light dark:text-white">
                  <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-purple-500">
                    <Icon name="event_note" />
                  </div>
                  Sự kiện Tài chính
                </h2>
                <button className="text-sm font-semibold text-secondary hover:text-blue-400 hover:underline">Xem tất cả</button>
              </div>

              <div className="flex flex-col gap-5">
                {events.map(event => {
                    const actual = getEventSpending(event.name);
                    const styles = getEventStatusStyle(event.status);
                    const diff = actual - event.estimatedAmount;
                    const isOver = diff > 0;
                    const saved = diff < 0 && event.status === 'completed';

                    return (
                        <div key={event.id} className="bg-white dark:bg-card-dark rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-md transition-shadow">
                            <div className={`p-5 bg-gradient-to-r ${styles.headerGradient} border-b border-gray-100 dark:border-gray-800`}>
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-4">
                                        <div className={`size-12 rounded-xl bg-white dark:bg-card-dark flex items-center justify-center ${styles.iconColor} shadow-sm border border-gray-100 dark:border-gray-700`}>
                                            <Icon name={event.icon} size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg text-text-main-light dark:text-white">{event.name}</h3>
                                            <div className="flex items-center gap-1.5 text-xs font-medium text-text-muted-light mt-1">
                                                <Icon name="calendar_today" size={16} />
                                                {event.date}
                                            </div>
                                        </div>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full ${styles.bg} ${styles.text} text-xs font-bold uppercase tracking-wide`}>{styles.label}</span>
                                </div>
                            </div>
                            <div className="p-6 grid grid-cols-2 gap-6">
                                <div>
                                    <p className="text-sm font-medium text-text-muted-light mb-1">Dự trù</p>
                                    <p className="text-2xl font-bold text-text-main-light dark:text-white tracking-tight">
                                        {formatCurrency(event.estimatedAmount).replace('₫', '')}<span className="text-base align-top text-gray-400">đ</span>
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-text-muted-light mb-1">Thực tế</p>
                                    <p className={`text-2xl font-bold ${actual > 0 ? (isOver ? 'text-alert' : 'text-secondary') : 'text-gray-400'} tracking-tight`}>
                                        {actual > 0 ? formatCurrency(actual).replace('₫', '') : '--'}
                                        {actual > 0 && <span className="text-base align-top opacity-70">đ</span>}
                                    </p>
                                </div>
                            </div>
                            <div className="px-6 pb-6">
                                {event.status === 'upcoming' ? (
                                    <button className="w-full py-2.5 rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-700 text-sm font-bold text-text-muted-light hover:text-primary hover:border-primary hover:bg-green-50 dark:hover:bg-green-900/10 transition-all flex items-center justify-center gap-2">
                                        <Icon name="edit" size={18} />
                                        Cập nhật chi phí
                                    </button>
                                ) : (
                                    <>
                                        {saved && (
                                            <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 font-semibold bg-green-50 dark:bg-green-900/20 py-2.5 px-4 rounded-lg justify-center">
                                                <Icon name="savings" size={20} />
                                                Tiết kiệm được {formatCurrency(Math.abs(diff))}
                                            </div>
                                        )}
                                        {isOver && (
                                            <div className="flex items-center gap-2 text-sm text-alert font-semibold bg-orange-50 dark:bg-orange-900/20 py-2.5 px-4 rounded-lg justify-center">
                                                <Icon name="trending_up" size={20} />
                                                Vượt {formatCurrency(diff)}
                                            </div>
                                        )}
                                        {diff === 0 && actual > 0 && (
                                             <div className="flex items-center gap-2 text-sm text-gray-500 font-semibold bg-gray-50 dark:bg-gray-800 py-2.5 px-4 rounded-lg justify-center">
                                                <Icon name="check_circle" size={20} />
                                                Đúng kế hoạch
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    );
                })}
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Edit Budget Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white dark:bg-card-dark w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-slideUp">
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-900/20">
              <div>
                <h3 className="text-xl font-bold text-text-main-light dark:text-white">Điều chỉnh Hạn mức</h3>
                <p className="text-sm text-text-muted-light dark:text-text-muted-dark">Cập nhật ngân sách chi tiêu hàng tháng</p>
              </div>
              <button onClick={() => setIsEditing(false)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-500 dark:text-gray-400">
                <Icon name="close" size={20} />
              </button>
            </div>
            
            <div className="p-6 flex flex-col gap-5">
              
              {/* Food */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-text-muted-light dark:text-gray-400 uppercase tracking-wide flex items-center gap-2">
                    <Icon name="restaurant" size={16} /> Ăn uống
                </label>
                <div className="relative">
                    <input 
                        type="text"
                        value={tempLimits.food.toLocaleString('vi-VN')}
                        onChange={(e) => handleLimitChange('food', e.target.value)}
                        className="w-full text-lg font-bold bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:text-white font-mono"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">₫</span>
                </div>
              </div>

               {/* Utilities */}
               <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-text-muted-light dark:text-gray-400 uppercase tracking-wide flex items-center gap-2">
                    <Icon name="bolt" size={16} /> Điện & Nước
                </label>
                <div className="relative">
                    <input 
                        type="text"
                        value={tempLimits.utilities.toLocaleString('vi-VN')}
                        onChange={(e) => handleLimitChange('utilities', e.target.value)}
                        className="w-full text-lg font-bold bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:text-white font-mono"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">₫</span>
                </div>
              </div>

               {/* Education */}
               <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-text-muted-light dark:text-gray-400 uppercase tracking-wide flex items-center gap-2">
                    <Icon name="school" size={16} /> Giáo dục
                </label>
                <div className="relative">
                    <input 
                        type="text"
                        value={tempLimits.education.toLocaleString('vi-VN')}
                        onChange={(e) => handleLimitChange('education', e.target.value)}
                        className="w-full text-lg font-bold bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:text-white font-mono"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">₫</span>
                </div>
              </div>

               {/* Other */}
               <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-text-muted-light dark:text-gray-400 uppercase tracking-wide flex items-center gap-2">
                    <Icon name="more_horiz" size={16} /> Khác
                </label>
                <div className="relative">
                    <input 
                        type="text"
                        value={tempLimits.other.toLocaleString('vi-VN')}
                        onChange={(e) => handleLimitChange('other', e.target.value)}
                        className="w-full text-lg font-bold bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:text-white font-mono"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">₫</span>
                </div>
              </div>

            </div>

            <div className="p-6 border-t border-gray-100 dark:border-gray-800 flex gap-4 bg-gray-50/50 dark:bg-gray-900/20">
                <button 
                    onClick={() => setIsEditing(false)}
                    className="flex-1 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                    Hủy bỏ
                </button>
                <button 
                    onClick={handleSaveLimits}
                    className="flex-[2] py-3 rounded-xl font-bold text-white bg-primary hover:bg-primary-hover shadow-lg shadow-green-500/20 transition-all active:scale-[0.98]"
                >
                    Lưu thay đổi
                </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BudgetPlanning;