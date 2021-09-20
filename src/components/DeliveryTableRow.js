import {Button, Card, Modal, TableCell, TableRow} from "@material-ui/core";
import {getNextActionName, trimDate} from "../actions/functions";
import {PackagesModal} from "./PackagesModal";
import {MapModal} from "./MapModal";
import {flexComponents} from "../style/components";
import {useEffect, useState} from "react";
import {USER_ID, WAITING} from "../consts/ApplicationConsts";
import {changeDeliveryState} from "../actions/restActions";
import {handleError} from "../actions/handlers";
import {useHistory} from "react-router";

export const DeliveryTableRow = (props) => {

    const history = useHistory();
    const [packagesModalOpened, setPackagesModalOpened] = useState(false);
    const [fromLocalizationModalOpened, setFromLocalizationModalOpened] = useState(false);
    const [toLocalizationModalOpened, setToLocalizationModalOpened] = useState(false);
    const flexClasses = flexComponents();
    const actionName = getNextActionName(props.delivery.deliveryState,
        parseInt(localStorage.getItem(USER_ID)) === props.delivery.announcement.authorId);

    return (
        <TableRow>
            <Modal
                className={flexClasses.flexRowCenter}
                centered open={packagesModalOpened}
                children={<PackagesModal
                    packages={props.delivery.announcement.packages}
                    setPackagesModalOpened={setPackagesModalOpened}
                />}
                onClose={()=>setPackagesModalOpened(false)}
            />
            <Modal
                className={flexClasses.flexRowCenter}
                centered open={fromLocalizationModalOpened}
                children={<MapModal
                    setModalOpened={setFromLocalizationModalOpened}
                    latitude={props.delivery.announcement.destinationFrom.latitude}
                    longitude={props.delivery.announcement.destinationFrom.longitude}
                />}
                onClose={()=>setFromLocalizationModalOpened(false)}
            />
            <Modal
                className={flexClasses.flexRowCenter}
                centered open={toLocalizationModalOpened}
                children={<MapModal
                    setModalOpened={setToLocalizationModalOpened}
                    latitude={props.delivery.announcement.destinationTo.latitude}
                    longitude={props.delivery.announcement.destinationTo.longitude}
                />}
                onClose={()=>setToLocalizationModalOpened(false)}
            />
            <TableCell align={"center"}>
                {props.delivery.announcement.announcementId}
            </TableCell>
            <TableCell align={"center"}>
                {trimDate(props.delivery.registeredAt)}
            </TableCell>
            <TableCell align={"center"}>
                <Button
                    variant={"contained"}
                    onClick={() => setPackagesModalOpened(true)}
                    disabled={props.delivery.announcement.packages.length === 0}
                >
                    Check
                </Button>
            </TableCell>
            <TableCell align={"center"}>
                {
                    <Button variant={"contained"} onClick={() => setFromLocalizationModalOpened(true)}>
                        Check
                    </Button>
                }
            </TableCell>
            <TableCell align={"center"}>
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
                    <Button variant={"contained"}
                        onClick={() => {
                            changeDeliveryState(actionName, props.delivery.deliveryId)
                                .then(() => {
                                    alert("Delivery state changed");
                                    props.refresh();
                                }).catch(error => handleError(error, history));
                        }}
                        disabled={actionName === WAITING || actionName === '-'}
                    >
                        {actionName}
                    </Button>
                }
            </TableCell>
        </TableRow>
    )
}
