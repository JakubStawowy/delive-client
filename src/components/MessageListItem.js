import {Button, Card, ListItem, makeStyles, Modal} from "@material-ui/core";
import {replyMessage} from "../actions/restActions";
import {handleError} from "../actions/handlers";
import {useHistory} from "react-router";
import {USER_ID} from "../consts/applicationConsts";
import {trimDate} from "../actions/commonFunctions";
import {flexComponents, paddingComponents, rwdComponents} from "../style/components";
import {useEffect, useState} from "react";
import CheckIcon from "@material-ui/icons/Check";
import {PackagesModal} from "./PackagesModal";

export const MessageListItem = (props) => {

    const history = useHistory();
    const [packagesModalOpened, setPackagesModalOpened] = useState(false);

    const useClasses = makeStyles(((theme)=>({
        marginComponent: {
            marginTop: '1em'
        }
    })));
    const classes = useClasses();
    const paddingClasses = paddingComponents();
    const rwdClasses = rwdComponents();
    const flexClasses = flexComponents();

    const handleReplyMessage = consent => replyMessage({
        replyMessageId: props.message.messageId,
        announcementId: props.message.announcementId,
        senderId: localStorage.getItem(USER_ID),
        receiverId: props.message.senderId,
        consent
    }).then(() => {
        alert("Message sent");
        props.refresh();
    }).catch((error) => handleError(error, history));

    const handleOpenProfile = userId => history.push('/profile/' + userId);
    const handleOpenAnnouncement = announcementId => history.push('/announcement/' + announcementId);

    return (
        <ListItem>
            {
                props.message.packages.length > 0 &&
                    <Modal
                        className={flexClasses.flexRowCenter}
                        centered open={packagesModalOpened}
                        children={<PackagesModal
                            packages={props.message.packages}
                            setPackagesModalOpened={setPackagesModalOpened}
                        />}
                        onClose={()=>setPackagesModalOpened(false)}
                    />
            }
            <Card className={`${paddingClasses.paddingMedium} ${rwdClasses.singleMobileCard}`}>
                <div>
                    <div>
                        {
                            props.message.message !== undefined && props.message.message
                        }
                    </div>
                    <Button variant={"contained"} onClick={() => handleOpenAnnouncement(props.message.announcementId)}>
                        Announcement
                    </Button>
                    {
                        props.received ?
                            <Button variant={"contained"} onClick={() => handleOpenProfile(props.message.senderId)}>
                                Sender
                            </Button>
                            :
                            <Button variant={"contained"} onClick={() => handleOpenProfile(props.message.receiverId)}>
                                Receiver
                            </Button>

                    }
                </div>
                {
                    props.received && props.message.messageType === 'REQUEST' &&
                        <div className={classes.marginComponent}>
                            <Button
                                variant={"contained"}
                                onClick={() => handleReplyMessage(true)}
                                disabled={props.message.replied}
                            >
                                Agree
                            </Button>
                            <Button
                                variant={"contained"}
                                onClick={() => handleReplyMessage(false)}
                                disabled={props.message.replied}
                            >
                                Disagree
                            </Button>
                        </div>
                }
                {
                    props.message.packages.length > 0 &&
                        <Button onClick={() => setPackagesModalOpened(true)} variant={"contained"}>
                            Packages
                        </Button>
                }
                <div className={classes.marginComponent}>
                    {trimDate(props.message.createdAt)}
                </div>
                <div className={classes.marginComponent}>
                    {props.message.messageType}
                </div>
                {
                    props.message.replied && props.received &&
                        <div>
                            Replied
                            <CheckIcon />
                        </div>
                }
            </Card>
        </ListItem>
    )
}
