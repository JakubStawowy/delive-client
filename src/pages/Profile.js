import React, {useEffect, useState} from 'react';
import {Avatar, Button, Card, List, ListItem, makeStyles, Typography} from "@material-ui/core";
import userImage from '../uploads/user.png';
import {useHistory} from "react-router";
import {FeedbackListItem} from "../components/FeedbackListItem";
import {handleError} from "../actions/handlers";
import {flexComponents, paddingComponents, rwdComponents, sizeComponents} from "../style/components";
import {StyleRoot} from "radium";
import {loadFeedback, loadLoggedUser, loadUser} from "../rest/restActions";
// import {USER_ID} from "../consts/applicationConsts";

export const Profile = props => {

    const history = useHistory();
    const [userData, setUserData] = useState(null);
    const [feedback, setFeedback] = useState([]);
    const [userId, setUserId] = useState(null);
    const useClasses = makeStyles((theme) => ({
        img: {
            width: '10vw',
            borderRadius: '50%'
        },
        list: {
            maxHeight: '30vh',
            overflow: 'auto',
            width: '100%'
        },
        button: {
            background: 'rgba(75,190,186,0.88)',
            color: 'white'
        }
    }));
    const classes = useClasses();

    const rwdClasses = rwdComponents();
    const flexClasses = flexComponents();
    const sizeClasses = sizeComponents();
    const paddingClasses = paddingComponents();

    useEffect(  () => {
        const uid = props.userId !== undefined ? props.userId : props.match.params.userId;

        if (uid !== undefined) {
            setUserId(uid);
            loadUser(uid).then(response => {
                setUserData(response.data);
            }).catch((error) => handleError(error, history, props.setLogged));

            loadFeedback(uid).then(
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
        <StyleRoot>
            {
                userData !== null &&
                <div className={`${flexClasses.flexRowSpaceAround} ${sizeClasses.bodyHeight}`}>
                    <Card className={`${rwdClasses.singleMobileCard} ${paddingClasses.paddingMedium} ${flexClasses.flexColumnSpaceBetween}`}>
                        <Avatar>
                            <img className={classes.img} src={userImage} alt={''}/>
                        </Avatar>
                        <Typography variant={'h3'} gutterBottom={'true'}>
                            {`${userData.name} ${userData.surname}`}
                        </Typography>
                        {
                            userData.userWallet !== null &&
                            <div>
                                My wallet: {`${userData.userWallet.balance} ${userData.userWallet.currency}`}
                            </div>
                        }
                        {
                            userData.userWallet !== null &&
                            <Button
                                variant={"contained"}
                                onClick={()=>alert('Function currently not supported')}
                            >
                                Withdraw money to bank account
                            </Button>
                        }
                        <Typography variant={'h4'} gutterBottom={'true'}>
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
                </div>
            }
        </StyleRoot>
    );
}
