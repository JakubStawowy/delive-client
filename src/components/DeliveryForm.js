import {useHistory} from "react-router";
import {useEffect, useState} from "react";
import {handleError, handleItemAccessAttempt} from "../actions/handlers";
import {StyleRoot} from "radium";
import {Button, Card, TextareaAutosize, Typography} from "@material-ui/core";
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
    const [bounce, setBounce] = useState(false);
    const [message, setMessage] = useState('Hello! I can handle your delivery');


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
            announcementId: props.match.params.announcementId,
            receiverId: props.match.params.authorId,
            message
        }).then(response =>
            response.data ?
            setTimeout(() => {
                history.push('/history');
            }, ANIMATION_TIME / 2)
                :
                alert("You are already assigned to delivery")
        ).catch((error) => handleError(error, history));


    return (
        <StyleRoot>
            <div style={fadeInClasses.animation} className={`${flexClasses.flexRowCenter} ${sizeClasses.bodyHeight}`}>
                <Card className={`${rwdClasses.singleMobileCard} ${paddingClasses.paddingMedium}`}>
                    <Typography className={flexClasses.flexRowSpaceBetween}>
                        <div>
                            <TextareaAutosize className={paddingClasses.paddingSmall} value={message} onChange={(e)=>setMessage(e.target.value)}/>
                        </div>
                        <Button
                            onClick={()=>handleRegisterDelivery()}
                            variant={"contained"}
                        >
                            Send message
                        </Button>
                    </Typography>
                </Card>
            </div>
        </StyleRoot>
    );
}
