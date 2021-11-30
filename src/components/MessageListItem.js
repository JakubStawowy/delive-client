import {Button, Card, ListItem, makeStyles, Modal, TableRow} from "@material-ui/core";
import {replyMessage} from "../rest/restActions";
import {handleError, sendMessage} from "../actions/handlers";
import {useHistory} from "react-router";
import {trimDate} from "../actions/commonFunctions";
import {flexComponents, paddingComponents, rwdComponents, sizeComponents} from "../style/components";
import React, {useEffect, useState} from "react";
import CheckIcon from "@material-ui/icons/Check";
import {ModalTemplate} from "../templates/ModalTemplate";
import {Announcement} from "./Announcement";
import {Profile} from "../pages/Profile";
import {FeedbackForm} from "./FeedbackForm";

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
            height: '2em',
            marginBottom: '.5em'
        },
        root: {
            padding: 0
        },
        check: {
            color: "green"
        },
        greenBackground: {
            background: '#90EE90'
        },
        redBackground: {
            background: '#FFA07A'
        },
        infoBackground: {
            background: '#52ADC8'
        },
        requestBackground: {
            background: '#EBA172'
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
                            <Announcement
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
                            <Profile
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
                    <div>
                        <Button
                            variant={"contained"}
                            onClick={() => setAnnouncementModalOpened(true)}
                            className={classes.messageButton}
                        >
                            Announcement
                        </Button>
                        {
                            props.received && props.message.messageType !== 'INFO' &&
                                <Button
                                    variant={"contained"}
                                    onClick={() => handleOpenProfile(props.message.senderId)}
                                    className={classes.messageButton}
                                >
                                    Sender
                                </Button>
                        }
                        {
                            !props.received && props.message.messageType !== 'INFO' &&
                                <Button
                                    variant={"contained"}
                                    onClick={() => handleOpenProfile(props.message.receiverId)}
                                    className={classes.messageButton}
                                >
                                    Receiver
                                </Button>
                        }
                        {
                            props.message.messageType === 'INFO' && !props.message.replied &&
                            <Button
                                    variant={"contained"}
                                    className={classes.messageButton}
                                    onClick={() => setFeedbackFormModalOpened(true)}
                                    disabled={props.message.replied}
                                >
                                    Send feedback
                                </Button>
                        }
                    </div>
                    {trimDate(props.message.createdAt)}
                </div>
                {
                    props.received && props.message.messageType === 'REQUEST' && !props.message.replied &&
                        // <div className={classes.marginComponent}>
                        <div>
                            <Button
                                variant={"contained"}
                                onClick={() => handleReplyMessage(true)}
                                disabled={props.message.replied}
                                className={`${classes.messageButton} ${classes.greenBackground}`}
                            >
                                Agree
                            </Button>
                            <Button
                                variant={"contained"}
                                onClick={() => handleReplyMessage(false)}
                                disabled={props.message.replied}
                                className={`${classes.messageButton} ${classes.redBackground}`}
                            >
                                Disagree
                            </Button>
                        </div>
                }
                <div>
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
