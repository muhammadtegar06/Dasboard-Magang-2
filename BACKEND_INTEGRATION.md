# Backend API Integration Guide

## 📋 Overview

Panduan ini menjelaskan cara mengintegrasikan aplikasi React INDOARSIP dengan backend API.

## 🏗️ Struktur API yang Disarankan

### Base URL
```
https://your-api.com/api/v1
```

### Authentication Endpoints

#### POST `/auth/login`
Request:
```json
{
  "username": "administrator",
  "password": "123"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "token": "jwt-token-here",
    "user": {
      "id": 1,
      "username": "administrator",
      "role": "admin"
    }
  }
}
```

---

## 📦 Box Management Endpoints

### GET `/boxes`
Fetch semua box dengan pagination & filtering

Query Parameters:
- `page` (integer) - Page number (default: 1)
- `limit` (integer) - Items per page (default: 10)
- `status` (string) - Filter by status: approved, pending, rejected
- `search` (string) - Search by divisi or nomor_kotak

Response:
```json
{
  "success": true,
  "data": {
    "boxes": [...],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 50
    }
  }
}
```

### POST `/boxes`
Create box baru

Request:
```json
{
  "divisi": "DHPU",
  "asal_arsip": "Gudang Lt. 2",
  "keterangan": "Box Penuh",
  "dokumen": [
    {
      "nama": "Laporan Keuangan Q1",
      "periode": "Jan 2023"
    }
  ]
}
```

Response:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "tanggal": "2023-10-25",
    "divisi": "DHPU",
    "status": "pending",
    "nomor_kotak": null
  }
}
```

### GET `/boxes/:id`
Fetch detail box spesifik

Response:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "tanggal": "2023-10-25",
    "divisi": "DHPU",
    "asal_arsip": "Gudang Lt. 2",
    "dokumen": [...],
    "status": "pending",
    "nomor_kotak": null
  }
}
```

### PUT `/boxes/:id/approve`
Admin approves box & set nomor kotak

Request:
```json
{
  "nomor_kotak": "RFID-998821"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "status": "approved",
    "nomor_kotak": "RFID-998821"
  }
}
```

### PUT `/boxes/:id/reject`
Admin reject box

Request:
```json
{
  "reason": "Dokumen tidak lengkap"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "status": "rejected",
    "admin_note": "Dokumen tidak lengkap"
  }
}
```

### DELETE `/boxes/:id`
Delete box

Response:
```json
{
  "success": true,
  "message": "Box deleted successfully"
}
```

---

## 🔐 Authentication Flow

1. **Login**
   - Send POST `/auth/login` with credentials
   - Receive JWT token
   - Store token in localStorage or context

2. **API Requests**
   - Include token in Authorization header:
   ```
   Authorization: Bearer <jwt-token>
   ```

3. **Token Refresh** (optional)
   - Implement token refresh endpoint if needed
   - Handle 401 responses by refreshing token

---

## 📝 Implementation Example

### 1. Create API Service

```javascript
// src/services/api.js

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api/v1';

class ApiService {
  constructor() {
    this.token = localStorage.getItem('token');
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  getHeaders() {
    return {
      'Content-Type': 'application/json',
      ...(this.token && { 'Authorization': `Bearer ${this.token}` })
    };
  }

  async login(username, password) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ username, password })
    });
    
    if (!response.ok) throw new Error('Login failed');
    
    const data = await response.json();
    this.setToken(data.data.token);
    return data.data.user;
  }

  async getBoxes(page = 1, status = null) {
    const params = new URLSearchParams({ page });
    if (status) params.append('status', status);
    
    const response = await fetch(`${API_BASE_URL}/boxes?${params}`, {
      headers: this.getHeaders()
    });
    
    if (!response.ok) throw new Error('Failed to fetch boxes');
    return response.json();
  }

  async createBox(boxData) {
    const response = await fetch(`${API_BASE_URL}/boxes`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(boxData)
    });
    
    if (!response.ok) throw new Error('Failed to create box');
    return response.json();
  }

  async approveBox(id, nomorKotak) {
    const response = await fetch(`${API_BASE_URL}/boxes/${id}/approve`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify({ nomor_kotak: nomorKotak })
    });
    
    if (!response.ok) throw new Error('Failed to approve box');
    return response.json();
  }

  async rejectBox(id, reason) {
    const response = await fetch(`${API_BASE_URL}/boxes/${id}/reject`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify({ reason })
    });
    
    if (!response.ok) throw new Error('Failed to reject box');
    return response.json();
  }
}

export default new ApiService();
```

### 2. Integrate dengan Hook

```javascript
// src/hooks/useBoxesAPI.js

import { useState, useEffect } from 'react';
import ApiService from '../services/api';

export const useBoxesAPI = () => {
  const [boxes, setBoxes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBoxes = async (page = 1) => {
    setLoading(true);
    try {
      const response = await ApiService.getBoxes(page);
      setBoxes(response.data.boxes);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createBox = async (boxData) => {
    setLoading(true);
    try {
      const response = await ApiService.createBox(boxData);
      setBoxes([response.data, ...boxes]);
      setError(null);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const approveBox = async (id, nomorKotak) => {
    try {
      const response = await ApiService.approveBox(id, nomorKotak);
      setBoxes(boxes.map(b => b.id === id ? response.data : b));
      setError(null);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const rejectBox = async (id, reason) => {
    try {
      const response = await ApiService.rejectBox(id, reason);
      setBoxes(boxes.map(b => b.id === id ? response.data : b));
      setError(null);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return {
    boxes,
    loading,
    error,
    fetchBoxes,
    createBox,
    approveBox,
    rejectBox
  };
};
```

---

## 🚀 Environment Variables

Create `.env` file:
```
VITE_API_URL=http://localhost:3001/api/v1
VITE_APP_NAME=INDOARSIP
VITE_APP_VERSION=1.0.0
```

Access in code:
```javascript
const API_URL = import.meta.env.VITE_API_URL;
```

---

## ✅ Testing Tips

1. **Use Postman or Thunder Client** untuk test API endpoints
2. **Mock API responses** di development dengan MSW (Mock Service Worker)
3. **Error handling** - Handle network errors, validation errors, server errors
4. **Loading states** - Show loading spinners saat fetching data
5. **Token persistence** - Save token in localStorage untuk session persistence

---

## 📚 Resources

- [Fetch API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [Axios (Alternative to Fetch)](https://axios-http.com/)
- [React Query (Advanced Data Fetching)](https://tanstack.com/query/latest)
- [JWT Authentication](https://jwt.io/)
