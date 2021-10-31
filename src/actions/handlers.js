import {ROLE, TOKEN} from "../consts/applicationConsts";


const logout = (history) => {
    localStorage.clear();
    history.push('/login');
}

export const handleItemAccessAttempt = history => {
    !isLogged() && logout(history);
}

export const isLogged = () => localStorage.getItem(TOKEN) !== null && localStorage.getItem(ROLE) !== null;

export const handleError = (error, history) => {
    if(error.response) {
        if (error.response.status === 500) {
            alert("Server error");
        }
        else if (error.response.status === 403) {
            alert("Session expired");
        }
        else alert(error);
    }
    else alert(error);
    logout(history);
}
