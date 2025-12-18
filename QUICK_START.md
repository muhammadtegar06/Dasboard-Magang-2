# 🚀 Quick Start Guide - INDOARSIP React App

## Installation & Setup (2 menit)

### 1️⃣ Navigate to Project
```bash
cd "c:\Users\muham\Downloads\Kerja\PTPN IV\Dasboard\Newarsip"
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Start Development Server
```bash
npm run dev
```

### 4️⃣ Open Browser
```
http://localhost:3000
```

---

## 👤 Login Credentials

Choose one to login:

**Admin Account:**
```
Username: administrator
Password: 123
Role: Admin (dapat approve/reject boxes)
```

**User Account:**
```
Username: user
Password: user
Role: User (hanya bisa submit boxes)
```

---

## 📱 Navigation Guide

After login, you'll see the sidebar with three main sections:

### 1. **Dashboard** 📊
- View statistics: Total boxes, Approved count, Pending count
- See recent activity
- Click "Lihat Semua Data" to go to Data Box view

### 2. **Input Box Baru** ➕
- Fill box information (Divisi, Asal Arsip, Keterangan)
- Add documents with "Tambah Baris Dokumen" button
- Auto-calculates total Bantex
- Submit form with "Ajukan Box Sekarang" button

### 3. **Data Box Arsip** 📋
- View all submitted boxes
- Search by nomor kotak or divisi
- **Admin Only**: Approve or Reject boxes
  - Approve: Click "Input No. Kotak" and enter RFID number
  - Reject: Click red X button and enter reason

---

## 🎯 Common Tasks

### Task 1: Submit a New Box (As User)
1. Click "Input Box Baru" in sidebar
2. Fill "Asal Arsip" field (required)
3. Add documents:
   - Enter document name in "Nama Dokumen"
   - Enter period in "Periode" field
   - Click "Tambah Baris Dokumen" to add more
4. Click "Ajukan Box Sekarang"
5. Go to "Data Box Arsip" to see status (should be PENDING)

### Task 2: Approve a Box (As Admin)
1. Login with admin account
2. Click "Data Box Arsip" in sidebar
3. Find a PENDING box
4. Click "Input No. Kotak" button
5. Enter RFID number (e.g., RFID-999999)
6. Box status changes to APPROVED
7. Nomor Kotak is now visible

### Task 3: Reject a Box (As Admin)
1. Login with admin account
2. Click "Data Box Arsip"
3. Find a PENDING box
4. Click red X button
5. Enter rejection reason
6. Box status changes to REJECTED

### Task 4: Search Boxes
1. Go to "Data Box Arsip"
2. Use search bar at top right
3. Search by nomor kotak or divisi name
4. Results filter in real-time

---

## 📱 Mobile Features

- Tap menu button (☰) to toggle sidebar
- All features work on mobile
- Responsive form inputs
- Touch-friendly buttons

---

## 🐛 Troubleshooting

### Port 3000 Already in Use?
```bash
# Use different port
npm run dev -- --port 3001
```

### Dependencies Not Installing?
```bash
# Clear npm cache
npm cache clean --force
npm install
```

### CSS Not Loading?
```bash
# Rebuild CSS
npm run build
npm run preview
```

---

## 📁 Project Files to Know

```
src/
├── App.jsx              ← Main app component
├── components/          ← All UI components
│   ├── Auth/           ← Login screen
│   ├── Layout/         ← Sidebar & Header
│   ├── Dashboard/      ← Dashboard view
│   ├── Box/            ← Input & Data views
│   └── Common/         ← Reusable components
├── hooks/              ← Custom React hooks
├── constants/          ← Colors & mock data
└── utils/              ← Helper functions
```

---

## 🔌 Environment Variables (Optional)

Create `.env` file in root folder:
```env
VITE_API_URL=http://localhost:3001/api
VITE_APP_NAME=INDOARSIP
```

Access in code:
```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

---

## 🛠️ Build for Production

```bash
# Create optimized build
npm run build

# Preview production build
npm run preview
```

Output files will be in `dist/` folder.

---

## 📚 More Documentation

- **README.md** - Complete project documentation
- **BACKEND_INTEGRATION.md** - How to connect to backend API
- **TEST_CHECKLIST.md** - Testing procedures
- **COMPLETION_SUMMARY.md** - What was built

---

## ✨ Tips & Tricks

💡 **Form Validation**
- Required fields show error if empty
- Look for red outline on invalid inputs

💡 **Status Badges**
- 🟢 Green = APPROVED
- 🟡 Yellow = PENDING
- 🔴 Red = REJECTED

💡 **Bantex Count**
- Auto-calculates based on number of document rows
- Box is considered full at 5+ items

💡 **Admin Only**
- Only admins see approve/reject buttons
- Users can only submit and view their boxes

💡 **Real-time Update**
- All changes update immediately
- No page refresh needed

---

## 🎓 Code Examples

### Access data from a component:
```javascript
const { boxes, formData } = useBoxes();
```

### Add a new box:
```javascript
const newBox = {
  id: 1,
  tanggal: '2023-10-25',
  divisi: 'DHPU',
  // ... more fields
};
boxes.submitBox(newBox);
```

### Handle form change:
```javascript
const handleFormChange = (field, value) => {
  setFormData({...formData, [field]: value});
};
```

---

## ❓ FAQ

**Q: Can I change the colors?**  
A: Yes! Edit `src/constants/colors.js`

**Q: How do I add more documents?**  
A: Click "Tambah Baris Dokumen" button in Input Box form

**Q: Can I delete a submitted box?**  
A: Currently only admins can reject. To add delete, modify code in `DataBoxView.jsx`

**Q: How do I connect to a real database?**  
A: Follow `BACKEND_INTEGRATION.md` guide

---

## 🚀 Next Steps

1. ✅ Test all features using TEST_CHECKLIST.md
2. ✅ Connect to backend API using BACKEND_INTEGRATION.md
3. ✅ Deploy to production with `npm run build`
4. ✅ Add additional features as needed

---

**Happy coding! 🎉**

For issues or questions, check the documentation files in the project root.
