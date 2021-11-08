import {useHistory} from "react-router";
import {useEffect, useState} from "react";
import {handleError, handleItemAccessAttempt} from "../actions/handlers";
import {StyleRoot} from "radium";
import {Button, Card, makeStyles, TextareaAutosize, Typography} from "@material-ui/core";
import {
    flexComponents,
    paddingComponents,
    rwdComponents,
    sizeComponents,
    validatedComponents
} from "../style/components";
import {useAnimationStyles} from "../style/animation";
import {ANIMATION_TIME} from "../data/consts";
import {fadeInRight} from "react-animations";
import {i18n} from "../data/i18n";
import {
    registerMessageNormal
} from "../rest/restActions";

export const DeliveryForm = (props) => {
    const history = useHistory();

    const announcementFormItems = i18n[
        localStorage.getItem('locale') !== undefined
        && localStorage.getItem('locale') !== null
            ? localStorage.getItem('locale') : 'en'].announcement;
    const [message, setMessage] = useState('Hello! I can handle your delivery');

    const useClasses = makeStyles(((theme) => ({
        messageField: {
            width: '30vw',
            marginBottom: '2em'
        }
    })));
    const classes = useClasses();
    const rwdClasses = rwdComponents();
    const flexClasses = flexComponents();
    const sizeClasses = sizeComponents();
    const paddingClasses = paddingComponents();
    const fadeInClasses = useAnimationStyles(fadeInRight, ANIMATION_TIME);

    useEffect(()=> {
        handleItemAccessAttempt(history);
    });

    const handleRegisterDelivery = () =>
        registerMessageNormal({
            announcementId: props.announcementId,
            receiverId: props.authorId,
            message
        }).then(response =>
            response.data ?
            setTimeout(() => {
                alert('Delivery request sent');
                props.setDeliveryModalOpened(false);
            }, ANIMATION_TIME / 2)
                :
                alert("You are already assigned to delivery")
        ).catch((error) => handleError(error, history, props.setLogged));


    return (
        <Card className={`${paddingClasses.paddingMedium}`}>
            <Typography className={flexClasses.flexColumnSpaceBetween}>
                <div>
                    <TextareaAutosize
                        className={`${paddingClasses.paddingSmall} ${classes.messageField}`}
                        value={message}
                        onChange={(e)=>setMessage(e.target.value)}/>
                </div>
                <Button
                    onClick={()=>handleRegisterDelivery()}
                    variant={"contained"}
                >
                    Send message
                </Button>
            </Typography>
        </Card>
    );
}
