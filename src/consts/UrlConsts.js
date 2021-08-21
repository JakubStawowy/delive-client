// const BASE_API_URL = 'http://localhost:8080/api';
// const BASE_API_URL = "http://192.168.0.115:8080/api";
const BASE_API_URL = "http://192.168.2.103:8080/api";
const BASE_ANNOUNCEMENTS_URL = BASE_API_URL + '/announcements';

export const REGISTER_USER_URL = BASE_API_URL + '/register';
export const LOGIN_USER_URL = BASE_API_URL + '/login?email=:email&password=:password';
export const LOGOUT_USER_URL = BASE_API_URL + '/logout?id=:id';
export const VALIDATE_EMAIL_URL = BASE_API_URL + '/validate/email?email=:email';
export const VALIDATE_NICKNAME_URL = BASE_API_URL + '/validate/nickname?nickname=:nickname';
export const ADD_NORMAL_ANNOUNCEMENT_URL = BASE_API_URL + '/announcements/normal/add';
export const ADD_DELIVERY_ANNOUNCEMENT_URL = BASE_API_URL + '/announcements/delivery/add';
export const GET_NORMAL_ANNOUNCEMENTS_URL = BASE_ANNOUNCEMENTS_URL + '/normal';
export const GET_DELIVERY_ANNOUNCEMENTS_URL = BASE_ANNOUNCEMENTS_URL + '/delivery';
export const GET_HALFWAY_POINT_URL = BASE_API_URL + "/maps/middle?fromLatitude=:fromLatitude&toLatitude=:toLatitude&fromLongitude=:fromLongitude&toLongitude=:toLongitude&mapWidth=:mapWidth";
