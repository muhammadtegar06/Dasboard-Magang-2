export const COLORS = {
  primary: '#1594a2',   // Biru Laut
  secondary: '#b6d250', // Hijau Pupus
  dark: '#0c616a',      // Teal Gelap
  light: '#f3f4f6',     // Abu-abu
  white: '#ffffff',
  warning: '#f59e0b',
  danger: '#ef4444'
};

export const DIVISI_LIST = [
  { code: 'DSPN', name: 'DSPN - Divisi Sekretariat Perusahaan' },
  { code: 'DTPI', name: 'DTPI - Divisi Satuan Pengawasan Intern' },
  { code: 'DTAN', name: 'DTAN - Divisi Tanaman' },
  { code: 'DTPL', name: 'DTPL - Divisi Teknik & Pengolahan' },
  { code: 'DINF', name: 'DINF - Divisi Infrastruktur' },
  { code: 'DITN', name: 'DITN - Divisi Investasi Tanaman' },
  { code: 'DPSN', name: 'DPSN - Divisi Pemasaran' },
  { code: 'DRPL', name: 'DRPL - Divisi Rantai Pasok & Logistik' },
  { code: 'DPEN', name: 'DPEN - Divisi Pengadaan' },
  { code: 'DSKP', name: 'DSKP - Divisi Strategi Perusahaan & Pengendalian Kinerja' },
  { code: 'DSMS', name: 'DSMS - Divisi Sistem Manajemen & Sustainability' },
  { code: 'DRPH', name: 'DRPH - Divisi Riset, Pengembangan Bisnis & Hilirisasi' },
  { code: 'DKSH', name: 'DKSH - Divisi Keuangan Strategis & Hubungan Investor' },
  { code: 'DPBA', name: 'DPBA - Divisi Perbendaharaan & Anggaran' },
  { code: 'DAPN', name: 'DAPN - Divisi Akuntansi & Perpajakan' },
  { code: 'DMRS', name: 'DMRS - Divisi Manajemen Risiko' },
  { code: 'DPSB', name: 'DPSB - Divisi Pengembangan SDM & Budaya' },
  { code: 'DSDM', name: 'DSDM - Divisi Operasional SDM' },
  { code: 'DHPU', name: 'DHPU - Divisi HPS & Umum' },
  { code: 'DTIS', name: 'DTIS - Divisi Teknologi Informasi' },
  { code: 'DHKT', name: 'DHKT - Divisi Hubungan Kelembagaan & TJSL' },
  { code: 'DHKM', name: 'DHKM - Divisi Hukum' },
  { code: 'DPSR', name: 'DPSR - Divisi PSR & Plasma' },
  { code: 'DPMO', name: 'DPMO - Project Management Office' }
];

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
