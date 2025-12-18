import React from 'react';
import { Menu } from 'lucide-react';

export const Header = ({ onMenuClick }) => {
  return (
    <header className="bg-white shadow-sm h-16 flex items-center justify-between px-4 md:hidden z-20">
      <button onClick={onMenuClick} className="text-gray-600">
        <Menu size={24} />
      </button>
      <span className="font-bold text-[#0c616a]">INDOARSIP REPO</span>
      <div className="w-6"></div>
    </header>
  );
};
