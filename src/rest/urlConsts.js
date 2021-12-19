import {
    ORDER_ID,
    DELIVERY_ID,
    FROM_LATITUDE,
    FROM_LONGITUDE, PARAM_ORDER_ID,
    PARAM_DELIVERY_ID,
    PARAM_FROM_LATITUDE,
    PARAM_FROM_LONGITUDE,
    PARAM_TO_LATITUDE,
    PARAM_TO_LONGITUDE,
    PARAM_USER_ID,
    TO_LATITUDE,
    TO_LONGITUDE,
    USER_ID
} from "./parametersConsts";

// export const BASE_URL = 'http://localhost:8080';
// export const BASE_URL = 'https://delive-server.herokuapp.com';
export const BASE_URL = 'https://delive-server-1.herokuapp.com';
// export const BASE_URL = "http://192.168.0.115:8080";
// export const BASE_URL = "http://192.168.2.105:8080";
const BASE_API_URL = BASE_URL + '/api';
const BASE_ORDERS_URL = BASE_API_URL + '/orders';

export const GET_LOGGED_USER_ID_URL = BASE_API_URL + "/userId";
export const REGISTER_USER_URL = BASE_API_URL + '/register';
export const LOGIN_USER_URL = BASE_API_URL + '/login?email=:email&password=:password';
export const LOGOUT_USER_URL = BASE_API_URL + '/logout';
export const VALIDATE_EMAIL_URL = BASE_API_URL + '/validate/email?email=:email';
export const VALIDATE_NICKNAME_URL = BASE_API_URL + '/validate/nickname?nickname=:nickname';
export const ADD_ORDER_URL = BASE_ORDERS_URL + '/normal/add';
export const GET_ORDERS_URL = BASE_ORDERS_URL + '/all';
export const GET_HALFWAY_POINT_URL = BASE_API_URL + "/maps/middle?" + FROM_LATITUDE +
    "=" + PARAM_FROM_LATITUDE + "&" + TO_LATITUDE + "=" + PARAM_TO_LATITUDE +
    "&" + FROM_LONGITUDE + "=" + PARAM_FROM_LONGITUDE + "&" + TO_LONGITUDE + "=" + PARAM_TO_LONGITUDE + "&mapWidth=:mapWidth&mapHeight=:mapHeight";
export const LOAD_MESSAGES_SENT_URL = BASE_API_URL + "/messages/sent";
export const LOAD_MESSAGES_RECEIVED_URL = BASE_API_URL + "/messages/received";
export const REPLY_MESSAGE_URL = BASE_API_URL + "/messages/reply";
export const REGISTER_MESSAGE_NORMAL_URL = BASE_API_URL + "/messages/register/normal";
export const LOAD_DELIVERY_BY_DELIVERER_URL = BASE_API_URL + "/delivery/deliverer";
export const LOAD_DELIVERY_BY_PRINCIPAL_URL = BASE_API_URL + "/delivery/principal";
export const CHANGE_DELIVERY_STATE_URL = BASE_API_URL + '/delivery/:actionName?' + DELIVERY_ID + '=' + PARAM_DELIVERY_ID;
export const FINISH_DELIVERY_URL = BASE_API_URL + '/delivery/finish?' + DELIVERY_ID + '=' + PARAM_DELIVERY_ID
    + '&clientLatitude=:clientLatitude&clientLongitude=:clientLongitude';
export const LOAD_USER_URL = BASE_API_URL + '/users/details?' + USER_ID + '=' + PARAM_USER_ID;
export const LOAD_LOGGED_USER_URL = BASE_API_URL + '/users/details/loggedUser';
export const LOAD_FEEDBACK_URL = BASE_API_URL + '/feedback/user?' + USER_ID + '=' + PARAM_USER_ID;
export const SEND_FEEDBACK_URL = BASE_API_URL + '/feedback/add';
export const GET_ORDER_URL = BASE_ORDERS_URL + '/order?' + ORDER_ID + '=' + PARAM_ORDER_ID;
export const GET_NEXT_ACTION_NAME_URL = BASE_API_URL + '/delivery/actionName?deliveryState=:deliveryState&orderAuthorId=:orderAuthorId&delivererId=:delivererId';
export const DELETE_ORDER_URL = BASE_ORDERS_URL + '/delete?' + ORDER_ID + '=' + PARAM_ORDER_ID;
export const FILTER_ORDERS_URL = BASE_ORDERS_URL + '/filtered?initialAddress=:initialAddress&' +
    'finalAddress=:finalAddress&minimalSalary=:minimalSalary&maxWeight=:maxWeight&requireTransportWithClient=:requireTransportWithClient' +
    '&sortBySalary=:sortBySalary&sortByWeight=:sortByWeight';
export const GET_PROPOSED_ADDRESSES_URL = BASE_API_URL + '/geocoding/list?address=:address';
export const EDIT_USER_URL = BASE_API_URL + '/users/edit';
