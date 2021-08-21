import {Button, Card, makeStyles, Typography} from "@material-ui/core";
import {flexComponents, paddingComponents} from "../style/components";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import SettingsIcon from '@material-ui/icons/Settings';
import {i18n} from "../data/i18n";

export const NormalAnnouncement = (props) => {

    const announcementItems = i18n[
        localStorage.getItem('locale') !== undefined
        && localStorage.getItem('locale') !== null
            ? localStorage.getItem('locale') : 'en'].announcement;

    const useStyles = makeStyles(((theme)=>({
        announcement: {
            width: '50vw',
            [theme.breakpoints.down('xs')]: {
                width: '100%'
            }
        }
    })));
    const classes = useStyles();
    const paddingClasses = paddingComponents();
    const flexClasses = flexComponents();

    return (
        <Card className={`${paddingClasses.paddingMedium} ${classes.announcement} ${flexClasses.flexRowSpaceBetween}`}>
            <div>
                <Typography variant={'h4'}>
                    {props.data.fromLatitude}
                </Typography>
                <Typography variant={'text'}>

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
