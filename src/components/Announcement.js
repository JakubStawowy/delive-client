import {Button, Card, makeStyles, Modal, Typography} from "@material-ui/core";
import {flexComponents, paddingComponents} from "../style/components";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import SettingsIcon from '@material-ui/icons/Settings';
import {i18n} from "../data/i18n";
import {USER_ID} from "../consts/applicationConsts";
import MapIcon from '@material-ui/icons/Map';
import {MapModal} from "./MapModal";
import {useEffect, useState} from "react";
import boxIcon from "../uploads/box.png";
import deliveryTruckIcon from "../uploads/delivery-truck.png";
import {useHistory} from "react-router";
import {PackagesModal} from "./PackagesModal";

export const Announcement = (props) => {

    const history = useHistory();
    const [mapModalOpened, setMapModalOpened] = useState(false);
    const [packagesModalOpened, setPackagesModalOpened] = useState(false);
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

    const handleRegisterCommission = () => history.push('/announcement/' + props.data.id);

    return (
        <Card className={`${paddingClasses.paddingMedium} ${classes.announcement} ${flexClasses.flexRowSpaceBetween}`}>

            <Modal
                className={flexClasses.flexRowCenter}
                centered open={mapModalOpened}
                children={<MapModal
                    setModalOpened={setMapModalOpened}
                    coordinates={{
                        fromLatitude: parseFloat(props.data.destinationFrom.latitude),
                        fromLongitude: parseFloat(props.data.destinationFrom.longitude),
                        toLatitude: parseFloat(props.data.destinationTo.latitude),
                        toLongitude: parseFloat(props.data.destinationTo.longitude),
                    }}
                />}
                onClose={()=>setMapModalOpened(false)}
            />
            <Modal
                className={flexClasses.flexRowCenter}
                centered open={packagesModalOpened}
                children={<PackagesModal
                    packages={props.data.packages}
                    setPackagesModalOpened={setPackagesModalOpened}
                />}
                onClose={()=>setPackagesModalOpened(false)}
            />
            <Typography variant={'body2'}>
                {
                    // props.data.date === null ?
                    <img src={boxIcon} alt={''}  className={classes.icon}/>
                    //     :
                    // <div className={flexClasses.flexRowSpaceAround}>
                    //     <img src={deliveryTruckIcon} alt={''} className={classes.icon}/>
                    //     {
                    //         props.data.date.replace('T', ' ')
                    //     }
                    // </div>
                }
            </Typography>

            <Typography variant={'body2'}>
                <div className={flexClasses.flexColumnSpaceBetween}>
                    <div>
                        from: {`${props.data.destinationFrom.address}, ${props.data.destinationFrom.locality}, ${props.data.destinationFrom.country}`}
                    </div>
                    <div>
                        to: {`${props.data.destinationTo.address}, ${props.data.destinationTo.locality}, ${props.data.destinationTo.country}`}
                    </div>
                </div>
            </Typography>
            <div>
                {
                    !props.delivery &&
                        <Button onClick={() => setPackagesModalOpened(true)}>
                            Packages
                        </Button>
                }
                <Button onClick={() => setMapModalOpened(true)}>
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
                    <Button onClick={() => handleRegisterCommission()}>
                        <ArrowForwardIcon />
                    </Button>
                }
            </div>
        </Card>
    )
}
