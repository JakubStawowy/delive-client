import {Button, Card, Typography} from "@material-ui/core";
import {flexComponents, paddingComponents} from "../style/components";
import {appStyles} from '../style/appStyles';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import SettingsIcon from '@material-ui/icons/Settings';
import {statements} from "../data/i18n/statements";

export const Announcement = (props) => {

    const announcementItems = statements[localStorage.getItem('locale') !== undefined ? localStorage.getItem('locale') : 'en'].announcement;
    const padding = paddingComponents();
    const styles = appStyles();
    const flex = flexComponents();

    return (
        <Card className={`${padding.padding} ${styles.announcement} ${flex.flexRowSpaceBetween}`}>
            <div>
                <Typography variant={'h4'}>
                    {props.data.title}
                </Typography>
                <Typography variant={'text'}>
                    {announcementItems.from}: {props.data.start}<br/>
                    {announcementItems.to}: {props.data.end}
                </Typography>
            </div>
            <div>
                <Button>
                    <SettingsIcon />
                </Button>
                <Button>
                    <ArrowForwardIcon />
                </Button>
            </div>
        </Card>
    )
}
