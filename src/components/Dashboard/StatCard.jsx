import React from 'react';

export const StatCard = ({ title, value, icon, color }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 transform transition-transform hover:-translate-y-1" style={{ borderLeftColor: color }}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 mb-1 font-medium uppercase tracking-wide">{title}</p>
          <h3 className="text-4xl font-bold text-gray-800">{value}</h3>
        </div>
        <div className="p-4 rounded-full bg-opacity-10" style={{ backgroundColor: color, color: color }}>
          {icon}
        </div>
      </div>
    </div>
  );
};
