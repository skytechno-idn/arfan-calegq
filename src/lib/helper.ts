
export function capitalize(str: any) {
    if (typeof str !== "string") {
      return "";
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  export function lowercase(str: any) {
    if (typeof str !== "string") {
      return "";
    }
    return str.toLowerCase();
  }
  
  export function isObjectEmpty(obj: object) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false; // The object is not empty
      }
    }
    return true; // The object is empty
  }
  
  export function ArrayUnique(array: any[]) {
    if (!Array.isArray(array)) {
      throw new Error("Input harus berupa array");
    }
  
    // Buat objek Set untuk menyimpan nilai unik
    const uniqueSet = new Set();
  
    // Filter nilai yang unik
    const uniqueArray = array.filter((item) => {
      // Nilai null diabaikan, karena null akan dianggap sama oleh Set
      if (item === null) {
        return true;
      }
      // Jika nilai belum ada di Set, tambahkan dan kembalikan true
      if (!uniqueSet.has(item)) {
        uniqueSet.add(item);
        return true;
      }
      // Jika nilai sudah ada di Set, kembalikan false
      return false;
    });
  
    return uniqueArray;
  }
  
  export function getFileNameFormat(fileName: any) {
    const match = fileName?.match(/\.(\w+)$/);
    return match ? match[1] : null;
  }
  
  export function cutText(text: string, cut: number = 80) {
    if (text?.length > cut) {
      return text.slice(0, cut) + "...";
    }
    return text;
  }
  


  export function formatRibuan(angka: number) {
    return angka.toLocaleString('id-ID');
  }
  
  
  