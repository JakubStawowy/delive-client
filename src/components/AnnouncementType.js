import {Button, Card, Grid, makeStyles, Typography} from "@material-ui/core";
import {flexComponents, paddingComponents, rwdComponents, sizeComponents} from "../style/components";

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import boxIcon from '../uploads/box.png';
import deliveryTruckIcon from '../uploads/delivery-truck.png';
import {statements} from "../data/i18n/statements";
import {NavLink} from "react-router-dom";

export const AnnouncementType = () => {

    const newOfferItems = statements[localStorage.getItem('locale') !== undefined ? localStorage.getItem('locale') : 'en'].newOffer;
    const flex = flexComponents();
    const size = sizeComponents();
    const rwd = rwdComponents();
    const padding = paddingComponents();
    const useStyles = makeStyles(((theme)=>({
        icon: {
            width: '15vw'
        }
    })));

    const styles = useStyles();

    return (
        <Grid container className={`${flex.flexRowSpaceAround} ${size.bodyHeight}`}>
            <Card className={`${padding.paddingMedium} ${flex.flexColumnSpaceAround} ${rwd.mobileCard}`}>
                <Typography variant={'h4'}>
                    {newOfferItems.normalOffer}
                </Typography>
                <img src={boxIcon} alt={''} className={styles.icon}/>
                <NavLink to={'/addAnnouncement/normal'}>
                    <Button>
                        <ArrowForwardIcon fontSize={'large'}/>
                    </Button>
                </NavLink>
            </Card>
            <Card className={`${padding.paddingMedium} ${flex.flexColumnSpaceAround} ${rwd.mobileCard}`}>
                <Typography variant={'h4'}>
                    {newOfferItems.deliveryOffer}
                </Typography>
                <img src={deliveryTruckIcon} alt={''} className={styles.icon}/>
                <NavLink to={'/addAnnouncement/delivery'}>
                    <Button>
                        <ArrowForwardIcon fontSize={'large'}/>
                    </Button>
                </NavLink>
            </Card>
        </Grid>
    )
}
