import {ROLE, TOKEN, USER_ID} from "../consts/ApplicationConsts";

export const handleItemAccessAttempt = (history) => {
    const logout = () => {
        localStorage.clear();
        history.push('/login');
    }
    !isLogged() && logout();
}


export const isLogged = () => {
    return localStorage.getItem(USER_ID) !== null
        && localStorage.getItem(TOKEN) !== null
        && localStorage.getItem(ROLE) !== null
}
