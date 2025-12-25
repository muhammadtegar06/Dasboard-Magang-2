# 🧪 TESTING CHECKLIST - INDOARSIP System

Panduan testing lengkap untuk memastikan semua fitur berjalan dengan baik.

---

## ✅ Testing Phase 1: Login & Authentication

### Test Case 1.1: Login Sebagai User
```
STEP:
1. Buka http://localhost:3003
2. Username: user
3. Password: user
4. Click Login

EXPECTED RESULT:
✓ Diarahkan ke Dashboard
✓ Nama user terlihat di header/sidebar
✓ Sidebar menampilkan menu: Dashboard, Input Box Baru, Data Box Arsip
```

### Test Case 1.2: Login Sebagai Admin
```
STEP:
1. Buka http://localhost:3003
2. Username: administrator
3. Password: 123
4. Click Login

EXPECTED RESULT:
✓ Diarahkan ke Dashboard
✓ Nama "administrator" terlihat di header
✓ Sidebar menampilkan menu lengkap
```

### Test Case 1.3: Login Gagal (Wrong Password)
```
STEP:
1. Username: user
2. Password: salah
3. Click Login

EXPECTED RESULT:
✓ Alert error muncul
✓ Tetap di halaman login
```

### Test Case 1.4: Logout
```
STEP:
1. Login sebagai user
2. Klik tombol Logout (biasanya di header/sidebar)
3. Confirm logout

EXPECTED RESULT:
✓ Diarahkan ke halaman login
✓ Session cleared
```

---

## ✅ Testing Phase 2: Dashboard

### Test Case 2.1: Dashboard Display
```
STEP:
1. Login sebagai user/admin
2. Lihat Dashboard

EXPECTED RESULT:
✓ 3 stat cards muncul (Total, Approved, Pending)
✓ Angka stat cards sesuai dengan data
✓ Responsive di mobile (sidebar collapsed)
```

### Test Case 2.2: Navigation dari Dashboard
```
STEP:
1. Di Dashboard, klik tombol "Data Box Arsip" atau sidebar menu
2. Lakukan navigasi ke berbagai halaman

EXPECTED RESULT:
✓ Navigasi lancar tanpa error
✓ Data terpersist (tidak hilang saat pindah page)
```

---

## ✅ Testing Phase 3: Input Box Form

### Test Case 3.1: Form Validation - Empty Form
```
STEP:
1. Go to "Input Box Baru"
2. Click Submit tanpa isi data apapun

EXPECTED RESULT:
✓ Error messages muncul:
  - "Pilih divisi terlebih dahulu"
  - "Pilih lokasi arsip terlebih dahulu"
  - "Minimal 1 bantex harus ditambahkan"
✓ Form tidak ter-submit
```

### Test Case 3.2: Divisi Dropdown
```
STEP:
1. Go to "Input Box Baru"
2. Click dropdown Divisi
3. Lihat semua opsi

EXPECTED RESULT:
✓ 24 divisi options muncul (DSPN, DTPI, DTAN, DHPU, etc.)
✓ Bisa memilih salah satu
✓ Selected value muncul di input
```

### Test Case 3.3: Add Bantex
```
STEP:
1. Isi Divisi & Lokasi Arsip
2. Click "+ Tambah Bantex"
3. Form input bantex muncul

EXPECTED RESULT:
✓ Input field untuk Nama Bantex
✓ Input field untuk Dokumen (minimal 1)
✓ Tombol "+ Tambah Dokumen" visible
✓ Tombol "Simpan Bantex" dan "Batal" visible
```

### Test Case 3.4: Add Dokumen dalam Bantex
```
STEP:
1. Dalam form bantex, klik "+ Tambah Dokumen"
2. Setiap dokumen isi:
   - Nama Dokumen: "Laporan Keuangan"
   - Periode: "I/2023"
3. Repeat untuk dokumen kedua

EXPECTED RESULT:
✓ Dokumen baru ditambah di bawah
✓ Bisa delete dokumen dengan X button
✓ Bisa tambah multiple dokumen
```

### Test Case 3.5: Periode Format Validation
```
STEP:
1. Tambah dokumen
2. Periode: "2023" (format salah)
3. Try to save bantex

EXPECTED RESULT:
✓ Error: "Format periode harus V/YYYY (contoh: I/2023)"
✓ Input field berubah warna merah
✓ Tidak bisa save sampai format benar
```

### Test Case 3.6: Save Bantex
```
STEP:
1. Fill Nama Bantex: "Bantex 1"
2. Fill Dokumen:
   - Nama: "Invoice Supplier A"
   - Periode: "I/2023"
3. Click "Simpan Bantex"

EXPECTED RESULT:
✓ Form bantex hilang
✓ Bantex card muncul di section bawah dengan:
  - Nama bantex: "Bantex 1"
  - Dokumen list: "Invoice Supplier A (I/2023)"
  - Tombol X untuk delete
✓ Counter update: "Total Bantex: 1, Total Box: 1"
```

### Test Case 3.7: Max 6 Bantex per Box
```
STEP:
1. Add 6 bantex (masing-masing dengan 1 dokumen)
2. Setelah save bantex ke-6, check console log atau counter

EXPECTED RESULT:
✓ Counter: "Total Bantex: 6, Total Box: 1"
✓ Setelah bantex ke-7 added:
  - New box created automatically
  - Counter: "Total Bantex: 7, Total Box: 2"
```

### Test Case 3.8: Preview Modal
```
STEP:
1. Isi form dengan:
   - Divisi: DSPN
   - Lokasi: Head Office (HO)
   - 2-3 bantex dengan dokumen
2. Click "Submit Arsip"

EXPECTED RESULT:
✓ Modal dialog muncul dengan judul "Konfirmasi Data Surat Masuk"
✓ Preview menampilkan:
  - Info Pengajuan: Divisi, Lokasi, Tanggal, Total Bantex
  - Daftar Bantex dengan dokumen
  - Kalkulasi Box (dalam highlight box hijau)
✓ Tombol: "Kembali Edit" dan "Konfirmasi & Submit"
```

### Test Case 3.9: Edit dari Preview
```
STEP:
1. Lihat preview modal
2. Click "Kembali Edit"

EXPECTED RESULT:
✓ Modal ditutup
✓ Form masih ada dengan data yang diisi sebelumnya
✓ Bisa edit data lagi
```

### Test Case 3.10: Confirm Submit
```
STEP:
1. Lihat preview modal
2. Click "Konfirmasi & Submit"

EXPECTED RESULT:
✓ Alert success: "Data berhasil disubmit! Silakan lihat di Data Box Arsip..."
✓ Auto redirect ke "Data Box Arsip"
✓ Form di-reset
```

---

## ✅ Testing Phase 4: Data Box Arsip (User View)

### Test Case 4.1: Data Muncul Setelah Submit
```
STEP:
1. Submit form dari Test Case 3.10
2. Automatic redirect ke Data Box Arsip
3. Lihat tabel

EXPECTED RESULT:
✓ Data baru muncul di paling atas tabel (newest first)
✓ Status: 🟡 PENDING
✓ Nomor Kotak: empty (belum di-ACC)
✓ Divisi: sesuai yang diisi
✓ Bantex & Box count: sesuai calculation
```

### Test Case 4.2: Search Functionality
```
STEP:
1. Di "Data Box Arsip", input di field "Cari"
2. Type: "DSPN"
3. See results

EXPECTED RESULT:
✓ Tabel ter-filter hanya yang divisi-nya DSPN
✓ Real-time filtering (tidak perlu click button)
✓ Clear search, data kembali ke semua
```

### Test Case 4.3: Date Range Filter
```
STEP:
1. Click "Dari Tanggal" field
2. Pilih tanggal (contoh: 2024-12-01)
3. Click "Sampai Tanggal" field
4. Pilih tanggal (contoh: 2024-12-31)

EXPECTED RESULT:
✓ Tabel ter-filter hanya data dalam range tanggal
✓ Data di luar range tidak muncul
```

### Test Case 4.4: Periode (Year) Filter
```
STEP:
1. Click dropdown "Periode (Tahun)"
2. Lihat list opsi tahun (extracted dari dokumen period)
3. Select salah satu (contoh: 2023)

EXPECTED RESULT:
✓ Tabel menampilkan hanya data dengan dokumen tahun 2023
✓ Data dengan dokumen tahun lain ter-filter
```

### Test Case 4.5: Items Per Page
```
STEP:
1. Click dropdown "Tampilkan"
2. Select "25" (default 10)

EXPECTED RESULT:
✓ Tabel sekarang menampilkan 25 data per page
✓ Jika data < 25, pagination tidak muncul
```

### Test Case 4.6: Pagination
```
STEP:
1. Submit 15+ form untuk generate data
2. Set "Tampilkan: 10"
3. See pagination buttons

EXPECTED RESULT:
✓ Tombol "Sebelumnya", page numbers, "Berikutnya"
✓ Page 1 selected (highlighted dengan warna)
✓ Click page 2, data berubah
✓ Click "Berikutnya", page 2 selected
✓ Click "Sebelumnya", kembali ke page 1
```

---

## ✅ Testing Phase 5: Admin Approval

### Test Case 5.1: Login Sebagai Admin & Lihat Pending
```
STEP:
1. Logout dari user
2. Login as administrator
3. Go to "Data Box Arsip"
4. Lihat data dengan status PENDING

EXPECTED RESULT:
✓ Data PENDING terlihat
✓ Nomor Kotak column: empty
✓ Tombol "Setujui" visible di kolom Aksi
```

### Test Case 5.2: Approve Request dengan RFID
```
STEP:
1. Lihat data PENDING
2. Click tombol "Setujui"
3. Dialog prompt muncul: "Masukkan Nomor Kotak / RFID:"
4. Type: "RFID-001"
5. Click OK

EXPECTED RESULT:
✓ Dialog hilang
✓ Status berubah menjadi 🟢 APPROVED
✓ Nomor Kotak column menampilkan: "RFID-001" (highlighted)
✓ Row ter-update tanpa refresh page
```

### Test Case 5.3: Check Approved Data
```
STEP:
1. Lihat data yang baru di-approve
2. Klik row atau scroll untuk lihat detail

EXPECTED RESULT:
✓ Status: 🟢 APPROVED
✓ Nomor Kotak: RFID-001 (dengan styling highlight)
✓ Aksi column: "-" (selesai, tidak bisa diapprove lagi)
```

### Test Case 5.4: Filter Hanya PENDING
```
STEP:
1. Di Data Box Arsip (admin view)
2. Reset semua filter
3. Lihat berapa PENDING

EXPECTED RESULT:
✓ Bisa lihat berapa banyak PENDING requests
✓ Bisa prioritize berdasarkan tanggal
```

---

## ✅ Testing Phase 6: Data Integrity

### Test Case 6.1: Data Persists After Refresh
```
STEP:
1. Submit form, lihat di Data Box Arsip
2. Refresh page (F5 atau Ctrl+R)
3. Go back to Data Box Arsip

EXPECTED RESULT:
✓ Data masih ada
✓ Status masih PENDING
✓ Informasi lengkap intact

NOTE: Hanya berlaku untuk dalam-session. 
Setelah close browser data akan hilang (karena pakai state, bukan database)
```

### Test Case 6.2: Multiple Submissions
```
STEP:
1. Submit 3-5 different forms dengan divisi berbeda
2. Go to Data Box Arsip
3. Check all data

EXPECTED RESULT:
✓ Semua submission muncul
✓ Order: newest di atas
✓ Counter di dashboard update
```

---

## ✅ Testing Phase 7: Responsive Design

### Test Case 7.1: Desktop View
```
STEP:
1. Buka aplikasi di desktop browser
2. Lihat width 1920px atau lebih

EXPECTED RESULT:
✓ Sidebar visible di kiri (permanent)
✓ Layout 2-column (sidebar + content)
✓ Form & table properly sized
```

### Test Case 7.2: Tablet View
```
STEP:
1. Resize browser ke 768px width
2. Navigate through app

EXPECTED RESULT:
✓ Sidebar toggle button appear
✓ Click toggle, sidebar appear/disappear
✓ Content responsive
```

### Test Case 7.3: Mobile View
```
STEP:
1. Resize browser ke 320px (mobile)
2. Or use DevTools mobile emulation
3. Navigate through app

EXPECTED RESULT:
✓ Sidebar tidak visible (collapsed)
✓ Header ada dengan toggle button
✓ Form single column
✓ Table horizontal scroll (jika perlu)
✓ Tombol readable dan touchable
```

---

## ✅ Testing Phase 8: Error Handling

### Test Case 8.1: Incomplete Dokumen
```
STEP:
1. Bantex form, fill Nama Bantex: "Test"
2. Dokumen field: leave empty nama
3. Try to save

EXPECTED RESULT:
✓ Error: "Nama dokumen harus diisi"
✓ Cannot save until filled
```

### Test Case 8.2: Invalid Periode Format
```
STEP:
1. Bantex form, dokumen periode: "2024" (wrong format)
2. Try to save

EXPECTED RESULT:
✓ Error message appear
✓ Field highlighted red
✓ Hint: "Format periode harus V/YYYY (contoh: I/2023)"
```

### Test Case 8.3: Cancel Operations
```
STEP:
1. Bantex form, click "Batal"
2. Preview modal, click "Kembali Edit"

EXPECTED RESULT:
✓ Data preserved
✓ Can continue editing
```

---

## 🎯 FINAL VERIFICATION CHECKLIST

Before marking as production-ready:

### Functionality
- [ ] Login/Logout works
- [ ] Dashboard displays correct counts
- [ ] Form submission complete flow works
- [ ] Preview modal shows correct data
- [ ] Data shows in DataBoxView immediately after submit
- [ ] All filters work (search, date, periode)
- [ ] Pagination works
- [ ] Admin approval works
- [ ] Status updates reflect correctly

### Data Validation
- [ ] Form validation error messages display
- [ ] Periode format validation works (V/YYYY)
- [ ] Empty fields properly handled
- [ ] Data integrity maintained

### UI/UX
- [ ] All buttons clickable and functional
- [ ] Forms responsive on different screen sizes
- [ ] Sidebar toggle works on mobile
- [ ] Color scheme consistent (primary #1594a2, secondary #b6d250)
- [ ] Status badges colored correctly

### Performance
- [ ] Page loads within acceptable time
- [ ] No console errors
- [ ] Smooth navigation between pages
- [ ] Filter operations fast

### Mobile Responsiveness
- [ ] Desktop (1920px+): ✓
- [ ] Tablet (768px): ✓
- [ ] Mobile (320px): ✓

---

## 📝 Test Summary Report Template

```
Test Date: [DATE]
Tester: [NAME]
Environment: Development / Staging / Production

RESULTS:
Total Test Cases: 40+
Passed: ___
Failed: ___
Skipped: ___

CRITICAL ISSUES: ___
MAJOR ISSUES: ___
MINOR ISSUES: ___

Sign-off: _________________________ Date: _________
```

---

**Last Updated**: December 2024
**Version**: 1.0.0
