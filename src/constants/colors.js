export const COLORS = {
  primary: '#1594a2',   // Biru Laut
  secondary: '#b6d250', // Hijau Pupus
  dark: '#0c616a',      // Teal Gelap
  light: '#f3f4f6',     // Abu-abu
  white: '#ffffff',
  warning: '#f59e0b',
  danger: '#ef4444'
};

export const INITIAL_BOXES = [
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
