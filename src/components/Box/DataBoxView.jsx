import React, { useState, useMemo } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { COLORS } from '../../constants/colors';
import { StatusBadge } from '../Common/StatusBadge';

export const DataBoxView = ({ boxes, userRole, onApprove, onReject }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTanggalAwal, setFilterTanggalAwal] = useState('');
  const [filterTanggalAkhir, setFilterTanggalAkhir] = useState('');
  const [filterTahun, setFilterTahun] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Extract tahun dari periode dokumen
  const extractTahun = (periode) => {
    const match = periode.match(/(\d{4})/);
    return match ? match[1] : '';
  };

  const filteredBoxes = useMemo(() => {
    return boxes.filter(box => {
      const boxTanggal = new Date(box.tanggal);
      const awal = filterTanggalAwal ? new Date(filterTanggalAwal) : null;
      const akhir = filterTanggalAkhir ? new Date(filterTanggalAkhir) : null;

      // Filter tanggal surat
      if (awal && boxTanggal < awal) return false;
      if (akhir && boxTanggal > akhir) return false;

      // Filter tahun dari periode dokumen
      if (filterTahun) {
        const hasTahun = box.dokumen?.some(doc => extractTahun(doc.periode) === filterTahun);
        if (!hasTahun) return false;
      }

      // Filter search
      if (searchTerm) {
        return (
          box.nomor_kotak?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          box.divisi.toLowerCase().includes(searchTerm.toLowerCase()) ||
          box.asal_arsip?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      return true;
    });
  }, [boxes, searchTerm, filterTanggalAwal, filterTanggalAkhir, filterTahun]);

  // Get unique tahun from all dokumen
  const uniqueTahun = useMemo(() => {
    const tahunSet = new Set();
    boxes.forEach(box => {
      box.dokumen?.forEach(doc => {
        const tahun = extractTahun(doc.periode);
        if (tahun) tahunSet.add(tahun);
      });
    });
    return Array.from(tahunSet).sort().reverse();
  }, [boxes]);

  // Pagination
  const totalPages = Math.ceil(filteredBoxes.length / itemsPerPage);
  const paginatedBoxes = filteredBoxes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
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
          <h2 className="text-2xl font-bold text-gray-800">Data Surat Masuk</h2>
          <p className="text-sm text-gray-500">Total: {filteredBoxes.length} data</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cari</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Nomor kotak / divisi..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1594a2]"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>
          </div>

          {/* Filter Tanggal Awal */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Dari Tanggal</label>
            <input
              type="date"
              value={filterTanggalAwal}
              onChange={(e) => {
                setFilterTanggalAwal(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1594a2]"
            />
          </div>

          {/* Filter Tanggal Akhir */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sampai Tanggal</label>
            <input
              type="date"
              value={filterTanggalAkhir}
              onChange={(e) => {
                setFilterTanggalAkhir(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1594a2]"
            />
          </div>

          {/* Filter Tahun Periode */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Periode (Tahun)</label>
            <select
              value={filterTahun}
              onChange={(e) => {
                setFilterTahun(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1594a2]"
            >
              <option value="">-- Semua Tahun --</option>
              {uniqueTahun.map(tahun => (
                <option key={tahun} value={tahun}>{tahun}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Items per page */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Tampilkan</label>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="px-3 py-1 border border-gray-300 rounded text-sm"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <span className="text-sm text-gray-600">data</span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-700 font-semibold uppercase text-xs tracking-wider sticky top-0">
              <tr>
                <th className="px-6 py-4">No.</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Nomor Kotak</th>
                <th className="px-6 py-4">Tanggal Masuk</th>
                <th className="px-6 py-4">Divisi</th>
                <th className="px-6 py-4">Dokumen</th>
                <th className="px-6 py-4 text-center">Bantex</th>
                <th className="px-6 py-4 text-center">Box</th>
                {userRole === 'admin' && <th className="px-6 py-4 text-center">Aksi</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedBoxes.length > 0 ? (
                paginatedBoxes.map((box, index) => (
                  <tr key={box.id} className="hover:bg-blue-50 transition-colors">
                    <td className="px-6 py-4 font-medium">
                      {((currentPage - 1) * itemsPerPage) + index + 1}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={box.status} />
                    </td>
                    <td className="px-6 py-4 font-mono">
                      {box.status === 'approved' ? (
                        <span className="font-bold text-[#0c616a] text-base border-b-2 border-[#b6d250]">
                          {box.nomor_kotak}
                        </span>
                      ) : (
                        <span className="text-gray-400 text-xs italic">Menunggu ACC</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{box.tanggal}</td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-800">{box.divisi}</div>
                      <div className="text-xs text-gray-500">{box.asal_arsip}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-h-20 overflow-y-auto text-xs text-gray-600">
                        {box.dokumen && box.dokumen.length > 0 ? (
                          <ul className="list-disc list-inside space-y-1">
                            {box.dokumen.map((doc, idx) => (
                              <li key={idx} className="truncate" title={`${doc.nama} (${doc.periode})`}>
                                {doc.nama}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          '-'
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`font-bold text-lg ${box.jumlah_bantex >= 6 ? 'text-green-600' : 'text-gray-500'}`}>
                        {box.jumlah_bantex || 0}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`font-bold text-lg ${box.jumlah_box ? 'text-green-600' : 'text-gray-400'}`}>
                        {box.jumlah_box || 0}
                      </span>
                    </td>
                    {userRole === 'admin' && (
                      <td className="px-6 py-4 text-center">
                        {box.status === 'pending' ? (
                          <button
                            onClick={() => {
                              const inputNomor = prompt("Masukkan Nomor Kotak / RFID:");
                              if (inputNomor) {
                                onApprove(box.id, inputNomor);
                              }
                            }}
                            className="px-3 py-1 bg-[#b6d250] text-white rounded text-xs font-bold hover:bg-[#a3be43] transition"
                          >
                            Setujui
                          </button>
                        ) : (
                          <span className="text-xs text-gray-400">Selesai</span>
                        )}
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={userRole === 'admin' ? 9 : 8} className="px-6 py-12 text-center text-gray-400">
                    Tidak ada data yang sesuai dengan filter
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredBoxes.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between bg-gray-50">
            <div className="text-sm text-gray-600">
              Menampilkan {((currentPage - 1) * itemsPerPage) + 1} sampai {Math.min(currentPage * itemsPerPage, filteredBoxes.length)} dari {filteredBoxes.length} data
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-gray-300 rounded text-sm font-medium hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Sebelumnya
              </button>
              <div className="flex gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = currentPage > 3 ? currentPage - 2 + i : i + 1;
                  return pageNum <= totalPages ? (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-3 py-2 rounded text-sm font-medium ${
                        currentPage === pageNum
                          ? 'bg-[#1594a2] text-white'
                          : 'border border-gray-300 hover:bg-gray-100'
                      }`}
                    >
                      {pageNum}
                    </button>
                  ) : null;
                })}
              </div>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border border-gray-300 rounded text-sm font-medium hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Berikutnya
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
