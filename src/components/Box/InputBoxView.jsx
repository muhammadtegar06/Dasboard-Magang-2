import React from 'react';
import { Plus, XCircle, Send, Info } from 'lucide-react';
import { COLORS } from '../../constants/colors';
import { validateBoxForm, validateDocuments } from '../../utils/validators';
import { getCurrentDate } from '../../utils/formatters';

export const InputBoxView = ({
  userRole,
  formData,
  docItems,
  onFormChange,
  onDocChange,
  onAddDocRow,
  onRemoveDocRow,
  onSubmit
}) => {
  const calculatedBantex = docItems.length;
  const isBoxFull = calculatedBantex >= 5;

  const handleSubmit = (e) => {
    e.preventDefault();

    const formValidation = validateBoxForm(formData);
    if (!formValidation.valid) {
      alert(formValidation.message);
      return;
    }

    const docsValidation = validateDocuments(docItems);
    if (!docsValidation.valid) {
      alert(docsValidation.message);
      return;
    }

    const newBox = {
      id: Math.floor(Math.random() * 10000),
      tanggal: getCurrentDate(),
      divisi: userRole === 'admin' ? 'Administrator' : formData.divisi || 'UMUM',
      asal_arsip: formData.asal_arsip,
      dokumen: docItems,
      jumlah_bantex: calculatedBantex,
      keterangan: formData.keterangan,
      status: 'pending',
      nomor_kotak: null,
      admin_note: ''
    };

    onSubmit(newBox);
    alert('Data Box berhasil diajukan. Menunggu Admin mengisi Nomor Kotak.');
  };

  return (
    <div className="max-w-5xl mx-auto animate-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center" style={{ backgroundColor: COLORS.primary }}>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Plus size={20} className="text-[#b6d250]" />
            Form Input Box & Bantex
          </h2>
          <span className="text-xs bg-white bg-opacity-20 text-white px-2 py-1 rounded">
            Divisi: {userRole === 'admin' ? 'Administrator' : formData.divisi || 'User Divisi'}
          </span>
        </div>

        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Bagian Header Box */}
            <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
              <h3 className="text-sm font-bold text-[#0c616a] uppercase mb-4 border-b border-gray-200 pb-2">A. Informasi Box</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Divisi Pemilik</label>
                  <input
                    type="text"
                    value={userRole === 'user' ? 'Divisi Anda' : formData.divisi}
                    onChange={(e) => userRole === 'admin' && onFormChange('divisi', e.target.value)}
                    disabled={userRole === 'user'}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Asal Arsip (Lokasi)</label>
                  <input
                    type="text"
                    required
                    value={formData.asal_arsip}
                    onChange={(e) => onFormChange('asal_arsip', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1594a2] focus:border-transparent"
                    placeholder="Contoh: Rak Gudang Lt. 2 / Lemari 3"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Keterangan Tambahan Box</label>
                  <input
                    type="text"
                    value={formData.keterangan}
                    onChange={(e) => onFormChange('keterangan', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1594a2] focus:border-transparent"
                    placeholder="Opsional: Keterangan isi box secara umum..."
                  />
                </div>
              </div>
            </div>

            {/* Bagian Detail Bantex */}
            <div>
              <div className="flex justify-between items-end mb-2 border-b border-gray-200 pb-2">
                <h3 className="text-sm font-bold text-[#0c616a] uppercase">B. Isi Dokumen (Bantex)</h3>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold px-2 py-1 rounded ${isBoxFull ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    Total Bantex: {calculatedBantex} {isBoxFull ? '(Box Penuh)' : '(Belum Penuh)'}
                  </span>
                  <span className="text-xs text-gray-400">*Idealnya 1 Box = 5-6 Bantex</span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase w-12">No</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Nama Dokumen</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase w-40">Periode</th>
                      <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase w-20">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {docItems.map((doc, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2 text-sm text-gray-500 text-center">{doc.no}</td>
                        <td className="px-4 py-2">
                          <input
                            type="text"
                            required
                            value={doc.nama}
                            onChange={(e) => onDocChange(index, 'nama', e.target.value)}
                            placeholder="Nama Dokumen / Bantex"
                            className="w-full border-0 border-b border-gray-200 focus:border-[#1594a2] focus:ring-0 text-sm px-0 bg-transparent"
                          />
                        </td>
                        <td className="px-4 py-2">
                          <input
                            type="text"
                            required
                            value={doc.periode}
                            onChange={(e) => onDocChange(index, 'periode', e.target.value)}
                            placeholder="Tahun/Bulan"
                            className="w-full border-0 border-b border-gray-200 focus:border-[#1594a2] focus:ring-0 text-sm px-0 bg-transparent"
                          />
                        </td>
                        <td className="px-4 py-2 text-center">
                          {docItems.length > 1 && (
                            <button type="button" onClick={() => onRemoveDocRow(index)} className="text-red-400 hover:text-red-600">
                              <XCircle size={16} />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="p-2 bg-gray-100 border-t border-gray-200">
                  <button type="button" onClick={onAddDocRow} className="text-xs flex items-center gap-1 text-[#1594a2] font-bold hover:underline">
                    <Plus size={14} /> Tambah Baris Dokumen
                  </button>
                </div>
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 p-4 rounded-md border border-blue-100 flex gap-3">
              <Info className="text-blue-500 mt-0.5 flex-shrink-0" size={20} />
              <div className="text-sm text-blue-800">
                <p className="font-bold">Informasi Alur:</p>
                <ul className="list-disc ml-4 mt-1 space-y-1 text-xs">
                  <li>Isi semua dokumen yang ada di dalam box ini.</li>
                  <li>Jika sudah mencapai 5-6 bantex, box dianggap penuh dan siap diajukan.</li>
                  <li>Setelah klik "Ajukan Box", data akan dikirim ke Admin.</li>
                  <li><strong>Nomor Kotak / RFID</strong> akan muncul setelah Admin melakukan ACC.</li>
                </ul>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="flex items-center gap-2 px-8 py-3 text-white rounded-lg hover:shadow-lg transition-all transform hover:-translate-y-0.5 font-bold"
                style={{ backgroundColor: COLORS.secondary }}
              >
                <Send size={18} />
                Ajukan Box Sekarang
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
