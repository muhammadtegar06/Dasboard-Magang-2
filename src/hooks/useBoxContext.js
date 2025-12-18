import { useContext } from 'react';
import { BoxContext } from '../context/BoxContext';

/**
 * Custom hook untuk mengakses Box Context
 * @throws {Error} jika digunakan di luar BoxProvider
 * @returns {Object} Box context value
 */
export const useBoxContext = () => {
  const context = useContext(BoxContext);
  if (!context) {
    throw new Error('useBoxContext harus digunakan dalam BoxProvider');
  }
  return context;
};
