import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

/**
 * Custom hook untuk mengakses Auth Context
 * @throws {Error} jika digunakan di luar AuthProvider
 * @returns {Object} Auth context value
 */
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext harus digunakan dalam AuthProvider');
  }
  return context;
};
