import React, { useState } from 'react';
import Icon from './Icon';

interface CategoryManagementProps {
  onBack: () => void;
}

interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  colorBg: string;
  colorText: string;
}

const initialExpenseCategories: Category[] = [
  { id: '1', name: 'Đi chợ / Siêu thị', description: 'Thực phẩm hàng ngày', icon: 'shopping_basket', colorBg: 'bg-orange-100 dark:bg-orange-900/30', colorText: 'text-orange-600 dark:text-orange-400' },
  { id: '2', name: 'Điện nước', description: 'Hóa đơn hàng tháng', icon: 'water_drop', colorBg: 'bg-blue-100 dark:bg-blue-900/30', colorText: 'text-blue-600 dark:text-blue-400' },
  { id: '3', name: 'Tiền học', description: 'Học phí, sách vở', icon: 'school', colorBg: 'bg-indigo-100 dark:bg-indigo-900/30', colorText: 'text-indigo-600 dark:text-indigo-400' },
  { id: '4', name: 'Thuốc men', description: 'Khám bệnh, thuốc', icon: 'medical_services', colorBg: 'bg-red-100 dark:bg-red-900/30', colorText: 'text-red-600 dark:text-red-400' },
  { id: '5', name: 'Đi lại', description: 'Xăng xe, gửi xe', icon: 'two_wheeler', colorBg: 'bg-teal-100 dark:bg-teal-900/30', colorText: 'text-teal-600 dark:text-teal-400' },
  { id: '6', name: 'Ăn tiệm', description: 'Cafe, ăn ngoài', icon: 'restaurant', colorBg: 'bg-yellow-100 dark:bg-yellow-900/30', colorText: 'text-yellow-600 dark:text-yellow-400' },
];

const initialIncomeCategories: Category[] = [
  { id: '10', name: 'Lương', description: 'Thu nhập chính', icon: 'payments', colorBg: 'bg-green-100 dark:bg-green-900/30', colorText: 'text-green-600 dark:text-green-400' },
  { id: '11', name: 'Thưởng', description: 'Thưởng quý, tết', icon: 'military_tech', colorBg: 'bg-purple-100 dark:bg-purple-900/30', colorText: 'text-purple-600 dark:text-purple-400' },
  { id: '12', name: 'Đầu tư', description: 'Lãi tiết kiệm, chứng khoán', icon: 'trending_up', colorBg: 'bg-cyan-100 dark:bg-cyan-900/30', colorText: 'text-cyan-600 dark:text-cyan-400' },
];

const CategoryManagement: React.FC<CategoryManagementProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'expense' | 'income'>('expense');
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const categories = activeTab === 'expense' ? initialExpenseCategories : initialIncomeCategories;

  const handleEditClick = (category: Category) => {
    setEditingCategory(category);
  };

  const closeModal = () => {
    setEditingCategory(null);
  };

  return (
    <div className="flex-1 flex flex-col bg-background-light dark:bg-background-dark w-full h-full relative">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-y-auto no-scrollbar">
        <div className="flex flex-col gap-6 p-4 pb-24">
          
          {/* Page Header */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <button 
                onClick={onBack}
                className="p-2 -ml-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
              >
                <Icon name="arrow_back" />
              </button>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">Danh mục</h2>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base">
                Chạm để sửa tên hoặc giữ biểu tượng <span className="material-symbols-outlined align-middle text-sm">drag_indicator</span> để sắp xếp.
            </p>
          </div>

          {/* Segmented Control (Tabs) */}
          <div className="bg-slate-100 dark:bg-slate-800 p-1.5 rounded-xl flex shadow-inner">
            <button 
              onClick={() => setActiveTab('expense')}
              className={`flex-1 py-3 px-4 rounded-lg font-bold shadow-sm transition-all flex items-center justify-center gap-2 ${
                activeTab === 'expense' 
                  ? 'bg-white dark:bg-slate-700 text-primary' 
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700/50 font-medium shadow-none'
              }`}
            >
              <Icon name="shopping_cart" size={20} />
              Chi tiêu
            </button>
            <button 
              onClick={() => setActiveTab('income')}
              className={`flex-1 py-3 px-4 rounded-lg font-bold shadow-sm transition-all flex items-center justify-center gap-2 ${
                activeTab === 'income' 
                  ? 'bg-white dark:bg-slate-700 text-primary' 
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700/50 font-medium shadow-none'
              }`}
            >
              <Icon name="payments" size={20} />
              Thu nhập
            </button>
          </div>

          {/* Categories List */}
          <div className="flex flex-col gap-3">
            {categories.map((category) => (
              <div 
                key={category.id}
                onClick={() => handleEditClick(category)}
                className="group bg-white dark:bg-slate-800 rounded-2xl p-4 flex items-center gap-4 shadow-sm border border-slate-100 dark:border-slate-700 hover:border-primary/50 transition-colors cursor-pointer select-none"
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 ${category.colorBg} ${category.colorText}`}>
                  <Icon name={category.icon} size={30} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white truncate">{category.name}</h3>
                  <p className="text-sm text-slate-400 truncate">{category.description}</p>
                </div>
                <button 
                  className="p-2 text-slate-300 group-hover:text-primary dark:text-slate-600 dark:group-hover:text-primary transition-colors cursor-grab active:cursor-grabbing hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Icon name="drag_indicator" />
                </button>
              </div>
            ))}
          </div>

          {/* Add New Button */}
          <button className="mt-4 w-full py-4 rounded-xl bg-white dark:bg-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-600 text-slate-500 dark:text-slate-400 font-bold flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-primary hover:text-primary transition-all group">
            <span className="bg-slate-100 dark:bg-slate-700 rounded-full p-1 group-hover:bg-primary/10 transition-colors">
              <Icon name="add" className="block" />
            </span>
            Thêm danh mục mới
          </button>
          
          {/* Bottom Floating Action Bar (Sticky Footer within scroll area if content is long, or absolute if we want it pinned) */}
          {/* The user provided HTML has it pinned. We'll simulate that with absolute positioning in the parent or fixed. */}
        </div>
      </div>
      
      {/* Sticky Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 z-10">
        <button className="w-full bg-primary hover:bg-blue-600 text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-blue-500/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
            <Icon name="check" />
            Lưu thay đổi
        </button>
      </div>

      {/* Edit Modal Overlay */}
      {editingCategory && (
        <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-end md:items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white dark:bg-slate-800 w-full max-w-[400px] rounded-t-3xl md:rounded-3xl p-6 shadow-2xl transform transition-all animate-slideUp">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Sửa danh mục</h3>
              <button 
                onClick={closeModal}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <Icon name="close" />
              </button>
            </div>
            <div className="flex flex-col gap-6">
              
              {/* Icon Selector */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Biểu tượng</label>
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide no-scrollbar">
                  <button className={`w-16 h-16 shrink-0 rounded-2xl ${editingCategory.colorBg} ${editingCategory.colorText} border-2 border-primary flex items-center justify-center relative`}>
                    <Icon name={editingCategory.icon} size={30} />
                    <div className="absolute -top-2 -right-2 bg-primary text-white rounded-full p-0.5">
                      <Icon name="check" size={14} className="font-bold" />
                    </div>
                  </button>
                  {/* Mock other icons */}
                  {['shopping_cart', 'storefront', 'local_mall', 'credit_card'].map(icon => (
                     <button key={icon} className="w-16 h-16 shrink-0 rounded-2xl bg-slate-100 dark:bg-slate-700 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-600 flex items-center justify-center transition-colors">
                        <Icon name={icon} size={30} />
                     </button>
                  ))}
                </div>
              </div>

              {/* Name Input */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Tên danh mục</label>
                <input 
                  className="w-full text-lg font-bold bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:text-white" 
                  placeholder="Nhập tên danh mục..." 
                  type="text" 
                  defaultValue={editingCategory.name}
                />
              </div>

              {/* Subtitle Input */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Mô tả ngắn</label>
                <input 
                  className="w-full text-base bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:text-white" 
                  placeholder="Ví dụ: Tiền học phí..." 
                  type="text" 
                  defaultValue={editingCategory.description}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-4">
                <button className="flex-1 py-3 px-4 rounded-xl text-red-600 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 font-bold transition-colors">Xóa</button>
                <button 
                  onClick={closeModal}
                  className="flex-[2] py-3 px-4 rounded-xl text-white bg-primary hover:bg-blue-600 font-bold shadow-lg shadow-blue-500/20 transition-colors"
                >
                  Lưu lại
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryManagement;