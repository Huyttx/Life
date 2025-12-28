import React from 'react';

const HeroBudgetCard: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-primary to-[#4b96ff] rounded-2xl p-6 text-white shadow-lg shadow-blue-500/20 relative overflow-hidden">
      {/* Abstract Pattern Background */}
      <div className="absolute top-0 right-0 -mr-8 -mt-8 size-32 rounded-full bg-white/10 blur-2xl"></div>
      <div className="absolute bottom-0 left-0 -ml-8 -mb-8 size-24 rounded-full bg-white/10 blur-xl"></div>
      
      <div className="relative z-10 flex flex-col gap-1">
        <span className="text-blue-100 text-sm font-medium opacity-90">Số tiền còn lại</span>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-black tracking-tight">12.500.000</span>
          <span className="text-xl font-bold opacity-80">đ</span>
        </div>
        
        <div className="mt-6">
          <div className="flex justify-between text-xs font-medium text-blue-100 mb-2">
            <span>Đã chi tiêu: 7.500.000 đ</span>
            <span>37%</span>
          </div>
          <div className="h-3 w-full bg-black/20 rounded-full overflow-hidden backdrop-blur-sm">
            <div className="h-full bg-white rounded-full" style={{ width: '37%' }}></div>
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-xs text-blue-100 opacity-80">Tổng ngân sách: 20.000.000 đ</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBudgetCard;