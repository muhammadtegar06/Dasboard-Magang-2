export const validateBoxForm = (formData) => {
  if (!formData.divisi) {
    return { valid: false, message: 'Mohon pilih Divisi Pemilik' };
  }
  if (!formData.lokasi_arsip) {
    return { valid: false, message: 'Mohon pilih Lokasi Arsip' };
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

export const validatePeriodeFormat = (periode) => {
  // Format yang diterima: V/2023, I/2023, II/2023, dsb
  // Pattern: [A-Z0-9]+/[0-9]{4}
  const periodePattern = /^[A-Z0-9]+\/\d{4}$/i;
  return periodePattern.test(periode);
};

