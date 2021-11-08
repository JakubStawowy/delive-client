import {ROLE, TOKEN} from "../consts/applicationConsts";


const logout = (history, setLogged) => {
    localStorage.clear();
    setLogged(false);
    history.push('/login');
}

export const handleItemAccessAttempt = history => {
    !isLogged() && logout(history);
}

export const isLogged = () => localStorage.getItem(TOKEN) !== null && localStorage.getItem(ROLE) !== null;

export const handleError = (error, history, setLogged) => {
    if(error.response) {
        if (error.response.status === 500) {
            alert("Server error");
        }
        else if (error.response.status === 403) {
            alert("Session expired");
        }
        else alert(error);
    }
    else alert("Error occured");
    logout(history, setLogged);
}
