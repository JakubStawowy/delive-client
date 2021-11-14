import axios from 'axios';

import {
    ADD_NORMAL_ANNOUNCEMENT_URL,
    CHANGE_DELIVERY_STATE_URL,
    DELETE_ANNOUNCEMENT_URL, FILTER_ANNOUNCEMENTS_URL,
    FINISH_DELIVERY_URL,
    GET_ANNOUNCEMENT_URL,
    GET_HALFWAY_POINT_URL,
    GET_LOGGED_USER_ID_URL,
    GET_NEXT_ACTION_NAME_URL,
    GET_NORMAL_ANNOUNCEMENTS_URL,
    GET_REVERSE_GEOCODE_URL,
    LOAD_DELIVERY_BY_DELIVERER_URL,
    LOAD_DELIVERY_BY_PRINCIPAL_URL,
    LOAD_FEEDBACK_URL,
    LOAD_LOGGED_USER_URL,
    LOAD_MESSAGES_RECEIVED_URL,
    LOAD_MESSAGES_SENT_URL,
    LOAD_USER_URL,
    LOGIN_USER_URL,
    LOGOUT_USER_URL,
    REGISTER_MESSAGE_NORMAL_URL,
    REGISTER_USER_URL,
    REPLY_MESSAGE_URL, SEND_FEEDBACK_URL,
    VALIDATE_EMAIL_URL,
    VALIDATE_NICKNAME_URL
} from "./urlConsts";
import {TOKEN} from "../consts/applicationConsts";
import {
    PARAM_ANNOUNCEMENT_ID,
    PARAM_DELIVERY_ID,
    PARAM_FROM_LATITUDE, PARAM_FROM_LONGITUDE,
    PARAM_TO_LATITUDE, PARAM_TO_LONGITUDE,
    PARAM_USER_ID
} from "./parametersConsts";

export const registerUser = (data) => axios.post(REGISTER_USER_URL, data);
export const checkIfEmailExists = (email) => axios.get(VALIDATE_EMAIL_URL.replace(':email', email));
export const checkIfNicknameExists = (nickname) => axios.get(VALIDATE_NICKNAME_URL.replace(':nickname', nickname));
export const loginUser = (data) => axios.post(LOGIN_USER_URL.replace(':email', data.email).replace(':password', data.password));
export const logoutUser = () => axios.put(LOGOUT_USER_URL, null, getConfig());
export const addNormalAnnouncement = (data) => axios.post(ADD_NORMAL_ANNOUNCEMENT_URL, data, getConfig());
export const getNormalAnnouncements = () => axios.get(GET_NORMAL_ANNOUNCEMENTS_URL, getConfig());
export const getHalfwayPoint = (data) => axios.get(
    GET_HALFWAY_POINT_URL
        .replace(PARAM_FROM_LATITUDE, data.fromLatitude)
        .replace(PARAM_TO_LATITUDE, data.toLatitude)
        .replace(PARAM_FROM_LONGITUDE, data.fromLongitude)
        .replace(PARAM_TO_LONGITUDE, data.toLongitude)
        .replace(":mapWidth", data.mapWidth)
    , getConfig());
export const getMessagesSent = () => axios.get(LOAD_MESSAGES_SENT_URL, getConfig());
export const getMessagesReceived = () => axios.get(LOAD_MESSAGES_RECEIVED_URL, getConfig());
export const replyMessage = (data) => axios.post(REPLY_MESSAGE_URL, data, getConfig());
export const registerMessageNormal = (data) => axios.post(REGISTER_MESSAGE_NORMAL_URL, data, getConfig());
export const loadDeliveriesByDeliverer = () => axios.get(LOAD_DELIVERY_BY_DELIVERER_URL, getConfig());
export const loadDeliveriesByPrincipal = () => axios.get(LOAD_DELIVERY_BY_PRINCIPAL_URL, getConfig());

export const changeDeliveryState = (actionName, deliveryId, latitude = null, longitude = null) => {

    let url = CHANGE_DELIVERY_STATE_URL
        .replace(':actionName', actionName)
        .replace(PARAM_DELIVERY_ID, deliveryId);

    if (latitude !== null && longitude !== null) {
        url = url + "&clientLatitude=" + latitude + "&clientLongitude=" + longitude;
    }

    return axios.put(url, null, getConfig());
}

export const finishDelivery = (deliveryId, clientLongitude, clientLatitude) => axios.put(FINISH_DELIVERY_URL
    .replace(PARAM_DELIVERY_ID, deliveryId)
    .replace(':clientLongitude', clientLongitude)
    .replace(':clientLatitude', clientLatitude), null, getConfig());
export const loadUser = userId => axios.get(LOAD_USER_URL.replace(PARAM_USER_ID, userId), getConfig());
export const loadLoggedUser = () => axios.get(LOAD_LOGGED_USER_URL, getConfig());
export const loadFeedback = userId => axios.get(LOAD_FEEDBACK_URL.replace(PARAM_USER_ID, userId), getConfig());
export const sendFeedback = data => axios.post(SEND_FEEDBACK_URL, data, getConfig());
export const getAnnouncementById = announcementId => axios.get(GET_ANNOUNCEMENT_URL.replace(PARAM_ANNOUNCEMENT_ID, announcementId), getConfig());
export const getReverseGeocode = (longitude, latitude) => axios.get(GET_REVERSE_GEOCODE_URL
    .replace(":longitude", longitude).replace(":latitude", latitude), getConfig());

export const getNextActionName = (deliveryState, announcementAuthorId, delivererId) => axios.get(GET_NEXT_ACTION_NAME_URL
        .replace(":deliveryState", deliveryState)
    .replace(":announcementAuthorId", announcementAuthorId)
    .replace(":delivererId", delivererId),
    getConfig());

export const getLoggedUserId = () => axios.get(GET_LOGGED_USER_ID_URL, getConfig());
export const deleteAnnouncement = announcementId => axios.delete(DELETE_ANNOUNCEMENT_URL.replace(PARAM_ANNOUNCEMENT_ID, announcementId), getConfig());
export const getFilteredAnnouncements = (initialAddress, finalAddress, minimalSalary, requireTransportWithClient = '') => axios.get(FILTER_ANNOUNCEMENTS_URL
    .replace(':initialAddress', initialAddress)
    .replace(':finalAddress', finalAddress)
    .replace(':minimalSalary', minimalSalary)
    .replace(':requireTransportWithClient', requireTransportWithClient), getConfig());
const getConfig = () => {
    return {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)
        }
    };
}
