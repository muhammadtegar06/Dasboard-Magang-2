export const validateBoxForm = (formData) => {
  if (!formData.divisi) {
    return { valid: false, message: 'Mohon pilih Divisi Pemilik' };
  }
  if (!formData.asal_arsip) {
    return { valid: false, message: 'Mohon isi Asal Arsip' };
  }
  return { valid: true };
};

export const validateDocuments = (docItems) => {
  if (!docItems || docItems.length === 0) {
    return { valid: false, message: 'Minimal 1 dokumen harus diisi' };
  }
  
  for (let doc of docItems) {
    if (!doc.nama || !doc.periode) {
      return { valid: false, message: 'Semua dokumen harus memiliki nama dan periode' };
    }
  }
  
  return { valid: true };
};
