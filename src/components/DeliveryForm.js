import {useHistory} from "react-router";
import {useEffect, useState} from "react";
import {handleError, handleItemAccessAttempt, reconnect, sendMessage} from "../actions/handlers";
import {StyleRoot} from "radium";
import {Button, Card, makeStyles, TextareaAutosize, TextField, Typography} from "@material-ui/core";
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
    loadLoggedUser,
    registerMessageNormal
} from "../rest/restActions";

export const DeliveryForm = (props) => {
    const history = useHistory();

    const announcementFormItems = i18n[
        localStorage.getItem('locale') !== undefined
        && localStorage.getItem('locale') !== null
            ? localStorage.getItem('locale') : 'en'].announcement;
    const [message, setMessage] = useState('Hello! I can handle your delivery');
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [vehicleRegistrationNumber, setVehicleRegistrationNumber] = useState(null);

    const useClasses = makeStyles(((theme) => ({
        messageField: {
            width: '30vw',
            marginBottom: '2em',

            [theme.breakpoints.down('xs')]: {
                width: '80vw'
            }
        },
        container: {
            // alignItems: 'flex-start'
        },
        textField: {
            marginLeft: '1em',
            marginBottom: '1em'
        },
        singleElement: {
            width: '100%'
        },
        info: {
            fontSize: '.8em',
            maxWidth: '30vw',
            marginBottom: '1em',

            [theme.breakpoints.down('xs')]: {
                maxWidth: '80vw'
            }
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
        loadLoggedUser().then(response => setPhoneNumber(response.data.phone));
    });

    const handleRegisterDelivery = () =>
        registerMessageNormal({
            announcementId: props.announcementId,
            receiverId: props.authorId,
            message,
            vehicleRegistrationNumber,
            phoneNumber
        }).then(response => {
                if (response.data) {
                    props.setDeliveryModalOpened(false);
                    sendMessage(props.authorId, "Someone wants to handle your delivery! You can check the announcement and deliverer from messages panel");
                    alert('Delivery request sent');
                    history.push('/messages');
                }
                else {
                    alert("You are already assigned to delivery")
                }
            }
        ).catch((error) => handleError(error, history, props.setLogged));


    return (
        <Card className={`${paddingClasses.paddingMedium}`}>
            <Typography className={flexClasses.flexColumnSpaceBetween}>
                <div className={`${flexClasses.flexColumnSpaceBetween} ${classes.container}`}>
                    <TextareaAutosize
                        className={`${paddingClasses.paddingSmall} ${classes.messageField}`}
                        value={message}
                        onChange={(e)=>setMessage(e.target.value)}/>
                    <div className={`${flexClasses.flexRowSpaceBetween} ${classes.singleElement}`}>
                        Vehicle registration number (Optional)
                        <TextField
                            value={vehicleRegistrationNumber}
                            onChange={e => setVehicleRegistrationNumber(e.target.value)}
                            className={classes.textField}
                        />
                    </div>
                    <div className={`${flexClasses.flexRowSpaceBetween} ${classes.singleElement}`}>
                        Phone number (Optional)
                        <TextField
                            value={phoneNumber}
                            onChange={e => setPhoneNumber(e.target.value)}
                            className={classes.textField}
                        />
                    </div>
                    <div className={classes.info}>
                        Phone number and registration number are not required but thanks to them your request may encourage the client to accept your offer
                    </div>
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
