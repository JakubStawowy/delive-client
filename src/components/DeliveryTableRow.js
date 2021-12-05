import {Button, Card, makeStyles, Modal, TableCell, TableRow} from "@material-ui/core";
import {flexComponents} from "../style/components";
import {useEffect, useState} from "react";
import {WAITING} from "../consts/applicationConsts";
import {changeDeliveryState, getNextActionName} from "../rest/restActions";
import {handleError, sendMessage} from "../actions/handlers";
import {useHistory} from "react-router";
import {ModalTemplate} from "../templates/ModalTemplate";
import {Announcement} from "./Announcement";
import {PackagesList} from "./PackagesList";
import {MapItem} from "./MapItem";
import {trimDate} from "../actions/commonFunctions";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import {getConfig} from "../rest/restActions";
import {BASE_URL} from "../rest/urlConsts";
import {TOKEN} from "../consts/applicationConsts";

export const DeliveryTableRow = (props) => {

    const history = useHistory();
    const [announcementModalOpened, setAnnouncementModalOpened] = useState(false);
    const [packagesModalOpened, setPackagesModalOpened] = useState(false);
    const [fromLocalizationModalOpened, setFromLocalizationModalOpened] = useState(false);
    const [toLocalizationModalOpened, setToLocalizationModalOpened] = useState(false);
    const [actionNames, setActionNames] = useState([]);

    const useStyles = makeStyles(((theme)=>({
        package: {
            background: '#FFE4C4'
        },
        modalChild: {
            borderBottomRightRadius: 0,
            borderBottomLeftRadius: 0
        },
        hiddenColumn: {
            [theme.breakpoints.down('xs')]: {
                display: 'none'
            }
        }
    })));
    const classes = useStyles();
    const flexClasses = flexComponents();

    const handleChangeDeliveryState = (actionName) => {

        if (actionName === 'finish') {
            navigator.geolocation.getCurrentPosition(position => {
                changeDeliveryState(actionName, props.delivery.id, position.coords.latitude, position.coords.longitude)
                    .then(() => {
                        alert("Delivery state changed __");
                        props.refresh();
                    }).catch(error => handleError(error, history, props.setLogged));
            }, ()=> {
                alert('Problems with geolocation occurred');
                changeDeliveryState(actionName, props.delivery.id, 0, 0)
                    .then(() => {
                        alert("Delivery state changed __");
                        props.refresh();
                    }).catch(error => handleError(error, history, props.setLogged));
            });
            sendMessage(props.delivery.announcement.authorId, "Deliverer rached the destination");
        } else {
            if (actionName === 'toStart') {
                sendMessage(props.delivery.announcement.authorId, "Deliverer has arrived to initial location");
            }
            if (actionName === 'start') {
                sendMessage(props.delivery.delivererId, "Delivery started");
            }

            if (actionName === 'close' || actionName === 'discard' || actionName === 'accept') {
                sendMessage(props.delivery.delivererId);
            }

            changeDeliveryState(actionName, props.delivery.id)
                .then(() => {
                    alert("Delivery state changed");
                    props.refresh();
                }).catch(error => handleError(error, history, props.setLogged));
        }
    }

    useEffect(() => {
        getNextActionName(props.delivery.deliveryState,
            props.delivery.announcement.authorId,
            props.delivery.delivererId).then(response => setActionNames(response.data))
            .catch(error => handleError(error, history, props.setLogged));
    }, []);

    return (
        <TableRow>
            <Modal
                className={flexClasses.flexRowCenter}
                centered open={packagesModalOpened}
                children={<ModalTemplate
                    child={<Card className={classes.modalChild}>
                        <PackagesList
                            packages={props.delivery.announcement.packages}
                        />
                    </Card>}
                    action={setPackagesModalOpened}
                />}
                onClose={()=>setPackagesModalOpened(false)}
            />
            <Modal
                className={flexClasses.flexRowCenter}
                centered open={fromLocalizationModalOpened}
                children={
                    <ModalTemplate
                        child={
                            <MapItem
                                latitude={props.delivery.announcement.destinationFrom.latitude}
                                longitude={props.delivery.announcement.destinationFrom.longitude}
                            />
                        }
                        action={setFromLocalizationModalOpened}
                    />
                }
                onClose={()=>setFromLocalizationModalOpened(false)}
            />
            <Modal
                className={flexClasses.flexRowCenter}
                centered open={toLocalizationModalOpened}
                children={
                    <ModalTemplate
                        child={
                            <MapItem
                                latitude={props.delivery.announcement.destinationTo.latitude}
                                longitude={props.delivery.announcement.destinationTo.longitude}
                            />
                        }
                        action={setToLocalizationModalOpened}
                    />
                }
                onClose={()=>setToLocalizationModalOpened(false)}
            />
            <Modal
                className={flexClasses.flexRowCenter}
                centered open={announcementModalOpened}
                children={
                    <ModalTemplate
                        action={setAnnouncementModalOpened}
                        child={
                            <Announcement
                                announcementId={props.delivery.announcement.id}
                            />
                        }
                    />
                }
                onClose={()=>setAnnouncementModalOpened(false)}
            />
            <TableCell align={"center"}>
                <Button
                    variant={"contained"}
                    onClick={() => setAnnouncementModalOpened(true)}
                >
                    Check
                </Button>

            </TableCell>
            <TableCell align={"center"}>
                {trimDate(props.delivery.createdAt)}
            </TableCell>
            <TableCell
                align={"center"}
                className={classes.hiddenColumn}
            >
                <Button
                    variant={"contained"}
                    onClick={() => setPackagesModalOpened(true)}
                    disabled={props.delivery.announcement.packages.length === 0}
                >
                    Check
                </Button>
            </TableCell>
            <TableCell
                align={"center"}
                className={classes.hiddenColumn}
            >
                {
                    <Button variant={"contained"} onClick={() => setFromLocalizationModalOpened(true)}>
                        Check
                    </Button>
                }
            </TableCell>
            <TableCell
                align={"center"}
                className={classes.hiddenColumn}
            >
                {
                    <Button variant={"contained"} onClick={() => setToLocalizationModalOpened(true)}>
                        Check
                    </Button>
                }
            </TableCell>
            <TableCell align={"center"}>
                {props.delivery.deliveryState}
            </TableCell>
            <TableCell align={"center"}>
                {
                    actionNames.map(actionName => {
                        return (
                            <Button variant={"contained"}
                                    onClick={() => handleChangeDeliveryState(actionName.value)}
                                    disabled={actionName.value === WAITING || actionName.value === '-'}
                            >
                                {actionName.label}
                            </Button>
                        )
                    })
                }
            </TableCell>
        </TableRow>
    )
}
