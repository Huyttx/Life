import React from 'react';
import Icon from './Icon';

export const BudgetCard: React.FC = () => {
  return (
    <div className="flex flex-col justify-between p-6 rounded-2xl bg-primary text-white shadow-xl shadow-primary/20 relative overflow-hidden group min-h-[160px]">
      <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all"></div>
      
      <div className="flex justify-between items-start z-10">
        <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
          <Icon name="account_balance_wallet" className="text-white" />
        </div>
        <span className="bg-white/20 px-2 py-1 rounded text-xs font-bold backdrop-blur-sm">75% Left</span>
      </div>

      <div className="flex flex-col gap-1 mt-6 z-10">
        <p className="text-blue-100 text-sm font-medium">Remaining Budget</p>
        <p className="text-3xl md:text-4xl font-bold tracking-tight">15.000.000 ₫</p>
      </div>
    </div>
  );
};

interface SimpleStatCardProps {
  label: string;
  value: string;
  trend: number;
  trendDirection: 'up' | 'down';
  icon: string;
  iconColorClass: string;
  trendColorClass: string;
}

export const SimpleStatCard: React.FC<SimpleStatCardProps> = ({
  label,
  value,
  trend,
  trendDirection,
  icon,
  iconColorClass,
  trendColorClass,
}) => {
  return (
    <div className="flex flex-col justify-between p-6 rounded-2xl bg-white border border-[#e7ecf3] shadow-sm min-h-[160px]">
      <div className="flex justify-between items-start">
        <div className={`p-2 rounded-lg ${iconColorClass}`}>
          <Icon name={icon} />
        </div>
        <div className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-bold ${trendColorClass}`}>
          <Icon 
            name={trendDirection === 'up' ? 'arrow_upward' : 'arrow_downward'} 
            size={14} 
          />
          <span>{trend}%</span>
        </div>
      </div>
      <div className="flex flex-col gap-1 mt-6">
        <p className="text-[#4c6c9a] text-sm font-medium">{label}</p>
        <p className="text-[#0d131b] text-2xl md:text-3xl font-bold tracking-tight">{value}</p>
      </div>
    </div>
  );
};