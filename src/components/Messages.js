import {Button, Card, List, makeStyles} from "@material-ui/core";
import {flexComponents, listComponents, paddingComponents, rwdComponents, sizeComponents} from "../style/components";
import {useEffect, useState} from "react";
import {BounceLoader} from "react-spinners";
import {StyleRoot} from "radium";
import {fadeInDown, fadeIn, fadeOutLeft} from "react-animations";
import {useAnimationStyles} from "../style/animation";
import {ANIMATION_TIME} from "../data/consts";
import {handleItemAccessAttempt} from "../actions/handlers";
import {useHistory} from "react-router";
import LoopIcon from '@material-ui/icons/Loop';
import {
    getMessagesReceived,
    getMessagesSent
} from "../actions/restActions";
import {USER_ID} from "../consts/ApplicationConsts";
import {MessageListItem} from "./MessageListItem";

export const Messages = () => {

    const [messagesSent, setMessagesSent] = useState([]);
    const [messagesReceived, setMessagesReceived] = useState([]);
    const [messagesFlag, setMessagesFlag] = useState(true);
    const [messagesReceivedOpened, setMessagesReceivedOpened] = useState(false);
    const [messagesArchivedOpened, setMessagesArchivedOpened] = useState(false);
    const [bounce, setBounce] = useState(false);

    const history = useHistory();

    const useStyles = makeStyles((()=>({
        selected: {
            background: '#DCDCDC'
        },
        bar: {
            marginBottom: '1em'
        }
    })));
    const classes = useStyles();
    const flexClasses = flexComponents();
    const paddingClasses = paddingComponents();
    const sizeClasses = sizeComponents();
    const listClasses = listComponents();
    const rwdClasses = rwdComponents();
    const animationStyles = useAnimationStyles(fadeInDown, ANIMATION_TIME);
    const loaderAnimationStyles = useAnimationStyles(fadeIn, ANIMATION_TIME);
    const fadeOutStyles = useAnimationStyles(fadeOutLeft, ANIMATION_TIME / 2);

    useEffect(()=>{
        handleItemAccessAttempt(history);
        loadMessages();
    }, []);

    const loadMessages = () => {
        getMessagesSent({
            userId: localStorage.getItem(USER_ID)
        }).then(response => {
            setMessagesSent(response.data);
            console.log(response.data);
        }).catch((error) => alert(error));

        getMessagesReceived({
            userId: localStorage.getItem(USER_ID)
        }).then(response => {
            setMessagesReceived(response.data);
            console.log(response.data);
        }).catch((error) => alert(error));
    }

    const refresh = () => {
        setMessagesReceived([]);
        setMessagesSent([]);
        loadMessages();
    }

    return (
        <StyleRoot>
            <div className={`${flexClasses.flexRowSpaceAround} ${sizeClasses.bodyHeight}`}>
                {
                    messagesSent.length === 0 && messagesReceived.length === 0 ?
                        <div style={loaderAnimationStyles.animation}>
                            <BounceLoader
                                loading
                                color={'red'}
                            />
                        </div>
                        :
                        <div style={bounce ? fadeOutStyles.animation : animationStyles.animation} className={`${rwdClasses.mobileCard}`}>
                            <Card className={`${paddingClasses.paddingMedium}`}>
                                <div className={`${flexClasses.flexRowCenter} ${classes.bar}`}>
                                    <Button onClick={() => setMessagesFlag(true)} className={messagesFlag && classes.selected}>
                                        sent
                                    </Button>
                                    <Button onClick={() => setMessagesFlag(false)} className={!messagesFlag && classes.selected}>
                                        received
                                    </Button>
                                </div>
                                <List className={`${listClasses.verticalList}`}>
                                    {
                                        messagesFlag ?
                                            messagesSent.map(message=>{
                                                return (
                                                    <MessageListItem
                                                        message={message}
                                                        received={false}
                                                    />
                                                )
                                            })
                                            :
                                            messagesReceived.map(message=>{
                                                return (
                                                    <MessageListItem
                                                        message={message}
                                                        received={true}
                                                    />
                                                )
                                            })
                                    }
                                </List>
                                <div className={flexClasses.flexRowCenter}>
                                    <Button onClick={() => refresh()}>
                                        <LoopIcon />
                                    </Button>
                                </div>
                            </Card>
                        </div>
                }
            </div>
        </StyleRoot>
    )
}
