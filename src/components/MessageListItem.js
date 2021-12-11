import {Button, Card, ListItem, makeStyles, Modal, TableRow} from "@material-ui/core";
import {replyMessage} from "../rest/restActions";
import {handleError, sendMessage} from "../actions/handlers";
import {useHistory} from "react-router";
import {trimDate} from "../actions/commonFunctions";
import {flexComponents, paddingComponents, rwdComponents, sizeComponents} from "../style/components";
import React, {useState} from "react";
import CheckIcon from "@material-ui/icons/Check";
import {ModalTemplate} from "../templates/ModalTemplate";
import {FeedbackForm} from "./FeedbackForm";
import {ProfileComponent} from "./ProfileComponent";
import {AnnouncementComponent} from "./AnnouncementComponent";

export const MessageListItem = (props) => {

    const history = useHistory();
    const [announcementModalOpened, setAnnouncementModalOpened] = useState(false);
    const [profileModalOpened, setProfileModalOpened] = useState(false);
    const [feedbackFormModalOpened, setFeedbackFormModalOpened] = useState(false);
    const [currentProfileUserId, setCurrentProfileUserId] = useState(null);

    const useClasses = makeStyles(((theme)=>({
        marginComponent: {
            marginTop: '1em'
        },
        messageButton: {
            cursor: 'pointer',
            marginBottom: '.5em',
            "&:hover": {
                color: 'gray'
            }
        },
        root: {
            padding: 0
        },
        check: {
            color: "green"
        },
        greenBackground: {
            // background: '#EBA172'
        },
        redBackground: {
            // background: '#FFA07A'
        },
        infoBackground: {
            background: '#52ADC8'
        },
        requestBackground: {
            background: '#EBA172'
        },
        nextElement: {
            paddingLeft: '.5em',
            marginLeft: '.5em',
            borderLeft: '1px solid gray'
        },
        message: {
            borderLeft: '0.5px solid gray',
            borderBottom: '0.5px solid gray',
            borderRadius: '1em',
            padding: '.5em'
        },
        agreement: {
            display: 'flex'
        },
        accept: {
            // background: '#00FFFF',
        },
        discard: {
            // background: 'red'
        }
    })));
    const classes = useClasses();
    const paddingClasses = paddingComponents();
    const rwdClasses = rwdComponents();
    const flexClasses = flexComponents();

    const handleReplyMessage = consent => replyMessage({
        replyMessageId: props.message.id,
        announcementId: props.message.announcementId,
        receiverId: props.message.senderId,
        consent
    }).then(() => {
        sendMessage(props.message.senderId);
        alert("Message sent");
        props.refresh();
    }).catch((error) => handleError(error, history, props.setLogged));

    const handleOpenProfile = userId => {
        setCurrentProfileUserId(userId);
        setProfileModalOpened(true);
    }

    return (
        <ListItem className={classes.root}>
            <Modal
                className={flexClasses.flexRowCenter}
                centered open={announcementModalOpened}
                children={
                    <ModalTemplate
                        action={setAnnouncementModalOpened}
                        child={
                            <AnnouncementComponent
                                announcementId={props.message.announcementId}
                                setLogged={props.setLogged}
                            />
                        }
                    />
                }
                onClose={()=>setAnnouncementModalOpened(false)}
            />

            <Modal
                className={flexClasses.flexRowCenter}
                centered open={profileModalOpened}
                children={
                    <ModalTemplate
                        action={setProfileModalOpened}
                        child={
                            <ProfileComponent
                                userId={currentProfileUserId}
                                setLogged={props.setLogged}
                            />
                        }
                    />
                }
                onClose={()=>setProfileModalOpened(false)}
            />

            <Modal
                className={flexClasses.flexRowCenter}
                centered open={feedbackFormModalOpened}
                children={
                    <ModalTemplate
                        action={setFeedbackFormModalOpened}
                        child={
                            <FeedbackForm
                                setLogged={props.setLogged}
                                userId={props.message.senderId}
                                setFeedbackFromModalOpened={setFeedbackFormModalOpened}
                                messageId={props.message.id}
                                refresh={props.refresh}
                            />
                        }
                    />
                }
                onClose={()=>setFeedbackFormModalOpened(false)}
            />

            <Card className={`
                ${paddingClasses.paddingSmall}
                ${rwdClasses.listItem}`}>
                <div className={flexClasses.flexRowSpaceBetween}>
                    <div className={flexClasses.flexRowSpaceBetween}>
                        <div
                            // variant={"contained"}
                            onClick={() => setAnnouncementModalOpened(true)}
                            className={`${classes.messageButton}`}
                        >
                            Announcement
                        </div>
                        <div className={classes.separator}/>
                        {
                            props.received && props.message.messageType !== 'INFO' &&
                                <div
                                    variant={"contained"}
                                    onClick={() => handleOpenProfile(props.message.senderId)}
                                    className={`${classes.messageButton} ${classes.nextElement}`}
                                >
                                    Sender
                                </div>
                        }
                        {
                            !props.received && props.message.messageType !== 'INFO' &&
                                <div
                                    variant={"contained"}
                                    onClick={() => handleOpenProfile(props.message.receiverId)}
                                    className={`${classes.messageButton} ${classes.nextElement}`}
                                >
                                    Receiver
                                </div>
                        }
                        {
                            props.message.messageType === 'INFO' && !props.message.replied &&
                            <div
                                    variant={"contained"}
                                    className={`${classes.messageButton} ${classes.nextElement}`}
                                    onClick={() => setFeedbackFormModalOpened(true)}
                                    disabled={props.message.replied}
                                >
                                    Send feedback
                                </div>
                        }
                    </div>
                    {trimDate(props.message.createdAt)}
                </div>
                {
                    props.received && props.message.messageType === 'REQUEST' && !props.message.replied &&
                        // <div className={classes.marginComponent}>
                        <div className={classes.agreement}>
                            <div
                                variant={"contained"}
                                onClick={() => handleReplyMessage(true)}
                                disabled={props.message.replied}
                                className={`${classes.messageButton} ${classes.accept}`}
                            >
                                Accept
                            </div>
                            <div
                                variant={"contained"}
                                onClick={() => handleReplyMessage(false)}
                                disabled={props.message.replied}
                                className={`${classes.messageButton} ${classes.nextElement} ${classes.discard}`}
                            >
                                Discard
                            </div>
                        </div>
                }
                <div className={classes.message}>
                    {
                        props.message.message !== undefined && props.message.message
                    }
                </div>
                {
                    props.message.replied && props.received &&
                    <div>
                        Replied
                        <CheckIcon className={classes.check}/>
                    </div>
                }
            </Card>
        </ListItem>
    )
}
