const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

const ADMIN = BASE_API_URL + "/users/admin";

const SAKSI = {
  CREATE: `${BASE_API_URL}/users/saksi/create`,
  GET: `${BASE_API_URL}/users/saksi/get`,
  DELETE: `${BASE_API_URL}/users/saksi/delete`,
  UPDATE: `${BASE_API_URL}/users/saksi/update`,
  GET_KECAMATAN: `${BASE_API_URL}/users/saksi/get/all-kecamatan`,
  GET_TPS: `${BASE_API_URL}/tps/all`,
};

const AUTH = {
  LOGIN: BASE_API_URL + "/auth/admin/signin",
};
const TPS = {
  GET: `${BASE_API_URL}/tps/get`,
  DELETE: `${BASE_API_URL}/tps/destroy`,
  UPDATE: `${BASE_API_URL}/tps/modify`,
  CREATE: `${BASE_API_URL}/tps/create`,
  GET_DESA: `${BASE_API_URL}/tps/get/all-desa`,
};

const CALEG = {
  GET: `${BASE_API_URL}/caleg/get`,
  DELETE: `${BASE_API_URL}/caleg/destroy`,
  UPDATE: `${BASE_API_URL}/caleg/modify`,
  CREATE: `${BASE_API_URL}/caleg/create`,
};

const PARTAI = {
  GET: `${BASE_API_URL}/partai/get`,
  DELETE: `${BASE_API_URL}/partai/destroy`,
  UPDATE: `${BASE_API_URL}/partai/modify`,
  CREATE: `${BASE_API_URL}/partai/create`,
};

const SUARA = {
  GET: `${BASE_API_URL}/data-suara/get`,
  DETAIL: `${BASE_API_URL}/data-suara/detail`,
  CONFIRM: `${BASE_API_URL}/data-suara/approved-or-rejected`,
  C1_PEVIEW: `${BASE_API_URL}/data-suara/privew-c1`,
};

const DASHBOARD = {
  KURSI: `${BASE_API_URL}/data-suara/akumulasi-suara`,
  SUARA_CALEG: `${BASE_API_URL}/data-suara/dashboard/hasil-caleg`,
  SUARA_PARTAI: `${BASE_API_URL}/data-suara/dashboard/hasil-partai`,
  SUARA_MAIN: `${BASE_API_URL}/data-suara/dashboard/hasil-main`,
};

const LOCATION = {
  KEC: `${BASE_API_URL}/data-suara/dashboard/get-kecamatan`,
  DESA: `${BASE_API_URL}/data-suara/dashboard/get-desa?id_kecamatan=`,
  TPS: `${BASE_API_URL}/data-suara/dashboard/get-tps?id_desa=`,
};

export {
  LOCATION,
  ADMIN,
  SAKSI,
  DASHBOARD,
  CALEG,
  AUTH,
  BASE_API_URL,
  TPS,
  PARTAI,
  SUARA,
};
