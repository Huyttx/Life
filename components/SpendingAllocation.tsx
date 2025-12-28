import React from 'react';

const SpendingAllocation: React.FC = () => {
  return (
    <div className="mb-8">
      <h3 className="text-[#0d131b] dark:text-white font-bold text-lg mb-4">Phân bổ chi tiêu</h3>
      <div className="flex h-12 w-full rounded-xl overflow-hidden shadow-sm">
        <div className="h-full bg-[#136dec]" style={{ width: '50%' }}></div> {/* Food */}
        <div className="h-full bg-[#f59e0b]" style={{ width: '30%' }}></div> {/* Bills */}
        <div className="h-full bg-[#10b981]" style={{ width: '15%' }}></div> {/* Education */}
        <div className="h-full bg-slate-200 dark:bg-slate-600" style={{ width: '5%' }}></div> {/* Others */}
      </div>
      <div className="flex flex-wrap gap-3 mt-3">
        <div className="flex items-center gap-1.5">
          <div className="size-3 rounded-full bg-[#136dec]"></div>
          <span className="text-xs font-medium text-secondary">Ăn uống</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="size-3 rounded-full bg-[#f59e0b]"></div>
          <span className="text-xs font-medium text-secondary">Hóa đơn</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="size-3 rounded-full bg-[#10b981]"></div>
          <span className="text-xs font-medium text-secondary">Giáo dục</span>
        </div>
      </div>
    </div>
  );
};

export default SpendingAllocation;