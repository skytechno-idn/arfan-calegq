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

export function generateColors(numColors) {
  let red = Math.floor((numColors / 126) * 255);
  let green = 255 - red;

  // Mengonversi nilai merah dan hijau ke format hex
  let redHex = red.toString(16).padStart(2, "0");
  let greenHex = green.toString(16).padStart(2, "0");

  // Menggabungkan nilai hex untuk mendapatkan warna
  let colorHex = `#${redHex}${greenHex}00`; // Format: #RRGGBB

  return colorHex.toUpperCase();
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
  if (typeof angka === "number") {
    return angka.toLocaleString("id-ID");
  }
  return isNaN(angka) ? 0 : angka;
}

export function padNumber(num) {
  if (typeof num === "number") {
    return num.toString().padStart(3, "0");
  }

  return num;
}

export function groupPartaiCaleg(data) {
  const groupedByPartai = {};

  // Mengelompokkan data berdasarkan id_partai
  data?.forEach((item) => {
    const id_partai = item.caleg.id_partai;

    if (!groupedByPartai[id_partai]) {
      groupedByPartai[id_partai] = {
        jumlah_total_suara_caleg: 0,
        caleg: {}
      };
    }

    // Menambahkan suara caleg ke dalam total suara partai
    groupedByPartai[id_partai].jumlah_total_suara_caleg += item.jml_suara;

    // Memasukkan data caleg ke dalam struktur grup partai
    if (!groupedByPartai[id_partai].caleg[item.id_caleg]) {
      groupedByPartai[id_partai].caleg[item.id_caleg] = {
        nama_caleg: item.caleg.nama_caleg,
        nomor_urut: item.caleg.nomor_urut,
        jml_suara: item.jml_suara
      };
    } else {
      groupedByPartai[id_partai].caleg[item.id_caleg].jml_suara += item.jml_suara;
    }
  });

  return groupedByPartai;
}


export function getPartyInfo(id) {
  let partyInfo : any = {};

  switch (id) {
    case 1:
      partyInfo = {
        logo: '/images/partai/pkb.png',
        label: 'PKB',
        nama: 'Partai Kebangkitan Bangsa',
        color: '#01754b'
      };
      break;
    case 2:
      partyInfo = {
        logo: '/images/partai/gerindra.png',
        label: 'GERINDRA',
        nama: 'Partai Gerakan Indonesia Raya',
        color: '#900'
      };
      break;
    case 3:
      partyInfo = {
        logo: '/images/partai/pdi.png',
        label: 'PDIP',
        nama: 'Partai Demokrasi Indonesia Perjuangan',
        color: '#E30613'
      };
      break;
    case 4:
      partyInfo = {
        logo: '/images/partai/golkar.png',
        label: 'GOLKAR',
        nama: 'Partai Golongan Karya',
        color: '#FFCC00'
      };
      break;
    case 5:
      partyInfo = {
        logo: '/images/partai/nasdem.png',
        label: 'NASDEM',
        nama: 'Partai NasDem',
        color: '#002f79'
      };
      break;
    case 6:
      partyInfo = {
        logo: '/images/partai/buruh.png',
        label: 'BURUH',
        nama: 'Partai Buruh',
        color: '#f60'
      };
      break;
    case 7:
      partyInfo = {
        logo: '/images/partai/gelora.png',
        label: 'GELORA',
        nama: 'Partai Gelombang Rakyat Indonesia',
        color: '#025599'
      };
      break;
    case 8:
      partyInfo = {
        logo: '/images/partai/pks.png',
        label: 'PKS',
        nama: 'Partai Keadilan Sejahtera',
        color: '#ff5001'
      };
      break;
    case 9:
      partyInfo = {
        logo: '/images/partai/pkn.png',
        label: 'PKN',
        nama: 'Partai Kebangkitan Nusantara',
        color: '#ff2121'
      };
      break;
    case 10:
      partyInfo = {
        logo: '/images/partai/hanura.png',
        label: 'HANURA',
        nama: 'Partai Hati Nurani Rakyat',
        color: '#e62129'
      };
      break;
    case 11:
      partyInfo = {
        logo: '/images/partai/garuda.png',
        label: 'GARUDA',
        nama: 'Partai Garuda',
        color: '#122138'
      };
      break;
    case 12:
      partyInfo = {
        logo: '/images/partai/pan.png',
        label: 'PAN',
        nama: 'Partai Amanat Nasional',
        color: '#063A94'
      };
      break;
    case 13:
      partyInfo = {
        logo: '/images/partai/pbb.png',
        label: 'PBB',
        nama: 'Partai Bulan Bintang',
        color: '#0f6e43'
      };
      break;
    case 14:
      partyInfo = {
        logo: '/images/partai/demokrat.png',
        label: 'DEMOKRAT',
        nama: 'Partai Demokrat',
        color: '#1E90FF'
      };
      break;
    case 15:
      partyInfo = {
        logo: '/images/partai/psi.png',
        label: 'PSI',
        nama: 'Partai Solidaritas Indonesia',
        color: '#B71C1C'
      };
      break;
    case 16:
      partyInfo = {
        logo: '/images/partai/perindo.png',
        label: 'PERINDO',
        nama: 'PARTAI PERINDO',
        color: '#1e247b'
      };
      break;
    case 17:
      partyInfo = {
        logo: '/images/partai/ppp.png',
        label: 'PPP',
        nama: 'Partai Persatuan Pembangunan',
        color: '#010101'
      };
      break;
    case 24:
      partyInfo = {
        logo: '/images/partai/ummat.png',
        label: 'UMMAT',
        nama: 'Partai Ummat',
        color: '#dbaa29'
      };
      break;
    default:
      break;
  }

  return partyInfo;
}
