import {Button, Card, Grid, makeStyles, Typography} from "@material-ui/core";
import {flexComponents, paddingComponents, rwdComponents, sizeComponents} from "../style/components";

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import boxIcon from '../uploads/box.png';
import deliveryTruckIcon from '../uploads/delivery-truck.png';
import {i18n} from "../data/i18n";
import {StyleRoot} from "radium";
import {bounceOutLeft, bounceInRight} from "react-animations";
import {useHistory} from "react-router";
import {useState} from "react";
import {useAnimationStyles} from "../style/animation";
import {ANIMATION_TIME} from "../data/consts";

export const AnnouncementType = () => {

    const newOfferItems = i18n[
        localStorage.getItem('locale') !== undefined
        && localStorage.getItem('locale') !== null
            ? localStorage.getItem('locale') : 'en'].newOffer;
    const history = useHistory();
    const [bounce, setBounce] = useState(false);

    const useStyles = makeStyles((()=>({
        icon: {
            width: '15vw'
        },
        test: {
            padding: '3em',
            background: 'green'
        }
    })));
    const styles = useStyles();
    const flexClasses = flexComponents();
    const sizeClasses = sizeComponents();
    const rwdClasses = rwdComponents();
    const paddingClasses = paddingComponents();
    const bounceInAnimationStyles = useAnimationStyles(bounceInRight, ANIMATION_TIME);
    const bounceOutAnimationStyles = useAnimationStyles(bounceOutLeft, ANIMATION_TIME / 2);

    const navToAnnouncementForm = () => {
        setBounce(true);
        setTimeout(()=>history.push('/addAnnouncement/normal'), ANIMATION_TIME / 2);
    }

    return (
        <StyleRoot>
            <div style={bounce ? bounceOutAnimationStyles.animation : bounceInAnimationStyles.animation}>
                <Grid container className={`${flexClasses.flexRowSpaceAround} ${sizeClasses.bodyHeight}`}>
                    <Card className={`${paddingClasses.paddingMedium} ${flexClasses.flexColumnSpaceAround} ${rwdClasses.mobileCard}`}>
                        <Typography variant={'h4'}>
                            {newOfferItems.normalOffer}
                        </Typography>
                        <img src={boxIcon} alt={''} className={styles.icon}/>
                        <Button onClick={()=>navToAnnouncementForm()}>
                            <ArrowForwardIcon fontSize={'large'}/>
                        </Button>
                    </Card>
                    <Card className={`${paddingClasses.paddingMedium} ${flexClasses.flexColumnSpaceAround} ${rwdClasses.mobileCard}`}>
                        <Typography variant={'h4'}>
                            {newOfferItems.deliveryOffer}
                        </Typography>
                        <img src={deliveryTruckIcon} alt={''} className={styles.icon}/>
                        <Button onClick={()=>navToAnnouncementForm()}>
                            <ArrowForwardIcon fontSize={'large'}/>
                        </Button>
                    </Card>
                </Grid>
            </div>
        </StyleRoot>
    )
}
