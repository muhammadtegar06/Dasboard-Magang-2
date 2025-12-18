import React from 'react';
import { COLORS } from '../../constants/colors';

export const SidebarItem = ({ icon, label, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 w-full px-4 py-3 text-sm font-medium rounded-md transition-all duration-200 border-l-4 ${
        active
          ? 'bg-white bg-opacity-10 text-white border-[#b6d250]'
          : 'border-transparent text-gray-400 hover:bg-white hover:bg-opacity-5 hover:text-white'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};
