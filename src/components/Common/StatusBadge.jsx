import React from 'react';

export const StatusBadge = ({ status }) => {
  const statusConfig = {
    approved: {
      bg: 'bg-[#b6d250]',
      text: 'text-white',
      label: 'APPROVED'
    },
    pending: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-800',
      label: 'PENDING'
    },
    rejected: {
      bg: 'bg-red-100',
      text: 'text-red-800',
      label: 'REJECTED'
    }
  };

  const config = statusConfig[status] || statusConfig.pending;

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${config.bg} ${config.text}`}>
      {config.label}
    </span>
  );
};
