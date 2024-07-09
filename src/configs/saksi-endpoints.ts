const BASE_API_URL = "http://103.127.135.192:9001/api/v1";

const GET_MYTPS = BASE_API_URL + "/tps/by-saksi";
const GET_PARTAI = BASE_API_URL + "/partai/by-saksi";
const GET_SUARA = BASE_API_URL + "/data-suara/by-saksi/by-tps";
const AUTH = {
  LOGIN: BASE_API_URL + "/auth/saksi/signin",
};
export { GET_MYTPS, GET_PARTAI, AUTH, GET_SUARA, BASE_API_URL };
