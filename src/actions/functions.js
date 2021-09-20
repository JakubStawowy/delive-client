import {CLOSE, FINISH, START, WAITING} from "../consts/ApplicationConsts";

export const trimDate = date => date.substring(0, 16).replace('T', ' ');
export const getNextActionName = (deliveryState, isUserPrincipal) => {
    if (deliveryState === 'REGISTERED' && isUserPrincipal)
        return START;
    if (deliveryState === 'STARTED' && isUserPrincipal)
        return FINISH;
    if (deliveryState === 'FINISHED' && !isUserPrincipal)
        return CLOSE;
    if (deliveryState === 'CLOSED')
        return '-'
    return WAITING;
}
