import {Avatar, Button, Card, List, ListItem, makeStyles, Typography} from "@material-ui/core";
import image from "../uploads/user.png";
import {FeedbackListItem} from "./FeedbackListItem";
import React, {useEffect, useState} from "react";
import {flexComponents, paddingComponents, rwdComponents, sizeComponents} from "../style/components";
import {useHistory} from "react-router";
import {loadFeedback, loadLoggedUser, loadUser} from "../rest/restActions";
import {handleError} from "../actions/handlers";

export const ProfileComponent = props => {


    const history = useHistory();
    const [userData, setUserData] = useState(null);
    const [feedback, setFeedback] = useState([]);
    const [userId, setUserId] = useState(null);
    const useClasses = makeStyles((theme) => ({
        img: {
            // width: '10vw',
            // borderRadius: '50%'
        },
        list: {
            maxHeight: '30vh',
            overflow: 'auto',
            width: '100%'
        },
        button: {
            background: 'rgba(75,190,186,0.88)',
            color: 'white'
        },
        element: {
            marginTop: '1em'
        }
    }));
    const classes = useClasses();

    const rwdClasses = rwdComponents();
    const flexClasses = flexComponents();
    const sizeClasses = sizeComponents();
    const paddingClasses = paddingComponents();

    useEffect(  () => {

        if (props.userId !== undefined) {
            setUserId(props.userId);
            loadUser(props.userId).then(response => {
                setUserData(response.data);
            }).catch((error) => handleError(error, history, props.setLogged));

            loadFeedback(props.userId).then(
                response => setFeedback(response.data)
            ).catch((error) => handleError(error, history, props.setLogged));
        }
        else {
            loadLoggedUser().then(response => {
                setUserData(response.data);
                loadFeedback(response.data.id).then(
                    response => setFeedback(response.data)
                ).catch((error) => handleError(error, history, props.setLogged));
            }).catch((error) => handleError(error, history, props.setLogged));
        }
    }, []);

    return (
        <div>
            {
                userData !== null &&
                <Card className={`${rwdClasses.singleMobileCard} ${paddingClasses.paddingMedium} ${flexClasses.flexColumnSpaceBetween}`}>
                    <Avatar src={image} alt={''} className={classes.img} />
                    <Typography variant={'h3'} gutterBottom={'true'}>
                        {`${userData.name} ${userData.surname}`}
                    </Typography>
                    {
                        userData.balance !== null &&
                        <div>
                            My wallet: {`${userData.balance} EUR`}
                        </div>
                    }
                    <div className={classes.element}>
                        {
                            userData.balance !== null &&
                            <Button
                                variant={"contained"}
                                onClick={()=>alert('Function currently not supported')}
                            >
                                Top-up your wallet
                            </Button>
                        }
                        {
                            userData.balance !== null &&
                            <Button
                                variant={"contained"}
                                onClick={()=>alert('Function currently not supported')}
                            >
                                Withdraw money to bank account
                            </Button>
                        }
                    </div>
                    <Typography variant={'h4'} gutterBottom={'true'} className={classes.element}>
                        Feedback
                    </Typography>
                    <List className={classes.list}>
                        {feedback.length !== 0 ?
                            feedback.map(
                                singleFeedback => {
                                    return (
                                        <ListItem>
                                            <FeedbackListItem
                                                author={singleFeedback.authorName + ' ' + singleFeedback.authorSurname}
                                                authorId={singleFeedback.authorId}
                                                content={singleFeedback.content}
                                                stars={singleFeedback.rate}
                                            />
                                        </ListItem>
                                    )
                                })
                            :
                            <div className={flexClasses.flexRowCenter}>
                                {userData.name} does not have feedback yet
                            </div>
                        }
                    </List>
                </Card>
            }
        </div>)
}
