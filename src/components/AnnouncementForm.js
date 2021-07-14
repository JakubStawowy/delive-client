import {Button, Card, Fab, Grid, makeStyles, TextField, Typography} from "@material-ui/core";
import {
    flexComponents,
    listComponents,
    marginComponents,
    paddingComponents,
    rwdComponents,
    sizeComponents
} from "../style/components";

import RoomIcon from '@material-ui/icons/Room';
import {useState} from "react";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import {statements} from "../data/i18n/statements";

export const AnnouncementForm = (props) => {

    const announcementFormItems = statements[localStorage.getItem('locale') !== undefined ? localStorage.getItem('locale') : 'en'].announcementForm;
    const flex = flexComponents();
    const padding = paddingComponents();
    const size = sizeComponents();
    const list = listComponents();
    const rwd = rwdComponents();
    const styles = makeStyles(((theme)=>({
        datePicker: {
            borderRadius: '10px',
        },
        card: {
            height: '70vh'
        },
    })))
    const classes = styles();

    const [startDate, setStartDate] = useState();

    return (
        <Grid container className={`${flex.flexRowSpaceAround} ${size.bodyHeight}`}>
            <Card className={`${padding.paddingMedium} ${flex.flexColumnSpaceBetween} ${classes.card} ${rwd.singleMobileCard}`}>
                <Typography variant={'h5'} className={`${flex.flexRowSpaceAround} ${size.fullWidth}`}>
                    {announcementFormItems.destination.destinations}
                    <Button variant={'contained'}>
                        <RoomIcon color={'secondary'}/>
                        {announcementFormItems.destination.from}
                    </Button>
                    <Button variant={'contained'}>
                        <RoomIcon color={'secondary'}/>
                        {announcementFormItems.destination.to}
                    </Button>
                </Typography>
                <Typography variant={'h5'} className={`${flex.flexRowSpaceAround} ${size.fullWidth}`}>
                    {announcementFormItems.length}
                    <TextField label={'x'} />
                </Typography>
                <Typography variant={'h5'} className={`${flex.flexRowSpaceAround} ${size.fullWidth}`}>
                    {announcementFormItems.width}
                    <TextField label={'x'} />
                </Typography>
                <Typography variant={'h5'} className={`${flex.flexRowSpaceAround} ${size.fullWidth}`}>
                    {announcementFormItems.height}
                    <TextField label={'x'} />
                </Typography>
                <Typography variant={'h5'} className={`${flex.flexRowSpaceAround} ${size.fullWidth}`}>
                    {announcementFormItems.date}
                    <input type={'date'} className={`${classes.datePicker} ${padding.paddingSmall}`}/>
                </Typography>
                <Button variant={'contained'}>
                    {announcementFormItems.submit}
                    <ArrowForwardIcon fontSize={'large'}/>
                </Button>
            </Card>
        </Grid>
    )
}
