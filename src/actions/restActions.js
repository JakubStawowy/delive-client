import axios from 'axios';

import {
    ADD_DELIVERY_ANNOUNCEMENT_URL,
    ADD_NORMAL_ANNOUNCEMENT_URL, GET_DELIVERY_ANNOUNCEMENTS_URL, GET_HALFWAY_POINT_URL, GET_NORMAL_ANNOUNCEMENTS_URL,
    LOGIN_USER_URL,
    LOGOUT_USER_URL,
    REGISTER_USER_URL,
    VALIDATE_EMAIL_URL,
    VALIDATE_NICKNAME_URL
} from "../consts/UrlConsts";
import {TOKEN} from "../consts/ApplicationConsts";

export const registerUser = (data) => axios.post(REGISTER_USER_URL, data);
export const checkIfEmailExists = (email) => axios.get(VALIDATE_EMAIL_URL.replace(':email', email));
export const checkIfNicknameExists = (nickname) => axios.get(VALIDATE_NICKNAME_URL.replace(':nickname', nickname));
export const loginUser = (data) => axios.post(LOGIN_USER_URL.replace(':email', data.email).replace(':password', data.password));
export const logoutUser = (data) => axios.put(LOGOUT_USER_URL.replace(':id', data.id), null, getConfig());
export const addNormalAnnouncement = (data) => axios.post(ADD_NORMAL_ANNOUNCEMENT_URL, data, getConfig());
export const addDeliveryAnnouncement = (data) => axios.post(ADD_DELIVERY_ANNOUNCEMENT_URL, data, getConfig());
export const getNormalAnnouncements = () => axios.get(GET_NORMAL_ANNOUNCEMENTS_URL, getConfig());
export const getDeliveryAnnouncements = () => axios.get(GET_DELIVERY_ANNOUNCEMENTS_URL, getConfig());
export const getHalfwayPoint = (data) => axios.get(
    GET_HALFWAY_POINT_URL
        .replace(":fromLatitude", data.fromLatitude)
        .replace(":toLatitude", data.toLatitude)
        .replace(":fromLongitude", data.fromLongitude)
        .replace(":toLongitude", data.toLongitude)
        .replace(":mapWidth", data.mapWidth)
    , getConfig());
const getConfig = () => {
    return {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)
        }
    };
}
