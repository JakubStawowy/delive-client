import {Button, Card, Grid, makeStyles, Typography} from "@material-ui/core";
import {flexComponents, paddingComponents, sizeComponents} from "../style/components";

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import boxIcon from '../uploads/box.png';
import deliveryTruckIcon from '../uploads/delivery-truck.png';
import {statements} from "../data/i18n/statements";

export const AnnouncementType = () => {

    const newOfferItems = statements[localStorage.getItem('locale') !== undefined ? localStorage.getItem('locale') : 'en'].newOffer;
    const flex = flexComponents();
    const size = sizeComponents();
    const padding = paddingComponents();
    const useStyles = makeStyles(((theme)=>({
        icon: {
            width: '15vw'
        }
    })));

    const styles = useStyles();

    return (
        <Grid container className={`${flex.flexRowSpaceAround} ${size.bodyHeight}`}>
            <Card className={`${padding.padding} ${flex.flexColumnSpaceAround}`}>
                <Typography variant={'h4'}>
                    {newOfferItems.normalOffer}
                </Typography>
                <img src={boxIcon} alt={''} className={styles.icon}/>
                <Button >
                    <ArrowForwardIcon fontSize={'large'}/>
                </Button>
            </Card>
            <Card className={`${padding.padding} ${flex.flexColumnSpaceAround}`}>
                <Typography variant={'h4'}>
                    {newOfferItems.deliveryOffer}
                </Typography>
                <img src={deliveryTruckIcon} alt={''} className={styles.icon}/>
                <Button>
                    <ArrowForwardIcon fontSize={'large'}/>
                </Button>
            </Card>
        </Grid>
    )
}
