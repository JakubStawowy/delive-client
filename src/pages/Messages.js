import {Button, Card, List, makeStyles} from "@material-ui/core";
import {flexComponents, listComponents, paddingComponents, rwdComponents, sizeComponents} from "../style/components";
import {useEffect, useState} from "react";
import {BounceLoader} from "react-spinners";
import {StyleRoot} from "radium";
import {fadeInDown, fadeIn, fadeOutLeft} from "react-animations";
import {useAnimationStyles} from "../style/animation";
import {ANIMATION_TIME} from "../data/consts";
import {handleError, handleItemAccessAttempt} from "../actions/handlers";
import {useHistory} from "react-router";
import LoopIcon from '@material-ui/icons/Loop';
import {
    getMessagesReceived,
    getMessagesSent
} from "../rest/restActions";
import {MessageListItem} from "../components/MessageListItem";

export const Messages = () => {

    const [messagesSent, setMessagesSent] = useState(null);
    const [messagesReceived, setMessagesReceived] = useState(null);
    const [messagesFlag, setMessagesFlag] = useState(true);
    const [bounce, setBounce] = useState(false);

    const history = useHistory();

    const useStyles = makeStyles(((theme)=>({
        selected: {
            background: '#DCDCDC'
        },
        rwdList: {
            [theme.breakpoints.down('xs')]: {
                paddingLeft: 0,
                paddingRight: 0
            }
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
        getMessagesSent().then(response => {
            setMessagesSent(response.data);
            console.log(response.data);
        }).catch((error) => handleError(error, history));

        getMessagesReceived().then(response => {
            setMessagesReceived(response.data);
            console.log(response.data);
        }).catch((error) => handleError(error, history));
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
                    messagesSent === null || messagesReceived === null ?
                        <div style={loaderAnimationStyles.animation}>
                            <BounceLoader
                                loading
                                color={'red'}
                            />
                        </div>
                        :
                        <div style={bounce ? fadeOutStyles.animation : animationStyles.animation} className={`${rwdClasses.mobileCard}`}>
                            <Card className={`${paddingClasses.paddingMedium} ${sizeClasses.componentHeight} ${classes.rwdList} ${flexClasses.flexColumnSpaceBetween}`}>
                                <div className={`${flexClasses.flexRowCenter}`}>
                                    <Button onClick={() => setMessagesFlag(true)} className={messagesFlag && classes.selected}>
                                        sent
                                    </Button>
                                    <Button onClick={() => setMessagesFlag(false)} className={!messagesFlag && classes.selected}>
                                        received
                                    </Button>
                                    <Button onClick={() => refresh()}>
                                        <LoopIcon />
                                    </Button>
                                </div>
                                <List className={`${listClasses.verticalList}`}>
                                    {
                                        messagesFlag ?
                                                messagesSent.length > 0 ?
                                                messagesSent.map(message=>{
                                                    return (
                                                        <MessageListItem
                                                            message={message}
                                                            received={false}
                                                        />
                                                    )
                                                })
                                                    :
                                                    <div>
                                                        No messages yet
                                                    </div>

                                            :
                                            messagesReceived.length > 0 ?
                                            messagesReceived.map(message=>{
                                                return (
                                                    <MessageListItem
                                                        message={message}
                                                        received={true}
                                                        refresh={refresh}
                                                    />
                                                )
                                            })
                                                :
                                                <div>
                                                    No messages yet
                                                </div>

                                    }
                                </List>
                            </Card>
                        </div>
                }
            </div>
        </StyleRoot>
    )
}
