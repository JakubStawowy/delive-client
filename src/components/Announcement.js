import {Button, Card, Grid, makeStyles, Modal, Typography} from "@material-ui/core";
import {flexComponents, paddingComponents} from "../style/components";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import SettingsIcon from '@material-ui/icons/Settings';
import {i18n} from "../data/i18n";
import {USER_ID} from "../consts/ApplicationConsts";
import MapIcon from '@material-ui/icons/Map';
import {MapModal} from "./MapModal";
import {useState} from "react";
import boxIcon from "../uploads/box.png";
import deliveryTruckIcon from "../uploads/delivery-truck.png";

export const Announcement = (props) => {

    const [mapModalOpened, setMapModalOpened] = useState(false);
    const announcementItems = i18n[
        localStorage.getItem('locale') !== undefined
        && localStorage.getItem('locale') !== null
            ? localStorage.getItem('locale') : 'en'].announcement;

    const useStyles = makeStyles(((theme)=>({
        announcement: {
            width: '50vw',
            background: '#DCDCDC',
            [theme.breakpoints.down('xs')]: {
                width: '100%'
            }
        },
        icon: {
            width: '10vw'
        },
    })));
    const classes = useStyles();
    const paddingClasses = paddingComponents();
    const flexClasses = flexComponents();

    return (
        <Card className={`${paddingClasses.paddingMedium} ${classes.announcement} ${flexClasses.flexRowSpaceBetween}`}>

            <Modal
                // className={classes.modal}
                className={flexClasses.flexRowCenter}
                centered open={mapModalOpened}
                children={<MapModal
                    setModalOpened={setMapModalOpened}
                    coordinates={{
                        fromLatitude: parseFloat(props.data.fromLatitude),
                        fromLongitude: parseFloat(props.data.fromLongitude),
                        toLatitude: parseFloat(props.data.toLatitude),
                        toLongitude: parseFloat(props.data.toLongitude),
                    }}
                />}
                onClose={()=>setMapModalOpened(!mapModalOpened)}
            />
            <Typography variant={'body2'}>
                {
                    props.data.packageLength !== undefined &&
                    props.data.packageWidth !== undefined &&
                    props.data.packageHeight !== undefined &&
                    // props.data.date !== undefined &&
                    <div className={flexClasses.flexRowSpaceAround}>
                        <img src={boxIcon} alt={''}  className={classes.icon}/>
                        <div>
                            <div>
                                {`${announcementItems.length}: ${props.data.packageLength}`}
                            </div>
                            <div>
                                {`${announcementItems.width}: ${props.data.packageWidth}`}
                            </div>
                            <div>
                                {`${announcementItems.height}: ${props.data.packageHeight}`}
                            </div>
                        </div>
                    </div>
                }
                {
                    props.data.date !== undefined &&
                        <div className={flexClasses.flexRowSpaceAround}>
                            <img src={deliveryTruckIcon} alt={''} className={classes.icon}/>
                            {
                                props.data.date.replace('T', ' ')
                            }
                        </div>
                }
            </Typography>

            <div>
                <Button onClick={() => setMapModalOpened(!mapModalOpened)}>
                    <MapIcon />
                </Button>
                {
                    props.data.authorId === parseInt(localStorage.getItem(USER_ID)) &&
                    <Button>
                        <SettingsIcon />
                    </Button>
                }
                {
                    props.data.authorId !== parseInt(localStorage.getItem(USER_ID)) &&
                    <Button>
                        <ArrowForwardIcon />
                    </Button>
                }
            </div>
        </Card>
    )
}
