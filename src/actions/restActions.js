import axios from 'axios';

import {REGISTER_USER_URL, VALIDATE_EMAIL_URL, VALIDATE_NICKNAME_URL} from "../consts/UrlConsts";

export const registerUser = (data) => axios.post(REGISTER_USER_URL, data);
export const checkIfEmailExists = (email) => axios.get(VALIDATE_EMAIL_URL.replace(':email', email));
export const checkIfNicknameExists = (nickname) => axios.get(VALIDATE_NICKNAME_URL.replace(':nickname', nickname));
