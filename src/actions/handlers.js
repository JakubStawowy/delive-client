import {ROLE, TOKEN} from "../consts/applicationConsts";
import SockJS from "sockjs-client";
import {BASE_URL} from "../rest/urlConsts";
import Stomp from "stompjs";
import {getConfig, getLoggedUserId} from "../rest/restActions";

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
            logout(history, setLogged);
        }
        else alert("Error occured");
    }
    else alert("Error occured");
}

let stompClient = null;
export const sendMessage = (userId, message = "You have received a new message") => {

    if (stompClient === null) {
        reconnect();
    }

    if (stompClient !== null) {

        const status = stompClient.subscribe('/topic/' + userId);
        stompClient.send('/app/send', getConfig(), JSON.stringify({
            value: message,
            token: localStorage.getItem(TOKEN),
            user: userId
        }));
        status.unsubscribe();
    } else {
        alert("Problems with sending notification");
    }
}

export const reconnect = () => {

    const connect = () => {
        const socket = new SockJS(BASE_URL + '/ws');
        stompClient = Stomp.over(socket);
        stompClient.connect(getConfig(), onConnected, () => {});
    }

    const onConnected = () => {
        getLoggedUserId().then(response => {
            stompClient.subscribe('/topic/' + response.data, message => {
                if (JSON.parse(message.body).token === localStorage.getItem(TOKEN)) {
                    // stompClient.disconnect()
                }
                else {
                    alert(JSON.parse(message.body).value);
                }
            });
        });
    }

    if (stompClient === null) {
        connect();
    }
}

export const disconnect = () => {
    if (stompClient !== null) {
        stompClient.disconnect()
        stompClient = null;
    }
}
