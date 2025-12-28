import React, { useState } from 'react';
import Icon from './Icon';

interface AccountSettingsProps {
  onNavigateToCategories: () => void;
}

interface Member {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  roleColorClass: string;
  roleTextClass: string;
}

const initialMembers: Member[] = [
  { 
    id: '1', 
    name: 'Nguyen Van A', 
    email: 'nguyenvana@example.com', 
    role: 'Admin', 
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCl1oPAIk7ZivtNCXAlphKDjw4J9eeds1PuqGCYmVyAPM7S0cpWl_vR4jxbj-I9AfGoAPnK7xskq2rputowp1n5o9QU7Xu1E_6VoDBO27EicYOhhUPgMLLfUGmVh6Q6X6i6HGK72UPYgSwpfg5At1lD_9KAeOtsmrHpttvWRzXrYjQar4eHok4RrMUrZHvCLgO3jH8ibMsGiSiQq3nEhl6yT67ZpYNhOm3iMb2kHkrz-YzFXldifS60SUnqlEUQFxbL46sENhn48ts',
    roleColorClass: 'bg-primary/20',
    roleTextClass: 'text-green-700 dark:text-green-300'
  },
  { 
    id: '2', 
    name: 'Le Thi B', 
    email: 'lethib@example.com', 
    role: 'Editor', 
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBIhpSbBwefz8F89Bz6J-B6rYt-xky60Dn-R_6ebIK1sqCIo_u10Ti92xjgStd3xe6eYOAsjsUEmLrGuxz7l7hAAd4XLRvgze-LsYirA2p9K8MOaaVD-mtNnr8p5ul-dMEVlTcwRG7kqOPeErh6vLIFclmLudtW3tWy9lgDQTD6tJsH_zVEX_xT4YkCsLjizsRrgULzUB6O3c70_Kra-BDeG7J6N4B3An7HazyofgKa4irq827sJOAg8iltjMeOGlh1Y1A7kmdRv8w',
    roleColorClass: 'bg-blue-100 dark:bg-blue-900/30',
    roleTextClass: 'text-blue-700 dark:text-blue-300'
  },
  { 
    id: '3', 
    name: 'Nguyen Van C', 
    email: 'Viewer access', 
    role: 'Child', 
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCtpJyJo0hq65ZY58mKYntUN1Ti6IqVk0fq8q4xXXPmEIQTApOCewjMhSDV4eUNBK7kshtBwp6PhY7sGRle6g-Bg5C0JMTypQNrX61YYk8CAhWHeX1vl3DBjbEB3rHh9eYaWSi3kMF3Pa2bJ4u-7f3eTwd-3tnImXQQ7IGsS5gNoHFQfsxxai50jI2X-M8RkfehNoli-ZT9_zDvJm8GYzoEosvLvcbC51Od998ZsP6iBgzHxEfCItCL2vOprkiKjX9rPHrS3RkDog',
    roleColorClass: 'bg-blue-100 dark:bg-blue-900/30',
    roleTextClass: 'text-blue-700 dark:text-blue-300'
  },
];

const AccountSettings: React.FC<AccountSettingsProps> = ({ onNavigateToCategories }) => {
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [isBackupEnabled, setIsBackupEnabled] = useState(true);
  const [isAppLockEnabled, setIsAppLockEnabled] = useState(false);
  const [currency, setCurrency] = useState('VND');
  const [isSaving, setIsSaving] = useState(false);
  const [showAddMember, setShowAddMember] = useState(false);

  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [newMemberRole, setNewMemberRole] = useState('Viewer');

  const handleRemoveMember = (id: string) => {
    if (confirm('Are you sure you want to remove this family member?')) {
      setMembers(members.filter(m => m.id !== id));
    }
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    const newMember: Member = {
      id: Date.now().toString(),
      name: newMemberName,
      email: newMemberEmail,
      role: newMemberRole,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(newMemberName)}&background=random`,
      roleColorClass: 'bg-gray-100 dark:bg-gray-700',
      roleTextClass: 'text-gray-700 dark:text-gray-300'
    };
    setMembers([...members, newMember]);
    setShowAddMember(false);
    setNewMemberName('');
    setNewMemberEmail('');
    setNewMemberRole('Viewer');
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert('Settings saved successfully!');
    }, 1500);
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-background-light dark:bg-background-dark relative">
      <div className="flex-1 overflow-y-auto p-6 md:p-12 no-scrollbar">
        <div className="max-w-5xl mx-auto w-full flex flex-col gap-10">
          
          {/* Header */}
          <div className="flex flex-col gap-3">
             <nav aria-label="Breadcrumb" className="flex items-center gap-2">
              <a href="#" className="text-text-muted-light dark:text-text-muted-dark hover:text-primary transition-colors text-sm font-medium">Home</a>
              <span className="text-gray-300 dark:text-gray-600 text-sm font-medium">/</span>
              <span aria-current="page" className="text-text-main-light dark:text-white text-sm font-semibold">Settings</span>
            </nav>
            <h1 className="text-text-main-light dark:text-white text-4xl font-extrabold tracking-tight">Settings</h1>
            <p className="text-text-muted-light dark:text-text-muted-dark text-lg font-normal leading-relaxed max-w-2xl">
              Manage your family members, configure application preferences, and ensure your data security.
            </p>
          </div>

          <div className="flex flex-col gap-8 pb-24">
            
            {/* Family Members Section */}
            <section className="bg-card-light dark:bg-card-dark rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
              <div className="px-8 py-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center flex-wrap gap-4 bg-gray-50/50 dark:bg-gray-900/20">
                <div>
                  <h2 className="text-xl font-bold text-text-main-light dark:text-white">Family Members</h2>
                  <p className="text-sm text-text-muted-light dark:text-text-muted-dark mt-1">Manage access and roles for your family account.</p>
                </div>
                <button 
                  onClick={() => setShowAddMember(true)}
                  className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white font-semibold py-2.5 px-5 rounded-xl transition-all shadow-sm active:scale-95 transform"
                >
                  <Icon name="add" size={20} />
                  <span>Add Member</span>
                </button>
              </div>
              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                {members.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-6 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors group">
                    <div className="flex items-center gap-5">
                      <div className="relative">
                        <div 
                          className="bg-center bg-no-repeat bg-cover rounded-full h-14 w-14 border-2 border-white shadow-sm dark:border-gray-700" 
                          style={{ backgroundImage: `url("${member.avatar}")` }}
                        ></div>
                        {member.role === 'Admin' && (
                          <div className="absolute -bottom-1 -right-1 bg-primary rounded-full border-2 border-white dark:border-gray-900 w-5 h-5"></div>
                        )}
                      </div>
                      <div>
                        <p className="text-text-main-light dark:text-white text-lg font-bold">{member.name}</p>
                        <p className="text-text-muted-light dark:text-text-muted-dark text-sm">{member.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`hidden sm:inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider ${member.roleColorClass} ${member.roleTextClass}`}>
                        {member.role}
                      </span>
                      <button 
                        onClick={() => handleRemoveMember(member.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20" 
                        title="Remove Member"
                      >
                        <Icon name="delete" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Application Settings Section */}
            <section className="bg-card-light dark:bg-card-dark rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
              <div className="px-8 py-6 border-b border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/20">
                <h2 className="text-xl font-bold text-text-main-light dark:text-white">Application Settings</h2>
                <p className="text-sm text-text-muted-light dark:text-text-muted-dark mt-1">Customize your experience, backups, and security.</p>
              </div>
              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                
                {/* Currency */}
                <div className="p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex gap-5">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-xl h-fit text-blue-600 dark:text-blue-400">
                      <Icon name="currency_exchange" />
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-text-main-light dark:text-white">Currency</p>
                      <p className="text-sm text-text-muted-light dark:text-text-muted-dark mt-0.5">Select the default currency for your transactions.</p>
                    </div>
                  </div>
                  <div className="min-w-[150px]">
                    <select 
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-text-main-light dark:text-white text-base rounded-xl focus:ring-secondary focus:border-secondary block p-3 shadow-sm outline-none"
                    >
                      <option value="VND">VND (₫)</option>
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                    </select>
                  </div>
                </div>

                {/* Backup */}
                <div className="p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex gap-5">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-xl h-fit text-blue-600 dark:text-blue-400">
                      <Icon name="cloud_sync" />
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-text-main-light dark:text-white">Google Drive Backup</p>
                      <p className="text-sm text-text-muted-light dark:text-text-muted-dark mt-0.5">Automatically sync your data to the cloud.</p>
                      {isBackupEnabled && (
                        <p className="text-xs text-primary dark:text-primary mt-2 font-semibold flex items-center gap-1.5 animate-fadeIn">
                          <Icon name="check_circle" size={16} className="filled" />
                          Last backup: Today, 10:23 AM
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={isBackupEnabled}
                        onChange={() => setIsBackupEnabled(!isBackupEnabled)}
                      />
                      <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 dark:peer-focus:ring-primary/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                </div>

                {/* Export */}
                <div className="p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex gap-5">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-xl h-fit text-blue-600 dark:text-blue-400">
                      <Icon name="download" />
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-text-main-light dark:text-white">Export Data</p>
                      <p className="text-sm text-text-muted-light dark:text-text-muted-dark mt-0.5">Download your financial records.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm text-text-main-light dark:text-white hover:scale-105 active:scale-95">
                      <Icon name="table_view" className="text-green-600" size={20} />
                      Excel
                    </button>
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm text-text-main-light dark:text-white hover:scale-105 active:scale-95">
                      <Icon name="picture_as_pdf" className="text-red-500" size={20} />
                      PDF
                    </button>
                  </div>
                </div>

                {/* App Lock */}
                <div className="p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex gap-5">
                    <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-xl h-fit text-orange-600 dark:text-orange-400">
                      <Icon name="lock" />
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-text-main-light dark:text-white">App Lock</p>
                      <p className="text-sm text-text-muted-light dark:text-text-muted-dark mt-0.5">Require PIN or Password to open the application.</p>
                    </div>
                  </div>
                  <div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={isAppLockEnabled}
                        onChange={() => setIsAppLockEnabled(!isAppLockEnabled)}
                      />
                      <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 dark:peer-focus:ring-primary/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                </div>

              </div>
            </section>
            
            {/* Category Button (Custom addition) */}
            <button 
              onClick={onNavigateToCategories}
              className="bg-card-light dark:bg-card-dark rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800 flex items-center justify-between hover:border-primary/50 transition-colors group"
            >
              <div className="flex items-center gap-5">
                <div className="bg-pink-100 dark:bg-pink-900/30 p-3 rounded-xl h-fit text-pink-600 dark:text-pink-400">
                    <Icon name="category" />
                </div>
                <div className="text-left">
                  <p className="text-lg font-semibold text-text-main-light dark:text-white">Manage Categories</p>
                  <p className="text-sm text-text-muted-light dark:text-text-muted-dark mt-0.5">Edit transaction categories and icons.</p>
                </div>
              </div>
              <Icon name="chevron_right" className="text-gray-400 group-hover:text-primary" />
            </button>

            <div className="flex justify-end pt-4">
              <button 
                onClick={handleSave}
                disabled={isSaving}
                className="bg-primary hover:bg-primary-hover text-white font-bold py-3 px-8 rounded-xl shadow-md active:scale-95 transition-all text-lg min-w-[160px] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSaving ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </button>
            </div>
            
          </div>
        </div>
      </div>

      {/* Add Member Modal */}
      {showAddMember && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white dark:bg-card-dark w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-slideUp">
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
              <h3 className="text-xl font-bold text-text-main-light dark:text-white">Add Family Member</h3>
              <button onClick={() => setShowAddMember(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                <Icon name="close" />
              </button>
            </div>
            <form onSubmit={handleAddMember} className="p-6 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-text-muted-light dark:text-text-muted-dark">Name</label>
                <input 
                  type="text" 
                  required
                  value={newMemberName}
                  onChange={(e) => setNewMemberName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  placeholder="e.g. John Doe"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-text-muted-light dark:text-text-muted-dark">Email</label>
                <input 
                  type="email" 
                  required
                  value={newMemberEmail}
                  onChange={(e) => setNewMemberEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  placeholder="john@example.com"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-text-muted-light dark:text-text-muted-dark">Role</label>
                <select 
                  value={newMemberRole}
                  onChange={(e) => setNewMemberRole(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                >
                  <option value="Admin">Admin</option>
                  <option value="Editor">Editor</option>
                  <option value="Viewer">Viewer</option>
                  <option value="Child">Child</option>
                </select>
              </div>
              <div className="flex gap-3 mt-4">
                <button 
                  type="button" 
                  onClick={() => setShowAddMember(false)}
                  className="flex-1 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-1 py-3 rounded-xl font-bold text-white bg-primary hover:bg-primary-hover shadow-lg shadow-green-500/20 transition-all"
                >
                  Add Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AccountSettings;