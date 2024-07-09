const BASE_API_URL = "http://103.127.135.192:9001/api/v1";

const ADMIN = BASE_API_URL+"/users/admin";
const SAKSI = {
  GET:`${BASE_API_URL}/users/saksi/get`,
  DELETE:`${BASE_API_URL}/users/saksi/delete`,
  UPDATE:`${BASE_API_URL}/users/saksi/update`,
  GET_KECAMATAN:`${BASE_API_URL}/tps/get/all-kecamatan`,
  GET_TPS:`${BASE_API_URL}/tps/all`,
};

const AUTH = {
  LOGIN: BASE_API_URL+"/auth/admin/signin",
 

};
const TPS = {
  GET:`${BASE_API_URL}/tps/get`,
  DELETE:`${BASE_API_URL}/tps/destroy`,
  UPDATE:`${BASE_API_URL}/tps/modify`,
  CREATE:`${BASE_API_URL}/tps/create`,

};

const CALEG = {
  GET:`${BASE_API_URL}/caleg/get`,
  DELETE:`${BASE_API_URL}/caleg/destroy`,
  UPDATE:`${BASE_API_URL}/caleg/modify`,
  CREATE:`${BASE_API_URL}/caleg/create`,

};

const PARTAI = {
  GET:`${BASE_API_URL}/partai/get`,
  DELETE:`${BASE_API_URL}/partai/destroy`,
  UPDATE:`${BASE_API_URL}/partai/modify`,
  CREATE:`${BASE_API_URL}/partai/create`,

};





export { ADMIN, SAKSI, CALEG, AUTH, BASE_API_URL,TPS,PARTAI };
