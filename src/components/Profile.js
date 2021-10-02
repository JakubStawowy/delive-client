import React, {useEffect, useState} from 'react';
import {Avatar, Button, Card, Container, List, ListItem, makeStyles, Typography} from "@material-ui/core";
import userImage from '../uploads/user.png';
import {useHistory} from "react-router";
import {NavLink} from "react-router-dom";
import {Feedback} from "./Feedback";
import {handleError} from "../actions/handlers";
import {flexComponents, paddingComponents, rwdComponents, sizeComponents} from "../style/components";
import {StyleRoot} from "radium";
import {loadFeedback, loadUser} from "../actions/restActions";

export const Profile = props => {

    const history = useHistory();
    const [userData, setUserData] = useState({
        name: '',
        surname: ''
    });
    const [feedback, setFeedback] = useState([]);
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
            background: '#4BBEBAE0',
            color: 'white'
        }
    }));
    const classes = useClasses();

    const rwdClasses = rwdComponents();
    const flexClasses = flexComponents();
    const sizeClasses = sizeComponents();
    const paddingClasses = paddingComponents();

    useEffect(  () => {
        loadUser(props.match.params.userId).then(response => {
            setUserData(response.data);
        }).catch((error) => handleError(error, history));

        loadFeedback(props.match.params.userId).then(
            response => setFeedback(response.data)
        ).catch((error) => handleError(error, history));
    }, []);

    return (
        <StyleRoot>
            <div className={`${flexClasses.flexRowSpaceAround} ${sizeClasses.bodyHeight}`}>
                <Card className={`${rwdClasses.singleMobileCard} ${paddingClasses.paddingMedium}`}>
                    <Avatar>
                        <img className={classes.img} src={userImage} alt={''}/>
                    </Avatar>
                    <Typography variant={'h3'} gutterBottom={'true'}>
                        {`${userData.name} ${userData.surname}`}
                    </Typography>
                    <Typography gutterBottom={'true'}>
                        {/*<NavLink to={'/users/' + props.match.params.id + '/announcements'}>*/}
                        {/*    <Button variant={'contained'} className={classes.button}>User announcements</Button>*/}
                        {/*</NavLink>*/}
                    </Typography>
                    <Typography variant={'h4'} gutterBottom={'true'}>
                        Feedback
                    </Typography>
                    <List className={classes.list}>
                        {feedback.length !== 0 ? feedback.map(
                            singleFeedback => {
                                return (
                                    <ListItem>
                                        <Feedback
                                            author={singleFeedback.authorName + ' ' + singleFeedback.authorSurname}
                                            authorId={singleFeedback.authorId}
                                            content={singleFeedback.content}
                                            stars={singleFeedback.rate}
                                        />
                                    </ListItem>
                                )
                            }
                            )
                            :
                            <Typography variant={'h5'} gutterBottom={'true'}>
                                {userData.name} does not have feedback yet
                            </Typography>
                        }
                    </List>
                </Card>
            </div>
        </StyleRoot>
    );
}
