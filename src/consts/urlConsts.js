// const BASE_API_URL = 'http://localhost:8080/api';
// const BASE_API_URL = "http://192.168.0.115:8080/api";
// const BASE_API_URL = "http://192.168.2.103:8080/api";
const BASE_API_URL = "http://localhost:8080/api";
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
export const REGISTER_DELIVERY_URL = BASE_API_URL + "/delivery/register?userId=:userId&announcementId=:announcementId";
export const LOAD_MESSAGES_SENT_URL = BASE_API_URL + "/messages/sent?userId=:userId";
export const LOAD_MESSAGES_RECEIVED_URL = BASE_API_URL + "/messages/received?userId=:userId";
export const REPLY_MESSAGE_URL = BASE_API_URL + "/messages/reply";
export const REGISTER_MESSAGE_NORMAL_URL = BASE_API_URL + "/messages/register/normal";
export const REGISTER_MESSAGE_DELIVERY_URL = BASE_API_URL + "/messages/register/delivery";
export const LOAD_DELIVERY_BY_DELIVERER_URL = BASE_API_URL + "/delivery/deliverer?userId=:userId";
export const LOAD_DELIVERY_BY_PRINCIPAL_URL = BASE_API_URL + "/delivery/principal?userId=:userId";
export const CHANGE_DELIVERY_STATE_URL = BASE_API_URL + '/delivery/change?actionName=:actionName&deliveryId=:deliveryId';
export const LOAD_USER_URL = BASE_API_URL + '/users/details?userId=:userId';
export const LOAD_FEEDBACK_URL = BASE_API_URL + '/feedback/user?userId=:userId';
export const GET_ANNOUNCEMENT_URL = BASE_API_URL + '/announcements/announcement?announcementId=:announcementId';
export const GET_REVERSE_GEOCODE_URL = BASE_API_URL + '/geocode/reverse?longitude=:longitude&latitude=:latitude';
