import { useState } from 'react';
import { INITIAL_BOXES } from '../constants/colors';
import { getCurrentDate } from '../utils/formatters';

const DEFAULT_BOXES = [
  {
    id: 1,
    tanggal: '2023-10-25',
    divisi: 'DHPU',
    asal_arsip: 'Gudang Lt. 2',
    dokumen: [
      { no: 1, nama: 'Laporan Keuangan Q1', periode: 'Jan 2023' },
      { no: 2, nama: 'Laporan Keuangan Q2', periode: 'Apr 2023' },
      { no: 3, nama: 'Audit Internal', periode: 'Jun 2023' },
      { no: 4, nama: 'Pajak Tahunan', periode: '2022' },
      { no: 5, nama: 'Rekap Absensi', periode: '2023' }
    ],
    jumlah_bantex: 5,
    keterangan: 'Box Penuh',
    status: 'approved',
    nomor_kotak: 'RFID-998821',
    admin_note: ''
  },
  {
    id: 2,
    tanggal: '2023-10-26',
    divisi: 'DSPN',
    asal_arsip: 'Ruang Meeting',
    dokumen: [
      { no: 1, nama: 'Project Alpha Docs', periode: 'Okt 2023' },
      { no: 2, nama: 'MoU Vendor', periode: 'Sep 2023' }
    ],
    jumlah_bantex: 2,
    keterangan: 'Box Sementara',
    status: 'pending',
    nomor_kotak: null,
    admin_note: ''
  }
];

export const useBoxes = () => {
  const [boxes, setBoxes] = useState(DEFAULT_BOXES);
  const [formData, setFormData] = useState({
    divisi: '',
    lokasi_arsip: '',
  });
  
  // Structure: Array of boxes, each box contains array of bantex items
  const [boxesData, setBoxesData] = useState([
    {
      box_number: 1,
      bantex_items: []
    }
  ]);
  const [currentBoxIndex, setCurrentBoxIndex] = useState(0);
  const [currentBantexForm, setCurrentBantexForm] = useState({
    nama_bantex: '',
    dokumen: [{ nama: '', periode: '' }]
  });

  // Bantex management methods
  const addDocToBantex = () => {
    setCurrentBantexForm({
      ...currentBantexForm,
      dokumen: [...currentBantexForm.dokumen, { nama: '', periode: '' }]
    });
  };

  const removeDocFromBantex = (index) => {
    if (currentBantexForm.dokumen.length > 1) {
      const newDocs = currentBantexForm.dokumen.filter((_, i) => i !== index);
      setCurrentBantexForm({
        ...currentBantexForm,
        dokumen: newDocs
      });
    }
  };

  const handleBantexDocChange = (index, field, value) => {
    const newDocs = [...currentBantexForm.dokumen];
    newDocs[index][field] = value;
    setCurrentBantexForm({
      ...currentBantexForm,
      dokumen: newDocs
    });
  };

  const saveBantex = () => {
    // Add bantex to current box
    const newBoxesData = [...boxesData];
    const currentBox = newBoxesData[currentBoxIndex];
    
    const newBantex = {
      bantex_number: currentBox.bantex_items.length + 1,
      nama_bantex: currentBantexForm.nama_bantex,
      dokumen: currentBantexForm.dokumen
    };
    
    currentBox.bantex_items.push(newBantex);
    
    // Check if box is full (6 bantex), create new box if needed
    if (currentBox.bantex_items.length >= 6) {
      newBoxesData.push({
        box_number: newBoxesData.length + 1,
        bantex_items: []
      });
      setCurrentBoxIndex(currentBoxIndex + 1);
    }
    
    setBoxesData(newBoxesData);
    setCurrentBantexForm({
      nama_bantex: '',
      dokumen: [{ nama: '', periode: '' }]
    });
  };

  const removeBantex = (bantexIndex) => {
    const newBoxesData = [...boxesData];
    const currentBox = newBoxesData[currentBoxIndex];
    currentBox.bantex_items = currentBox.bantex_items.filter((_, i) => i !== bantexIndex);
    setBoxesData(newBoxesData);
  };

  const getBantexCount = () => {
    return boxesData.reduce((total, box) => total + box.bantex_items.length, 0);
  };

  const getBoxCount = () => {
    return boxesData.filter(box => box.bantex_items.length > 0).length;
  };

  const resetForm = () => {
    setFormData({ divisi: '', lokasi_arsip: '' });
    setBoxesData([{ box_number: 1, bantex_items: [] }]);
    setCurrentBoxIndex(0);
    setCurrentBantexForm({
      nama_bantex: '',
      dokumen: [{ nama: '', periode: '' }]
    });
  };

  const submitBox = (newBox) => {
    setBoxes([newBox, ...boxes]);
    resetForm();
  };

  const approveBox = (id, nomor_kotak) => {
    const updatedBoxes = boxes.map((box) =>
      box.id === id ? { ...box, status: 'approved', nomor_kotak } : box
    );
    setBoxes(updatedBoxes);
  };

  const rejectBox = (id, reason) => {
    const updatedBoxes = boxes.map((box) =>
      box.id === id ? { ...box, status: 'rejected', admin_note: reason } : box
    );
    setBoxes(updatedBoxes);
  };

  return {
    boxes,
    formData,
    setFormData,
    boxesData,
    setBoxesData,
    currentBoxIndex,
    setCurrentBoxIndex,
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
    resetForm,
    approveBox,
    rejectBox
  };
};
