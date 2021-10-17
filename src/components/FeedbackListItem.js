import {Avatar, Card, Container, makeStyles, Typography} from "@material-ui/core";
import image from '../uploads/user.png';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import {useHistory} from "react-router";

export const FeedbackListItem = props => {

    const useClasses = makeStyles((theme) => ({
        paper: {
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            padding: '1em'
        },
        img: {
            width: '10vh',
            height: '10vh'
        },
        content: {
            height: '100%',
            padding: '0',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
        },
        p: {
            padding: 0
        },
        feedbackTop: {
            display: 'flex',
            justifyContent: 'space-between'
        },
        stars: {
            color: '#FFD700',
        },
        feedbackAuthorLabel: {

        }
    }));
    const classes = useClasses();
    const history = useHistory();

    let starsArray = [];
    for(let i = 0 ; i < 5; i++) {
        i <= props.stars ? starsArray[i] = true : starsArray[i] = false;
    }

    const handleAuthorClick = () => {
        history.replace('/users/' + props.authorId + '/profile');
    }

    return (
        <Card className={classes.paper}>
            <Avatar src={image} alt={''} className={classes.img} />
            <Container className={classes.content} style={{padding: '1em'}}>
                <Typography className={classes.feedbackTop}>
                    <Typography variant={'h6'} onClick={handleAuthorClick} className={classes.feedbackAuthorLabel}>
                        {props.author}
                    </Typography>
                    <div className={classes.stars}>
                        {
                            starsArray.map(star => {
                                if(star)
                                    return (
                                        <StarIcon />
                                    )
                                else
                                    return (
                                        <StarBorderIcon />
                                    )
                            })
                        }
                    </div>
                </Typography>
                <Typography variant={'body1'}>
                    {props.content}
                </Typography>
            </Container>
        </Card>
    )
}
