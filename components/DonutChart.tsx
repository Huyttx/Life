import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { ExpenseCategory } from '../types';

interface DonutChartProps {
  data: ExpenseCategory[];
}

const DonutChart: React.FC<DonutChartProps> = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-[#e7ecf3] shadow-sm flex flex-col md:flex-row items-center gap-8 h-full">
      {/* Chart Section */}
      <div className="relative size-48 shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data as any}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              startAngle={90}
              endAngle={-270}
              paddingAngle={0}
              dataKey="percentage"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        
        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-[#0d131b] pointer-events-none">
          <span className="text-xs text-[#4c6c9a]">Spent</span>
          <span className="text-xl font-bold">50%</span>
        </div>
      </div>

      {/* Legend Section */}
      <div className="flex flex-col gap-4 w-full">
        {data.map((item) => (
          <div key={item.name} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`size-3 rounded-full ${item.tailwindColorClass}`}></div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-[#0d131b]">{item.name}</span>
                <span className="text-xs text-[#4c6c9a]">{item.description}</span>
              </div>
            </div>
            <span className="text-sm font-bold text-[#0d131b]">{item.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonutChart;