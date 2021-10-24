import {CLOSE, FINISH, START, WAITING} from "../consts/applicationConsts";

export const trimDate = date => date.substring(0, 16).replace('T', ' ');
// export const getNextActionName = (deliveryState, announcementAuthorId, delivererId, loggedUserId) => {
//     // const loggedUserId = parseInt(localStorage.getItem(USER_ID));
//     const isUserPrincipal = announcementAuthorId === loggedUserId;
//     const isUserDeliverer = delivererId === loggedUserId;
//     if (deliveryState === 'REGISTERED' && isUserDeliverer)
//         return [START];
//     if (deliveryState === 'STARTED' && isUserDeliverer)
//         return [FINISH];
//     if (deliveryState === 'FINISHED' && isUserPrincipal)
//         return [CLOSE];
//     if (deliveryState === 'TO_ACCEPT' && isUserPrincipal) {
//         return ['accept', 'discard'];
//     }
//     if (deliveryState === 'CLOSED')
//         return ['-']
//     return [WAITING];
// }
