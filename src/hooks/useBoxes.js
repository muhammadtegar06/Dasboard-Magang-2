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
    asal_arsip: '',
    keterangan: '',
    jumlah_bantex: 0
  });
  const [docItems, setDocItems] = useState([
    { no: 1, nama: '', periode: '' }
  ]);

  const handleDocChange = (index, field, value) => {
    const newDocs = [...docItems];
    newDocs[index][field] = value;
    setDocItems(newDocs);
  };

  const addDocRow = () => {
    setDocItems([...docItems, { no: docItems.length + 1, nama: '', periode: '' }]);
  };

  const removeDocRow = (index) => {
    if (docItems.length > 1) {
      const newDocs = docItems.filter((_, i) => i !== index).map((doc, i) => ({ ...doc, no: i + 1 }));
      setDocItems(newDocs);
    }
  };

  const submitBox = (newBox) => {
    setBoxes([newBox, ...boxes]);
    resetForm();
  };

  const resetForm = () => {
    setFormData({ divisi: '', asal_arsip: '', keterangan: '', jumlah_bantex: 0 });
    setDocItems([{ no: 1, nama: '', periode: '' }]);
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
    docItems,
    setDocItems,
    handleDocChange,
    addDocRow,
    removeDocRow,
    submitBox,
    resetForm,
    approveBox,
    rejectBox
  };
};
