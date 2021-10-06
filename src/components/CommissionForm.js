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
    registerMessageDelivery,
    registerMessageNormal
} from "../actions/restActions";
import {USER_ID} from "../consts/applicationConsts";
import {PackagesForm} from "./PackagesForm";

export const CommissionForm = (props) => {
    const history = useHistory();

    const announcementFormItems = i18n[
        localStorage.getItem('locale') !== undefined
        && localStorage.getItem('locale') !== null
            ? localStorage.getItem('locale') : 'en'].announcement;
    const [bounce, setBounce] = useState(false);
    const [message, setMessage] = useState('Hello! I can handle your delivery');
    const [packages, setPackages] = useState([]);

    const [packageWidth, setPackageWidth] = useState('');
    const [packageWidthValidated, setPackageWidthValidated] = useState(true);

    const rwdClasses = rwdComponents();
    const flexClasses = flexComponents();
    const sizeClasses = sizeComponents();
    const paddingClasses = paddingComponents();
    const validationClasses = validatedComponents();
    const fadeInClasses = useAnimationStyles(fadeInRight, ANIMATION_TIME);

    useEffect(()=> {
        handleItemAccessAttempt(history);
    });

    const handleRegisterDelivery = () => {
        props.delivery ?
            registerMessageDelivery({
                announcementId: props.params.announcementId,
                senderId: localStorage.getItem(USER_ID),
                receiverId: props.params.authorId,
                message,
                packages
            }).then(()=>setTimeout(()=>{
                history.push('/history');
            }, ANIMATION_TIME / 2)).catch((error) => handleError(error, history))
            :
        registerMessageNormal({
            announcementId: props.params.announcementId,
            senderId: localStorage.getItem(USER_ID),
            receiverId: props.params.authorId,
            message
        }).then(()=>setTimeout(()=>{
            history.push('/history');
        }, ANIMATION_TIME / 2)).catch((error) => handleError(error, history));
    }

    return (
        <StyleRoot>
            <div style={fadeInClasses.animation} className={`${flexClasses.flexRowCenter} ${sizeClasses.bodyHeight}`}>
                <Card className={`${rwdClasses.singleMobileCard} ${paddingClasses.paddingMedium}`}>
                    <Typography className={flexClasses.flexRowSpaceBetween}>
                        {
                            props.delivery ?
                                <div>
                                    <PackagesForm
                                        packages={packages}
                                        announcementFormItems={announcementFormItems}
                                        setPackages={setPackages}
                                    />
                                    <Button onClick={()=>alert(packages.length)}>
                                        Show number of packages
                                    </Button>
                                </div>

                                :
                                <div>
                                    <TextareaAutosize className={paddingClasses.paddingSmall} value={message} onChange={(e)=>setMessage(e.target.value)}/>
                                </div>
                        }
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
