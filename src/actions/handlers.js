import {ROLE, TOKEN} from "../consts/applicationConsts";
import SockJS from "sockjs-client";
import {BASE_URL} from "../rest/urlConsts";
import Stomp from "stompjs";
import {getConfig} from "../rest/restActions";


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
            logout(history, setLogged);
        }
        else alert(error);
    }
    else alert("Error occured");
}

export const sendMessage = (userId, message = "You have received a new message") => {

    let stompClient = null;
    const newConnect = (onConnect) => {
        // alert("Podlaczam sie");
        const socket = new SockJS(BASE_URL + '/ws');
        stompClient = Stomp.over(socket);
        stompClient.connect(getConfig(), () => {
            stompClient.subscribe('/topic/' + userId);
            onConnect();
        }, error => alert(error));
    }

    newConnect(() => {
        if (stompClient) {
            stompClient.send('/app/send', getConfig(), JSON.stringify({
                value: message,
                token: localStorage.getItem(TOKEN),
                user: userId
            }));
            // alert('sent')
        }
        else {
            alert('stomp client jest null');
        }
        // reconnect();
    });
}

export const reconnect = () => {

    let stompClient = null;
    const connect = () => {
        // alert("Lacze sie");
        const socket = new SockJS(BASE_URL + '/ws');
        stompClient = Stomp.over(socket);
        stompClient.connect(getConfig(), onConnected, error => alert(error));
    }

    const onConnected = () => {
        stompClient.subscribe('/topic/' + localStorage.getItem('userId'), message => alert(JSON.parse(message.body).value));
    }

    connect();
}
