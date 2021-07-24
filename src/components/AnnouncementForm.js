import {Button, Card, Grid, makeStyles, Modal, TextField, Typography} from "@material-ui/core";
import {
    flexComponents,
    paddingComponents,
    rwdComponents,
    sizeComponents
} from "../style/components";

import RoomIcon from '@material-ui/icons/Room';
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import {i18n} from "../data/i18n";
import {StyleRoot} from "radium";
import {bounceInRight, bounceOutLeft} from "react-animations";
import {useAnimationStyles} from "../style/animation";
import {useState} from "react";
import {useHistory} from "react-router";
import {ANIMATION_TIME} from "../data/consts";
import {MapModal} from "./MapModal";

export const AnnouncementForm = () => {

    const announcementFormItems = i18n[
        localStorage.getItem('locale') !== undefined
        && localStorage.getItem('locale') !== null
            ? localStorage.getItem('locale') : 'en'].announcementForm;
    const [bounce, setBounce] = useState(false);
    const [modalOpened, setModalOpened] = useState(false);
    const history = useHistory();

    const styles = makeStyles((()=>({
        datePicker: {
            borderRadius: '10px',
        },
        card: {
            height: '70vh'
        },
        modal: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }
    })))
    const classes = styles();
    const flexClasses = flexComponents();
    const paddingClasses = paddingComponents();
    const sizeClasses = sizeComponents();
    const rwdClasses = rwdComponents();
    const bounceInAnimationStyles = useAnimationStyles(bounceInRight, ANIMATION_TIME);
    const bounceOutAnimationStyles = useAnimationStyles(bounceOutLeft, ANIMATION_TIME / 2);

    const handleSubmit = () => {
        setBounce(true);
        setTimeout(()=>history.push('/home'), ANIMATION_TIME / 2);
    };

    return (
        <StyleRoot>
            <div style={bounce ? bounceOutAnimationStyles.animation : bounceInAnimationStyles.animation}>

                <Grid container className={`${flexClasses.flexRowSpaceAround} ${sizeClasses.bodyHeight}`}>
                    <Modal className={classes.modal} centered open={modalOpened} children={<MapModal setModalOpened={setModalOpened}/>} onClose={()=>setModalOpened(!modalOpened)}/>
                    <Card className={`${paddingClasses.paddingMedium} ${flexClasses.flexColumnSpaceBetween} ${classes.card} ${rwdClasses.singleMobileCard}`}>
                        <Typography variant={'h5'} className={`${flexClasses.flexRowSpaceAround} ${sizeClasses.fullWidth}`}>
                            {announcementFormItems.destination.destinations}
                            <Button variant={'contained'} onClick={()=>setModalOpened(true)}>
                                <RoomIcon color={'secondary'}/>
                                {announcementFormItems.destination.from}
                            </Button>

                            <Button variant={'contained'} onClick={()=>setModalOpened(true)}>
                                <RoomIcon color={'secondary'}/>
                                {announcementFormItems.destination.to}
                            </Button>
                        </Typography>
                        <Typography variant={'h5'} className={`${flexClasses.flexRowSpaceAround} ${sizeClasses.fullWidth}`}>
                            {announcementFormItems.length}
                            <TextField label={'x'} />
                        </Typography>
                        <Typography variant={'h5'} className={`${flexClasses.flexRowSpaceAround} ${sizeClasses.fullWidth}`}>
                            {announcementFormItems.width}
                            <TextField label={'x'} />
                        </Typography>
                        <Typography variant={'h5'} className={`${flexClasses.flexRowSpaceAround} ${sizeClasses.fullWidth}`}>
                            {announcementFormItems.height}
                            <TextField label={'x'} />
                        </Typography>
                        <Typography variant={'h5'} className={`${flexClasses.flexRowSpaceAround} ${sizeClasses.fullWidth}`}>
                            {announcementFormItems.date}
                            <input type={'date'} className={`${classes.datePicker} ${paddingClasses.paddingSmall}`}/>
                            <input type={'time'} className={`${classes.datePicker} ${paddingClasses.paddingSmall}`}/>
                        </Typography>
                        <Button variant={'contained'} onClick={()=>handleSubmit()}>
                            {announcementFormItems.submit}
                            <ArrowForwardIcon fontSize={'large'}/>
                        </Button>
                    </Card>
                </Grid>
            </div>
        </StyleRoot>
    )
}
