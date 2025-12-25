# 📊 User & Admin Flow Guide

## 🎯 Bagian 1: USER - Mengajukan Surat Masuk

### Step 1: Login sebagai User
1. Buka aplikasi di http://localhost:3003
2. Login dengan credentials:
   - Username: `user`
   - Password: `user`
3. Akan masuk ke Dashboard view

### Step 2: Navigasi ke Input Box
1. Di sidebar, klik menu **"Input Box Baru"**
2. Form akan muncul untuk input data surat masuk

### Step 3: Isi Form Data
1. **Divisi**: Pilih dari dropdown (misal: DHPU, DSPN, DTAN, dll)
   - Ada 24 divisi PTPN IV yang tersedia
2. **Lokasi Arsip**: Pilih lokasi penyimpanan
   - Saat ini hanya "Head Office (HO)" yang tersedia

### Step 4: Tambah Bantex & Dokumen
1. Klik tombol **"+ Tambah Bantex"** 
2. Isi **Nama Bantex** (misal: "Bantex 1", "Dokumen Utama")
3. Klik **"+ Tambah Dokumen"** untuk setiap dokumen dalam bantex
4. Isi kolom dokumen:
   - **Nama Dokumen**: Nama file/dokumen (misal: "Laporan Keuangan Q1")
   - **Periode**: Format V/YYYY (misal: "I/2025", "II/2023")
   - Gunakan tombol `-` untuk hapus dokumen jika perlu
5. Klik **"Simpan Bantex"**

**Catatan**: Sistem otomatis menghitung:
- Jumlah total bantex
- Jumlah box (6 bantex = 1 box)

### Step 5: Review & Submit
1. Klik **"Submit Arsip"** 
2. Modal preview akan muncul menampilkan:
   - Ringkasan divisi dan lokasi
   - Daftar semua bantex dan dokumen
   - Total bantex dan total box
3. Review data sekali lagi
4. Klik **"Konfirmasi & Submit"** untuk submit
5. Akan auto-redirect ke Data Box view

---

## 👨‍💼 Bagian 2: ADMIN - Approve Surat Masuk

### Step 1: Login sebagai Admin
1. Buka aplikasi di http://localhost:3003
2. Login dengan credentials:
   - Username: `administrator`
   - Password: `123`
3. Akan masuk ke Dashboard view

### Step 2: Navigasi ke Data Box Arsip
1. Di sidebar, klik menu **"Data Box Arsip"** atau
2. Dari Dashboard, klik tombol **"Lihat Semua Data"**
3. View ini menampilkan semua surat masuk dari user

### Step 3: Review Data User
Tabel menampilkan:
- **No.**: Nomor urut
- **Status**: 
  - 🟡 PENDING (menunggu ACC admin)
  - ✅ APPROVED (sudah di-ACC)
  - ❌ REJECTED (ditolak)
- **Nomor Kotak**: RFID number (kosong untuk PENDING)
- **Tanggal Masuk**: Kapan data disubmit
- **Divisi**: Divisi yang mengirim
- **Dokumen**: List dokumen dengan periode
- **Bantex**: Jumlah bantex
- **Box**: Jumlah box (auto-calculated)

### Step 4: Filter Data (Optional)
Admin bisa memfilter data dengan:

1. **Cari**: Nomor kotak atau nama divisi
   - Ketik di field "Cari"
   
2. **Dari Tanggal - Sampai Tanggal**: Filter by date range
   - Pilih tanggal awal dan akhir
   
3. **Periode (Tahun)**: Filter by document year
   - Pilih tahun dari dropdown (extracted dari V/YYYY format)
   
4. **Tampilkan**: Items per page
   - Default: 10
   - Opsi: 10, 25, 50, 100

### Step 5: Approve Surat Masuk
1. Cari surat yang status PENDING
2. Klik tombol **"Setujui"** di kolom Aksi
3. Dialog akan muncul meminta **"Nomor Kotak / RFID"**
4. Masukkan nomor kotak (misal: "RFID-001", "BOX-DHPU-001")
5. Klik OK
6. Data akan update:
   - Status berubah dari PENDING → APPROVED
   - Nomor kotak ditampilkan
   - Warna badge berubah menjadi ✅ APPROVED

---

## 🔄 Workflow Diagram

```
USER FLOW:
┌─────────────────────────────────────┐
│   Login (user/user)                 │
└──────────────┬──────────────────────┘
               │
               ▼
       ┌───────────────────┐
       │   Dashboard       │
       └──────────┬────────┘
                  │
                  ▼
       ┌───────────────────────┐
       │   Input Box Baru      │
       │  - Select Divisi      │
       │  - Select Lokasi      │
       │  - Add Bantex & Docs  │
       └──────────┬────────────┘
                  │
                  ▼
       ┌───────────────────────┐
       │  Preview Modal        │
       │  - Review data        │
       │  - Check total boxes  │
       └──────────┬────────────┘
                  │
                  ▼
       ┌───────────────────────┐
       │  Submit ✓             │
       │  Auto-redirect        │
       └──────────┬────────────┘
                  │
                  ▼
       ┌─────────────────────────────┐
       │  Data Box View              │
       │  Status: PENDING ⏳         │
       │  (Waiting for admin approval)│
       └─────────────────────────────┘

─────────────────────────────────────────

ADMIN FLOW:
┌─────────────────────────────────────┐
│   Login (administrator/123)         │
└──────────────┬──────────────────────┘
               │
               ▼
       ┌───────────────────┐
       │   Dashboard       │
       └──────────┬────────┘
                  │
                  ▼
       ┌─────────────────────────────┐
       │  Data Box View              │
       │  See all user submissions   │
       │  Status: PENDING ⏳         │
       └──────────┬────────────────┘
                  │
       ┌──────────┴────────────┐
       │                       │
       ▼                       ▼
   ┌─────────────┐     ┌──────────────┐
   │  Filter     │     │  Find PENDING│
   │  (Optional) │     │  Submission  │
   └──────┬──────┘     └──────┬───────┘
          │                   │
          └─────────┬─────────┘
                    │
                    ▼
        ┌───────────────────────┐
        │  Click "Setujui"      │
        │  Input Nomor Kotak    │
        └──────────┬────────────┘
                   │
                   ▼
        ┌──────────────────────────┐
        │  Status: APPROVED ✓      │
        │  Nomor Kotak: RFID-001   │
        └──────────────────────────┘
```

---

## 📝 Data Format Reference

### Divisi Codes (24 options)
```
DSPN - Divisi Sumber Daya Manusia
DTPI - Divisi Transportasi Pipa
DTAN - Divisi Tanaman Industri
DHPU - Divisi Hasil Perkebunan Utama
... (dan 20 divisi lainnya)
```

### Periode Format
```
Format: V/YYYY
Contoh: 
  - I/2025    (Periode 1, Tahun 2025)
  - II/2025   (Periode 2, Tahun 2025)
  - III/2024  (Periode 3, Tahun 2024)
```

### Status Values
```
pending    - Menunggu approval dari admin
approved   - Sudah di-approve dan memiliki nomor kotak
rejected   - Ditolak oleh admin (jika ada feature reject)
```

---

## 🧪 Test Scenarios

### Scenario 1: User Submit & Admin Approve
1. ✅ User login
2. ✅ Isi form dengan data valid
3. ✅ Preview & submit
4. ✅ Check auto-redirect ke Data Box
5. ✅ Admin login
6. ✅ Lihat submission dengan status PENDING
7. ✅ Approve dengan nomor kotak
8. ✅ Verifikasi status berubah ke APPROVED

### Scenario 2: Filter & Search
1. ✅ Admin login
2. ✅ Go to Data Box view
3. ✅ Use search filter (cari divisi)
4. ✅ Use date range filter
5. ✅ Use periode/tahun filter
6. ✅ Combine multiple filters
7. ✅ Pagination (next/previous pages)

### Scenario 3: Form Validation
1. ✅ Try submit without divisi → Error message
2. ✅ Try submit without lokasi arsip → Error message
3. ✅ Try submit without bantex → Error message
4. ✅ Try invalid periode format → Error message
5. ✅ Fill all fields correctly → Success submit

---

## 🎨 Visual Indicators

**Status Badges:**
- 🟡 **PENDING**: Yellow - Menunggu approval
- ✅ **APPROVED**: Green - Sudah disetujui
- ❌ **REJECTED**: Red - Ditolak

**Color Scheme:**
- Primary: #1594a2 (Dark Teal) - Buttons, highlights
- Secondary: #b6d250 (Light Green) - Approve buttons
- Dark: #0c616a (Dark Teal) - Text, headers
- White: #ffffff - Backgrounds

---

## 💾 Data Storage

Semua data tersimpan di:
- **State Management**: React `useBoxes` hook
- **Data Structure**: Array of box objects
- **Persistence**: Currently in-memory (akan di-update dengan localStorage/database)

---

## 🔒 Access Control

### User Role
- Can: Submit new box requests
- Cannot: Approve requests, see admin-only actions
- View: Input form, Data Box (see own status)

### Admin Role
- Can: View all submissions, approve/reject requests, input nomor kotak
- Cannot: Submit new requests (unless also user)
- View: All data, Admin actions column

---

**Version**: 1.0.0
**Last Updated**: December 2025
