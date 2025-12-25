# 📖 Panduan Pengguna - INDOARSIP Repository Arsip

## 🎯 Daftar Isi
1. [Untuk User](#untuk-user)
2. [Untuk Admin](#untuk-admin)
3. [FAQ](#faq)

---

## 👤 Untuk User

### Login ke Sistem

1. Buka aplikasi di browser: `http://localhost:3003`
2. Masukkan kredensial:
   - **Username**: `user`
   - **Password**: `user`
3. Klik tombol **Login**
4. Anda akan diarahkan ke Dashboard

### Mengajukan Permintaan Surat Masuk

#### Step 1: Ke Menu Input Box
1. Di sidebar, klik **"Input Box Baru"**
2. Anda akan melihat form untuk mengajukan surat masuk

#### Step 2: Isi Data Divisi & Lokasi
- **Divisi**: Pilih divisi asal surat dari dropdown (24 opsi tersedia)
  - Contoh: DSPN, DTPI, DTAN, DHPU, etc.
- **Lokasi Arsip**: Pilih lokasi penyimpanan arsip
  - Saat ini: Head Office (HO)

#### Step 3: Tambah Bantex & Dokumen
1. Klik **"+ Tambah Bantex"** untuk membuat bantex baru
2. Isi **Nama Bantex** (contoh: "Laporan Q1 2023")
3. Klik **"Tambah Dokumen"** untuk menambah dokumen dalam bantex
4. Untuk setiap dokumen, isi:
   - **Nama Dokumen**: Nama file/dokumen (contoh: "Invoice Supplier")
   - **Periode**: Format `V/YYYY` (contoh: `I/2023`, `II/2023`, dst.)
5. Repeat untuk dokumen berikutnya
6. Klik **"Simpan Bantex"** saat selesai

**⚠️ Catatan Penting:**
- Setiap kotak dapat menampung maksimal 6 bantex
- Sistem otomatis akan membuat kotak baru jika bantex mencapai 6
- Periode harus format `V/YYYY` (V = nomor volume, YYYY = tahun)

#### Step 4: Preview & Konfirmasi
1. Klik **"Submit Arsip"**
2. Modal preview akan muncul menampilkan:
   - Divisi & Lokasi
   - Tanggal pengajuan
   - Daftar semua bantex & dokumen
   - **Total Bantex** dan **Total Box** (auto-calculated)
3. Periksa data dengan seksama
4. Jika ada kesalahan, klik **"Kembali Edit"** untuk memperbaiki
5. Jika sudah benar, klik **"Konfirmasi & Submit"**

#### Step 5: Status Pengajuan
1. Setelah submit, Anda otomatis diarahkan ke **"Data Surat Masuk"**
2. Cari pengajuan Anda (paling baru di atas)
3. Cek status:
   - 🟡 **PENDING**: Menunggu persetujuan admin
   - 🟢 **APPROVED**: Sudah disetujui, nomor kotak sudah ditentukan
   - 🔴 **REJECTED**: Ditolak, lihat catatan admin

### Memantau Status Pengajuan

1. Di Sidebar, klik **"Data Box Arsip"**
2. Anda akan melihat tabel dengan semua pengajuan Anda
3. Gunakan filter untuk mencari:
   - **Cari**: Cari berdasarkan nomor kotak atau divisi
   - **Dari Tanggal** - **Sampai Tanggal**: Filter berdasarkan range tanggal
   - **Periode (Tahun)**: Filter berdasarkan tahun dokumen
4. Halaman menampilkan:
   - Status setiap pengajuan
   - Nomor kotak (jika sudah approved)
   - Divisi & lokasi asal
   - Daftar dokumen
   - Jumlah bantex & box

---

## 👨‍💼 Untuk Admin

### Login ke Sistem

1. Buka aplikasi: `http://localhost:3003`
2. Masukkan kredensial admin:
   - **Username**: `administrator`
   - **Password**: `123`
3. Klik **Login**
4. Anda akan diarahkan ke Dashboard dengan akses admin

### Dashboard Admin

Di dashboard, Anda akan melihat:
- **Total Surat Masuk**: Jumlah semua pengajuan
- **Disetujui**: Jumlah yang sudah di-ACC
- **Menunggu ACC**: Jumlah yang masih pending (prioritas!)

### Memproses Pengajuan Surat

#### Step 1: Ke Menu Data Box Arsip
1. Di sidebar, klik **"Data Box Arsip"**
2. Anda akan melihat tabel dengan semua pengajuan

#### Step 2: Lihat Detail Pengajuan
Tabel menampilkan kolom:
- **No.**: Nomor urut
- **Status**: Status pengajuan (PENDING/APPROVED/REJECTED)
- **Nomor Kotak**: ID kotak (kosong jika belum di-ACC)
- **Tanggal Masuk**: Kapan surat diterima
- **Divisi**: Divisi asal surat
- **Dokumen**: Preview daftar dokumen
- **Bantex**: Jumlah bantex dalam pengajuan
- **Box**: Jumlah kotak (otomatis = bantex ÷ 6)

#### Step 3: Filter Data (Opsional)
Gunakan filter untuk memudahkan pencarian:
- **Cari**: Cari nomor kotak atau divisi
- **Dari Tanggal** - **Sampai Tanggal**: Filter tanggal pengajuan
- **Periode**: Filter berdasarkan tahun dokumen
- **Tampilkan**: Ubah jumlah data per halaman

#### Step 4: Setujui Pengajuan (ACC)
1. Temukan pengajuan dengan status **PENDING**
2. Klik tombol **"Setujui"** di kolom Aksi (paling kanan)
3. Dialog akan muncul meminta input:
   - **"Masukkan Nomor Kotak / RFID"**: 
     - Masukkan ID unik kotak (contoh: `RFID-001`, `BOX-2024-01`, dll.)
     - Atau scan RFID jika menggunakan hardware
4. Klik **OK** untuk menyimpan
5. Status berubah menjadi **APPROVED** ✅
6. Nomor kotak sekarang terlihat di tabel

#### Step 5: Monitoring
- Secara berkala cek tabel untuk lihat pengajuan baru
- Fokus pada pengajuan dengan status PENDING
- Gunakan filter periode untuk management arsip per tahun

### Best Practices untuk Admin

1. **Prioritas PENDING**: Selalu proses pengajuan PENDING lebih dulu
2. **Nomor Kotak Unik**: Pastikan setiap nomor kotak baru dan unik
3. **Batch Processing**: Jika banyak pengajuan, gunakan filter untuk group by divisi
4. **Record Keeping**: Catat nomor kotak yang sudah digunakan
5. **Quality Check**: 
   - Verifikasi divisi sudah benar
   - Cek bahwa jumlah bantex sesuai
   - Pastikan periode dokumen valid (format V/YYYY)

---

## ❓ FAQ

### Q1: Bagaimana format periode yang benar?
**A**: Format periode adalah `V/YYYY` dimana:
- `V` = Nomor volume/urut (I, II, III, IV, dst.)
- `YYYY` = Tahun (2023, 2024, dst.)

Contoh: `I/2023`, `II/2024`, `XII/2023`

### Q2: Apakah bisa mengedit pengajuan setelah submit?
**A**: Saat ini, untuk mengubah pengajuan, user harus:
1. Submit pengajuan baru dengan data yang benar
2. Hubungi admin untuk reject pengajuan lama

Di masa depan akan ada fitur edit.

### Q3: Berapa jumlah maksimal bantex per box?
**A**: Maksimal 6 bantex per box. Setelah mencapai 6, sistem otomatis membuat kotak baru.

Rumus: **Jumlah Box = CEIL(Jumlah Bantex ÷ 6)**

Contoh:
- 5 bantex = 1 box
- 6 bantex = 1 box
- 7 bantex = 2 box
- 12 bantex = 2 box
- 13 bantex = 3 box

### Q4: Bagaimana jika surat ditolak?
**A**: Admin bisa reject dengan memberikan alasan. User akan lihat status REJECTED dan catatan admin.

User harus submit ulang dengan data yang diperbaiki.

### Q5: Apakah perlu pencetakan bukti pengajuan?
**A**: Saat ini belum ada fitur print. Di masa depan akan ditambahkan:
- Print preview
- Export PDF
- Export Excel

### Q6: Bagaimana jika lupa username/password?
**A**: Hubungi admin sistem untuk reset password.

Username tidak bisa diubah (fixed oleh admin).

### Q7: Bisa akses dari berbagai device?
**A**: Ya! Aplikasi bisa diakses dari:
- Desktop (Windows, Mac, Linux)
- Tablet
- Smartphone (dengan responsive design)

### Q8: Apakah data ter-backup?
**A**: Saat ini data disimpan di memory aplikasi. Untuk production:
1. Data harus disimpan ke database server
2. Perlu backup reguler
3. Perlu disaster recovery plan

---

## 📞 Support & Feedback

Untuk pertanyaan atau masalah:
1. Hubungi admin sistem
2. Kirim email ke: [support-email]
3. Laporkan bug melalui: [issue-tracker]

---

**Last Updated**: December 2024
**Version**: 1.0.0
**Developer**: Muhammad Tegar
**Repository**: https://github.com/muhammadtegar06/Dasboard-Magang-2.git
