import React from 'react';
import { Package } from 'lucide-react';
import { COLORS } from '../../constants/colors';

export const LoginScreen = ({ username, password, onUsernameChange, onPasswordChange, onSubmit }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 font-sans">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md border-t-4" style={{ borderColor: COLORS.primary }}>
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 text-white shadow-lg" style={{ backgroundColor: COLORS.dark }}>
            <Package size={32} />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Sistem Repository Arsip</h1>
          <p className="text-gray-500 text-sm mt-2">Masuk untuk mengelola Box & Bantex</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1594a2]"
              value={username}
              onChange={onUsernameChange}
              placeholder="administrator / user"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1594a2]"
              value={password}
              onChange={onPasswordChange}
              placeholder="123 / user"
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:opacity-90 transition-opacity"
            style={{ backgroundColor: COLORS.primary }}
          >
            Login Sistem
          </button>
        </form>
        <div className="mt-4 text-center text-xs text-gray-400">
          Demo: Admin (administrator/123) | User (user/user)
        </div>
      </div>
    </div>
  );
};
