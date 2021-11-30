
import React, {useEffect, useState} from 'react';

import SockJS from "sockjs-client";
import Stomp from "stompjs";
import {getConfig} from "../rest/restActions";
import {Button, Card, TextField} from "@material-ui/core";
import {paddingComponents} from "../style/components";
import {BASE_URL} from "../rest/urlConsts";
import {TOKEN} from "../consts/applicationConsts";

export const Test = (props) => {
    //
    // let stompClient = null;
    // const newConnect = (onConnect) => {
    //     alert("Podlaczam sie");
    //     const socket = new SockJS(BASE_URL + '/ws');
    //     stompClient = Stomp.over(socket);
    //     stompClient.connect(getConfig(), () => {
    //         stompClient.subscribe('/topic/2');
    //         onConnect();
    //     }, error => alert(error));
    // }
    //
    // const sendMessage = () => {
    //     newConnect(() => {
    //         if (stompClient) {
    //             const input = document.getElementById('tympa');
    //             stompClient.send('/app/send', getConfig(), JSON.stringify({
    //                 value: input.value,
    //                 token: localStorage.getItem(TOKEN),
    //                 user: localStorage.getItem("userId") == 1 ? 2 : 1
    //             }));
    //             // alert('sent')
    //         }
    //         else {
    //             alert('stomp client jest null');
    //         }
    //
    //         props.connect();
    //     });
    // }
    // //
    // // useEffect(() => {
    // //     connect();
    // // }, []);
    //
    // const paddingClasses = paddingComponents();
    // return (<Card className={paddingClasses.paddingMedium}>
    //     <TextField
    //         id={'tympa'}
    //         // value={message}
    //         // onChange={e => setMessage(e.target.value)}
    //         label={'message'}
    //     />
    //     <Button variant={'contained'} onClick={() => sendMessage()}>
    //         Send
    //
    //     </Button>
    // </Card>)
}
