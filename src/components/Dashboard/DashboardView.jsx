import React from 'react';
import { Package, CheckCircle, Clock } from 'lucide-react';
import { COLORS } from '../../constants/colors';
import { StatCard } from './StatCard';
import { StatusBadge } from '../Common/StatusBadge';

export const DashboardView = ({ boxes, onViewChange }) => {
  const pendingCount = boxes.filter(l => l.status === 'pending').length;
  const approvedCount = boxes.filter(l => l.status === 'approved').length;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">Dashboard Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Box Arsip" value={boxes.length} icon={<Package size={28} />} color={COLORS.primary} />
        <StatCard title="Box Ter-Register (ACC)" value={approvedCount} icon={<CheckCircle size={28} />} color={COLORS.secondary} />
        <StatCard title="Menunggu Nomor Kotak" value={pendingCount} icon={<Clock size={28} />} color={COLORS.warning} />
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h3 className="font-semibold text-gray-700">Aktivitas Terbaru</h3>
          <button onClick={() => onViewChange('data-box')} className="text-sm text-[#1594a2] hover:underline font-medium">Lihat Semua Data</button>
        </div>
        <div className="divide-y divide-gray-100">
          {boxes.slice(0, 3).map((box) => (
            <div key={box.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-full ${box.status === 'approved' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                  {box.status === 'approved' ? <CheckCircle size={20} /> : <Clock size={20} />}
                </div>
                <div>
                  <p className="font-bold text-gray-800">Box dari: {box.divisi}</p>
                  <p className="text-xs text-gray-500">Asal: {box.asal_arsip} • {box.tanggal}</p>
                </div>
              </div>
              <div className="text-right">
                <StatusBadge status={box.status} />
                {box.nomor_kotak && <p className="text-xs font-mono font-bold text-[#0c616a] mt-1">{box.nomor_kotak}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
