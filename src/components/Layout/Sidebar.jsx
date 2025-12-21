import React from 'react';
import { Archive, LogOut, User, LayoutDashboard, Plus, Package } from 'lucide-react';
import { COLORS } from '../../constants/colors';
import { SidebarItem } from '../Common/SidebarItem';

export const Sidebar = ({ userRole, view, onViewChange, onLogout }) => {
  return (
    <div className="fixed inset-y-0 left-0 z-30 w-64 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:inset-auto text-white shadow-2xl flex flex-col" style={{ backgroundColor: COLORS.dark }}>
      <div className="flex items-center justify-center h-20 shadow-md" style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}>
        <div className="flex items-center gap-2">
          <Archive size={28} color={COLORS.secondary} />
          <div>
            <h2 className="text-lg font-bold tracking-wider leading-none">REPOSITORY</h2>
            <span className="text-xs text-gray-300 tracking-widest">ARSIP</span>
          </div>
        </div>
      </div>

      <div className="p-4 flex-1">
        <div className="flex items-center gap-3 mb-8 p-3 rounded-lg bg-white bg-opacity-10 border border-white border-opacity-10">
          <div className="bg-white text-teal-800 p-2 rounded-full">
            <User size={20} />
          </div>
          <div>
            <p className="text-sm font-bold">{userRole === 'admin' ? 'Administrator' : 'Divisi User'}</p>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
              <p className="text-xs text-gray-300">Online</p>
            </div>
          </div>
        </div>

        <nav className="space-y-2">
          <SidebarItem icon={<LayoutDashboard size={20} />} label="Dashboard" active={view === 'dashboard'} onClick={() => onViewChange('dashboard')} />
          <SidebarItem icon={<Plus size={20} />} label="Input Box Baru" active={view === 'input-box'} onClick={() => onViewChange('input-box')} />
          <SidebarItem icon={<Package size={20} />} label="Data Box Arsip" active={view === 'data-box'} onClick={() => onViewChange('data-box')} />
        </nav>
      </div>

      <div className="p-4 bg-black bg-opacity-20">
        <button onClick={onLogout} className="flex items-center gap-2 w-full px-4 py-2 text-red-200 hover:text-white hover:bg-red-900/50 rounded-md transition-colors">
          <LogOut size={20} />
          <span>Keluar Sistem</span>
        </button>
      </div>
    </div>
  );
};
