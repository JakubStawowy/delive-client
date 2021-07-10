import {Card, Typography} from "@material-ui/core";
import {paddingComponents} from "../style/components";
import {appStyles} from '../style/appStyles';

export const Announcement = (props) => {

    const padding = paddingComponents();
    const styles = appStyles();

    return (
        <Card className={`${padding.padding} ${styles.announcement}`}>
            <Typography variant={'h4'}>
                {props.data.title}
            </Typography>
            <Typography variant={'text'}>
                Start: {props.data.start}<br/>
                End: {props.data.end}
            </Typography>

        </Card>
    )
}
