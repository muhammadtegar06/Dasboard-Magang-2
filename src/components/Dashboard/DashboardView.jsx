import React from 'react';
import { FileText, Archive } from 'lucide-react';

export const DashboardView = ({ boxes, currentUsername, userRole, onViewChange }) => {
  const totalBoxes = boxes.length;
  const approvedBoxes = boxes.filter(b => b.status === 'approved').length;
  const pendingBoxes = boxes.filter(b => b.status === 'pending').length;

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Welcome Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-[#1594a2] mb-4">
                Selamat datang {currentUsername} di Repository Arsip PTPN IV
              </h1>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                Sistem Repository Arsip merupakan aplikasi perusahaan yang digunakan untuk mempermudah dalam pengelolaan surat masuk, pengajuan dokumen, disposisi, pencarian hingga pelaporan dokumen arsip pada suatu instansi.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => onViewChange('input-box')}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-[#1594a2] text-white font-semibold rounded-lg hover:bg-[#0c616a] transition-colors"
                >
                  <FileText size={20} />
                  Pengajuan Surat Masuk
                </button>
                <button
                  onClick={() => onViewChange('data-box')}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-[#b6d250] text-gray-800 font-semibold rounded-lg hover:bg-[#a3be43] transition-colors"
                >
                  <Archive size={20} />
                  Lihat Data Arsip
                </button>
              </div>
            </div>

            {/* Right Illustration */}
            <div className="hidden md:flex justify-center items-center">
              <div className="w-full h-64 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Archive size={80} className="text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-400 text-sm">Repository Arsip</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">Ringkasan Data</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Boxes */}
          <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-[#1594a2]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Pengajuan</p>
                <p className="text-3xl font-bold text-gray-800">{totalBoxes}</p>
              </div>
              <Archive className="text-[#1594a2] opacity-20" size={48} />
            </div>
          </div>

          {/* Approved Boxes */}
          <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-[#b6d250]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Disetujui</p>
                <p className="text-3xl font-bold text-gray-800">{approvedBoxes}</p>
              </div>
              <div className="w-12 h-12 bg-[#b6d250] bg-opacity-20 rounded-full flex items-center justify-center">
                <span className="text-[#b6d250] font-bold">✓</span>
              </div>
            </div>
          </div>

          {/* Pending Boxes */}
          <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-yellow-400">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Menunggu Persetujuan</p>
                <p className="text-3xl font-bold text-gray-800">{pendingBoxes}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-400 bg-opacity-20 rounded-full flex items-center justify-center">
                <span className="text-yellow-600 font-bold">!</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
