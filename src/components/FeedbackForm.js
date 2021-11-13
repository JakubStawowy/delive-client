import {Button, Card, makeStyles, TextareaAutosize, TextField} from "@material-ui/core";
import {flexComponents, paddingComponents} from "../style/components";
import StarIcon from "@material-ui/icons/Star";
import {useState} from "react";
import {sendFeedback} from "../rest/restActions";
import {handleError} from "../actions/handlers";
import {useHistory} from "react-router";

export const FeedbackForm = props => {

    const history = useHistory();
    const indexes = [0, 1, 2, 3, 4];
    const [feedbackMessage, setFeedbackMessage] = useState('I can recommend this user!');
    const [rate, setRate] = useState(null);
    const useClasses = makeStyles(((theme) => ({
        star: {
            color: '#DCDCDC',
            cursor: 'pointer'
        },
        starHovered: {
            color: '#FFD700'
        },
        starsSection: {
            margin: '1em 0 1em'
        }
    })));
    const classes = useClasses();
    const paddingClasses = paddingComponents();
    const flexClasses = flexComponents();

    const onHoverEvent = index => {
        for (let i = 0; i <= index; i++) {
            document.getElementById('star' + i).classList.add(classes.starHovered);
        }
        for (let i = index + 1; i <= 4; i++) {
            document.getElementById('star' + i).classList.remove(classes.starHovered);
        }
    }

    const onHoverOutOfDivEvent = () => {
        if (rate === null) {
            for (let i = 0; i <= 4; i++) {
                document.getElementById('star' + i).classList.remove(classes.starHovered);
            }
        }
        else {
            onHoverEvent(rate);
        }
    }

    const handleOnStarClick = index => {
        setRate(index);
        onHoverEvent(index);
    }


    const handleSendFeedback = () => {
        sendFeedback({
            content: feedbackMessage,
            rate,
            userId: props.userId,
            messageId: props.messageId
        }).then(() => {
            alert("Feedback sent");
            props.setFeedbackFromModalOpened(false);
            props.refresh();
        })
            .catch(error => handleError(error, history, props.setLogged));
    }

    return (
        <Card className={`${paddingClasses.paddingMedium} ${flexClasses.flexColumnSpaceBetween}`}>
            <TextareaAutosize
                className={`${paddingClasses.paddingSmall}`}
                value={feedbackMessage}
                onChange={e => setFeedbackMessage(e.target.value)}
            />
            <div
                className={classes.starsSection}
                onMouseOut={() => onHoverOutOfDivEvent()}>
                {
                    indexes.map(index =>
                        <StarIcon
                            id={'star' + index}
                            className={classes.star}
                            fontSize={"large"}
                            onMouseOver={() => onHoverEvent(index)}
                            // onMouseOut={() => onHoverOutEvent(index)}
                            onClick={() => handleOnStarClick(index)}
                        />)
                }
            </div>
            <Button
                variant={"contained"}
                onClick={() => handleSendFeedback()}
            >Send</Button>
        </Card>
    )
}
