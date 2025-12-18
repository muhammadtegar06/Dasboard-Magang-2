import React, { useState } from 'react';
import { Search, CheckCircle, XCircle, Clock } from 'lucide-react';
import { COLORS } from '../../constants/colors';
import { StatusBadge } from '../Common/StatusBadge';

export const DataBoxView = ({ boxes, userRole, onApprove, onReject }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBoxes = boxes.filter(box =>
    box.nomor_kotak?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    box.divisi.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleApprove = (id) => {
    const inputNomor = prompt("Masukkan Nomor Kotak / RFID untuk Box ini:");
    if (inputNomor) {
      onApprove(id, inputNomor);
    }
  };

  const handleReject = (id) => {
    const reason = prompt("Masukkan alasan penolakan (opsional):");
    if (reason !== null) {
      onReject(id, reason);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Data Box Arsip</h2>
          <p className="text-sm text-gray-500">Daftar semua box yang telah diajukan dan statusnya.</p>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Cari nomor kotak / divisi..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1594a2] w-64"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-semibold uppercase text-xs tracking-wider">
              <tr>
                <th className="px-6 py-4">Status ACC</th>
                <th className="px-6 py-4">Nomor Kotak / RFID</th>
                <th className="px-6 py-4">Divisi & Asal</th>
                <th className="px-6 py-4">Isi Dokumen</th>
                <th className="px-6 py-4 text-center">Jml Bantex</th>
                {userRole === 'admin' && <th className="px-6 py-4 text-center">Aksi Admin</th>}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-sm">
              {filteredBoxes.map((box) => (
                <tr key={box.id} className="hover:bg-blue-50 transition-colors group">
                  <td className="px-6 py-4">
                    <StatusBadge status={box.status} />
                  </td>
                  <td className="px-6 py-4 font-mono">
                    {box.status === 'approved' ? (
                      <span className="font-bold text-[#0c616a] text-base border-b-2 border-[#b6d250] pb-0.5">{box.nomor_kotak}</span>
                    ) : (
                      <span className="text-gray-400 italic text-xs flex items-center gap-1">
                        <Clock size={12} /> Menunggu Admin
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-gray-800">{box.divisi}</div>
                    <div className="text-xs text-gray-500">{box.asal_arsip}</div>
                    <div className="text-xs text-gray-400 mt-1">{box.tanggal}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="max-h-20 overflow-y-auto pr-2 custom-scrollbar">
                      <ul className="list-disc list-inside text-xs text-gray-600 space-y-1">
                        {box.dokumen.map((doc, idx) => (
                          <li key={idx} className="truncate" title={doc.nama}>
                            <span className="font-medium text-gray-800">{doc.nama}</span> <span className="text-gray-400">({doc.periode})</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`font-bold text-lg ${box.jumlah_bantex >= 5 ? 'text-green-600' : 'text-gray-500'}`}>
                      {box.jumlah_bantex}
                    </span>
                  </td>

                  {userRole === 'admin' && (
                    <td className="px-6 py-4 text-center">
                      {box.status === 'pending' ? (
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleApprove(box.id)}
                            className="flex items-center gap-1 px-3 py-1.5 bg-[#b6d250] text-white rounded shadow hover:bg-[#a3be43] transition-colors text-xs font-bold"
                            title="ACC & Input Nomor Kotak"
                          >
                            <CheckCircle size={14} /> Input No. Kotak
                          </button>
                          <button
                            onClick={() => handleReject(box.id)}
                            className="p-1.5 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors"
                            title="Tolak"
                          >
                            <XCircle size={16} />
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400">Selesai</span>
                      )}
                    </td>
                  )}
                </tr>
              ))}
              {filteredBoxes.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-400 bg-gray-50 italic">
                    Belum ada data box arsip.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
