import React, { useState } from 'react';
import { Plus, XCircle, Send, Info, Package, ChevronDown } from 'lucide-react';
import { COLORS, DIVISI_LIST, LOKASI_ARSIP_LIST } from '../../constants/colors';
import { validateBoxForm, validateDocuments, validatePeriodeFormat } from '../../utils/validators';
import { getCurrentDate } from '../../utils/formatters';
import { useBoxes } from '../../hooks/useBoxes';

export default function InputBoxView({ onSubmitSuccess }) {
  const {
    formData,
    setFormData,
    boxesData,
    currentBoxIndex,
    currentBantexForm,
    setCurrentBantexForm,
    addDocToBantex,
    removeDocFromBantex,
    handleBantexDocChange,
    saveBantex,
    removeBantex,
    getBantexCount,
    getBoxCount,
    submitBox,
    resetForm
  } = useBoxes();

  const [showBantexForm, setShowBantexForm] = useState(false);
  const [errors, setErrors] = useState({});

  const currentBox = boxesData[currentBoxIndex];

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  // Handle document field changes
  const handleDocChange = (index, field, value) => {
    handleBantexDocChange(index, field, value);
    if (errors[`doc_${index}`]) {
      const newErrors = { ...errors };
      delete newErrors[`doc_${index}`];
      setErrors(newErrors);
    }
  };

  // Validate and save bantex
  const handleSaveBantex = () => {
    const newErrors = {};

    if (!currentBantexForm.nama_bantex.trim()) {
      newErrors.nama_bantex = 'Nama Bantex harus diisi';
    }

    // Validate documents
    for (let i = 0; i < currentBantexForm.dokumen.length; i++) {
      const doc = currentBantexForm.dokumen[i];
      if (!doc.nama.trim()) {
        newErrors[`doc_${i}_nama`] = 'Nama dokumen harus diisi';
      }
      if (!doc.periode.trim()) {
        newErrors[`doc_${i}_periode`] = 'Periode harus diisi';
      } else if (!validatePeriodeFormat(doc.periode)) {
        newErrors[`doc_${i}_periode`] = 'Format periode harus V/YYYY (contoh: I/2023)';
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    saveBantex();
    setShowBantexForm(false);
    setErrors({});
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!formData.divisi) {
      newErrors.divisi = 'Pilih divisi terlebih dahulu';
    }

    if (!formData.lokasi_arsip) {
      newErrors.lokasi_arsip = 'Pilih lokasi arsip terlebih dahulu';
    }

    if (getBantexCount() === 0) {
      newErrors.bantex = 'Minimal 1 bantex harus ditambahkan';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Create box data structure
    // Flatten bantex items to dokumen array
    const allDokumen = [];
    let totalBantex = 0;
    
    boxesData.forEach(box => {
      box.bantex_items.forEach(bantex => {
        totalBantex++;
        bantex.dokumen.forEach(doc => {
          allDokumen.push({
            nama: doc.nama,
            periode: doc.periode,
            bantex_no: totalBantex
          });
        });
      });
    });

    const newBox = {
      id: Date.now(),
      tanggal: getCurrentDate(),
      divisi: formData.divisi,
      asal_arsip: formData.lokasi_arsip,
      lokasi_arsip: formData.lokasi_arsip,
      dokumen: allDokumen,
      jumlah_bantex: getBantexCount(),
      jumlah_box: Math.ceil(getBantexCount() / 6),
      keterangan: 'Baru disubmit',
      status: 'pending',
      nomor_kotak: null,
      admin_note: ''
    };

    submitBox(newBox);
    alert('Data berhasil disubmit! Silakan lihat di Data Box Arsip untuk konfirmasi admin.');
    
    // Redirect to data box view
    if (onSubmitSuccess) {
      setTimeout(() => onSubmitSuccess(), 500);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">repository arsip</h1>
          <p className="text-gray-600">Kelola dokumen dan bantex arsip dengan mudah</p>
        </div>

        {/* Main Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <form onSubmit={handleSubmit}>
            {/* Row 1: Divisi & Lokasi Arsip */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* Divisi */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Divisi <span className="text-red-500">*</span>
                </label>
                <select
                  name="divisi"
                  value={formData.divisi}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
                    errors.divisi
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-blue-500'
                  }`}
                >
                  <option value="">-- Pilih Divisi --</option>
                  {DIVISI_LIST.map((divisi) => (
                    <option key={divisi.code} value={divisi.code}>
                      {divisi.name}
                    </option>
                  ))}
                </select>
                {errors.divisi && <p className="text-red-500 text-xs mt-1">{errors.divisi}</p>}
              </div>

              {/* Lokasi Arsip */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Lokasi Arsip <span className="text-red-500">*</span>
                </label>
                <select
                  name="lokasi_arsip"
                  value={formData.lokasi_arsip}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
                    errors.lokasi_arsip
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-blue-500'
                  }`}
                >
                  <option value="">-- Pilih Lokasi --</option>
                  {LOKASI_ARSIP_LIST.map((lokasi) => (
                    <option key={lokasi.code} value={lokasi.code}>
                      {lokasi.name}
                    </option>
                  ))}
                </select>
                {errors.lokasi_arsip && (
                  <p className="text-red-500 text-xs mt-1">{errors.lokasi_arsip}</p>
                )}
              </div>
            </div>

            {/* Bantex Section */}
            <div className="mb-6 border-t pt-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800">Bantex & Dokumen</h2>
                <div className="flex items-center gap-4">
                  <div className="text-sm">
                    <p className="text-gray-600">
                      Total Bantex: <span className="font-bold text-blue-600">{getBantexCount()}</span>
                    </p>
                    <p className="text-gray-600">
                      Total Box: <span className="font-bold text-green-600">{getBoxCount()}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Current Box Display */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <h3 className="font-semibold text-gray-700 mb-3">
                  Box {currentBox.box_number} {currentBox.bantex_items.length >= 6 && '(Penuh)'}
                </h3>

                {currentBox.bantex_items.length > 0 ? (
                  <div className="space-y-3">
                    {currentBox.bantex_items.map((bantex, index) => (
                      <div key={index} className="bg-white p-3 rounded-lg border border-gray-200">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <p className="font-semibold text-gray-700 text-sm">
                              Bantex {bantex.bantex_number}: {bantex.nama_bantex}
                            </p>
                            <div className="mt-2 pl-3 border-l-2 border-gray-300">
                              {bantex.dokumen.map((doc, docIndex) => (
                                <p key={docIndex} className="text-xs text-gray-600 py-1">
                                  • {doc.nama} ({doc.periode})
                                </p>
                              ))}
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeBantex(index)}
                            className="text-red-500 hover:text-red-700 transition"
                          >
                            <XCircle size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm italic">Belum ada bantex ditambahkan</p>
                )}
              </div>

              {/* Button to add bantex */}
              {!showBantexForm && currentBox.bantex_items.length < 6 && (
                <button
                  type="button"
                  onClick={() => setShowBantexForm(true)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
                >
                  <Plus size={20} />
                  Tambah Bantex
                </button>
              )}

              {/* Bantex Form Modal */}
              {showBantexForm && (
                <div className="bg-gray-50 border border-gray-300 rounded-lg p-4 mt-4">
                  <h3 className="font-semibold text-gray-800 mb-4">Form Bantex Baru</h3>

                  {/* Nama Bantex */}
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nama Bantex <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={currentBantexForm.nama_bantex}
                      onChange={(e) => {
                        setCurrentBantexForm({ ...currentBantexForm, nama_bantex: e.target.value });
                        if (errors.nama_bantex) {
                          const newErrors = { ...errors };
                          delete newErrors.nama_bantex;
                          setErrors(newErrors);
                        }
                      }}
                      placeholder="Contoh: Bantex Kontrak 2023"
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
                        errors.nama_bantex
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-300 focus:ring-blue-500'
                      }`}
                    />
                    {errors.nama_bantex && (
                      <p className="text-red-500 text-xs mt-1">{errors.nama_bantex}</p>
                    )}
                  </div>

                  {/* Documents in Bantex */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <label className="block text-sm font-semibold text-gray-700">
                        Dokumen dalam Bantex <span className="text-red-500">*</span>
                      </label>
                      <button
                        type="button"
                        onClick={addDocToBantex}
                        className="flex items-center gap-1 text-xs px-2 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
                      >
                        <Plus size={14} /> Tambah Dokumen
                      </button>
                    </div>

                    <div className="space-y-3">
                      {currentBantexForm.dokumen.map((doc, index) => (
                        <div key={index} className="flex gap-2 items-start">
                          <input
                            type="text"
                            value={doc.nama}
                            onChange={(e) => handleDocChange(index, 'nama', e.target.value)}
                            placeholder="Nama dokumen"
                            className={`flex-1 px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 transition ${
                              errors[`doc_${index}_nama`]
                                ? 'border-red-500 focus:ring-red-500'
                                : 'border-gray-300 focus:ring-blue-500'
                            }`}
                          />
                          <input
                            type="text"
                            value={doc.periode}
                            onChange={(e) => handleDocChange(index, 'periode', e.target.value)}
                            placeholder="Periode (V/2023)"
                            className={`w-32 px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 transition ${
                              errors[`doc_${index}_periode`]
                                ? 'border-red-500 focus:ring-red-500'
                                : 'border-gray-300 focus:ring-blue-500'
                            }`}
                          />
                          {currentBantexForm.dokumen.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeDocFromBantex(index)}
                              className="text-red-500 hover:text-red-700 transition mt-1"
                            >
                              <XCircle size={18} />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Errors for documents */}
                    {currentBantexForm.dokumen.map((_, index) => (
                      <div key={index}>
                        {errors[`doc_${index}_nama`] && (
                          <p className="text-red-500 text-xs mt-1">{errors[`doc_${index}_nama`]}</p>
                        )}
                        {errors[`doc_${index}_periode`] && (
                          <p className="text-red-500 text-xs mt-1">{errors[`doc_${index}_periode`]}</p>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Form Actions */}
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={handleSaveBantex}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
                    >
                      <Send size={18} /> Simpan Bantex
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowBantexForm(false);
                        setErrors({});
                      }}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition font-semibold"
                    >
                      <XCircle size={18} /> Batal
                    </button>
                  </div>
                </div>
              )}

              {/* Error message for bantex */}
              {errors.bantex && <p className="text-red-500 text-sm mt-2">{errors.bantex}</p>}
            </div>

            {/* Submit Button */}
            <div className="flex gap-3 pt-4 border-t">
              <button
                type="submit"
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-bold text-lg"
              >
                <Send size={20} /> Submit Arsip
              </button>
              <button
                type="button"
                onClick={() => {
                  resetForm();
                  setShowBantexForm(false);
                  setErrors({});
                }}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition font-bold text-lg"
              >
                <XCircle size={20} /> Reset
              </button>
            </div>
          </form>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
          <Info size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-gray-700">
              <strong>Informasi:</strong> Setiap kotak dapat menampung hingga 6 bantex. Sistem akan secara otomatis membuat kotak baru ketika jumlah bantex mencapai 6.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}