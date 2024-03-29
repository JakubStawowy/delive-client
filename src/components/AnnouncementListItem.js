import {Button, Card, makeStyles, Modal} from "@material-ui/core";
import {flexComponents, paddingComponents} from "../style/components";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import SettingsIcon from '@material-ui/icons/Settings';
import {i18n} from "../data/i18n";
import MapIcon from '@material-ui/icons/Map';
import {useState} from "react";
import boxIcon from "../uploads/box.png";
import {useHistory} from "react-router";
import {ModalTemplate} from "../templates/ModalTemplate";
import {PackagesList} from "./PackagesList";
import {MapItem} from "./MapItem";
import RoomIcon from "@material-ui/icons/Room";
import CheckIcon from "@material-ui/icons/Check";

export const AnnouncementListItem = (props) => {

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
                width: '100vw',
                flexDirection: 'column',
            }
        },
        icon: {
            width: '10vw',
            flex: 3,
            [theme.breakpoints.down('xs')]: {
                display: 'none'
            }
        },
        description: {
            flex: 8,
            [theme.breakpoints.down('xs')]: {
                padding: '1em'
            }
        },
        buttons: {
            flex: 1,
            [theme.breakpoints.down('xs')]: {
                flexDirection: 'row'
            }
        },
        dataElement: {
            borderBottom: '1px solid gray',
            padding: '.5em 0 .5em'
        },
        check: {
            color: 'green'
        }
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
                children={
                    <ModalTemplate
                        child={
                            <MapItem
                                coordinates={{
                                    fromLatitude: parseFloat(props.data.destinationFrom.latitude),
                                    fromLongitude: parseFloat(props.data.destinationFrom.longitude),
                                    toLatitude: parseFloat(props.data.destinationTo.latitude),
                                    toLongitude: parseFloat(props.data.destinationTo.longitude),
                                }}
                            />
                        }
                        action={setMapModalOpened}
                    />
                }
                onClose={()=>setMapModalOpened(false)}
            />
            <img src={boxIcon} alt={''}  className={`${classes.icon}`}/>
                <div className={`${classes.description}`}>
                    <div className={classes.dataElement}>
                        from: {`${props.data.destinationFrom.address}`}
                    </div>
                    <div className={classes.dataElement}>
                        to: {`${props.data.destinationTo.address}`}
                    </div>
                    <div className={classes.dataElement}>
                        packages weight: {`${props.data.weight}`} {`${props.data.weightUnit}`}
                    </div>
                    <div className={classes.dataElement}>
                        salary: {`${props.data.amount}`} EUR
                    </div>
                    {
                        props.data.requireTransportWithClient &&
                        <div className={classes.dataElement}>
                            <CheckIcon className={classes.check}/>
                            The client requires his participation in delivery
                        </div>
                    }
                </div>
            <div className={`${flexClasses.flexColumnSpaceBetween} ${classes.buttons}`}>
                <Button onClick={() => setMapModalOpened(true)}>
                    <RoomIcon />
                </Button>
                <Button onClick={() => handleRegisterCommission()}>
                    <ArrowForwardIcon />
                </Button>
            </div>
        </Card>
    )
}
