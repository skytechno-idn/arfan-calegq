const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

const GET_MYTPS = BASE_API_URL + "/tps/by-saksi";
const GET_PARTAI = BASE_API_URL + "/partai/by-saksi";
const GET_SUARA = BASE_API_URL + "/data-suara/by-saksi/by-tps";
const AUTH = {
  LOGIN: BASE_API_URL + "/auth/saksi/signin",
  PROFILE: BASE_API_URL + "/users/saksi/my-profile",
  CHANGE_PROFILE: BASE_API_URL +  "/users/saksi/change-profile",
  UPDATE_PASSWORD : BASE_API_URL +  "/users/saksi/change-password"
};
const SET_DRAFT_SUARA = BASE_API_URL + "/data-suara/save-draft/by-saksi/by-tps";
const SET_SUARA_RUSAK = BASE_API_URL + "/data-suara/by-saksi/by-tps";
const UPLOAD_c1 = BASE_API_URL + "/data-suara/upload/c1";
const SEND_TO_ADMIN = BASE_API_URL + "/data-suara/send-to-admin";

export {
  SEND_TO_ADMIN,
  UPLOAD_c1,
  GET_MYTPS,
  SET_DRAFT_SUARA,
  GET_PARTAI,
  AUTH,
  GET_SUARA,
  BASE_API_URL,
  SET_SUARA_RUSAK,
};
