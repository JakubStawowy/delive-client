import {StyleRoot} from "radium";

import React, {useEffect, useState} from "react";
import {flexComponents, listComponents, paddingComponents, rwdComponents, sizeComponents} from "../style/components";
import {Button, Card, List, makeStyles, Modal, TextField} from "@material-ui/core";
import {getAnnouncementById, getLoggedUserId, deleteAnnouncement} from "../rest/restActions";
import {useHistory} from "react-router";
import {ANIMATION_TIME} from "../data/consts";
import {LocationDetails} from "./LocationDetails";
import {ModalTemplate} from "../templates/ModalTemplate";
import {PackagesList} from "./PackagesList";
import {MapItem} from "./MapItem";
import {handleError} from "../actions/handlers";
import {DeliveryForm} from "./DeliveryForm";

export const Announcement = (props) => {

    const [announcement, setAnnouncement] = useState(null);
    const [locationModalOpened, setLocationModalOpened] = useState(false);
    const [deliveryFormModalOpened, setDeliveryFormModalOpened] = useState(false);
    const [currentLocationLongitude, setCurrentLocationLongitude] = useState(null);
    const [currentLocationLatitude, setCurrentLocationLatitude] = useState(null);
    const [loggedUserId, setLoggedUserId] = useState(null);
    const [isToRemove, setIsToRemove] = useState(false);
    const [confirmDeleteLabel, setConfirmDeleteLabel] = useState('');

    const useClasses = makeStyles(((theme) => ({

    })));
    const classes = useClasses();
    const history = useHistory();
    const rwdClasses = rwdComponents();
    const flexClasses = flexComponents();
    const sizeClasses = sizeComponents();
    const paddingClasses = paddingComponents();
    const listClasses = listComponents();

    const handleOpenProfile = userId => history.push('/profile/' + userId);

    const handleDeleteAnnouncement = announcementId => {
        deleteAnnouncement(announcementId).then(() => {
            alert("Announcement removed successfully");
            history.push('/home');
        }).catch(error => handleError(error, history, props.setLogged));
    }

    useEffect(() => {
        getLoggedUserId().then(response => setLoggedUserId(response.data))
            .catch(error => handleError(error, history, props.setLogged));
        props.announcementId !== undefined ?
        getAnnouncementById(props.announcementId)
            .then(response => setAnnouncement(response.data))
            .catch(error => alert(error))
            :
        getAnnouncementById(props.match.params.announcementId)
            .then(response => setAnnouncement(response.data))
            .catch(error => alert(error));
    }, []);

    return (
        <StyleRoot>
            {
                announcement !== null &&
                <div className={`${flexClasses.flexRowSpaceAround} ${sizeClasses.bodyHeight}`}>
                    <Modal
                        className={flexClasses.flexRowCenter}
                        centered open={locationModalOpened}
                        children={<ModalTemplate
                            child={<LocationDetails
                                    longitude={currentLocationLongitude}
                                    latitude={currentLocationLatitude}
                                    setLogged={props.setLogged}
                                />}
                            action={setLocationModalOpened}
                        />}
                        onClose={()=>setLocationModalOpened(false)}
                    />
                    <Modal
                        className={flexClasses.flexRowCenter}
                        centered open={deliveryFormModalOpened}
                        children={<ModalTemplate
                            child={
                                <DeliveryForm
                                    setLogged={props.setLogged}
                                    setDeliveryModalOpened={setDeliveryFormModalOpened}
                                    announcementId={announcement.id}
                                    authorId={announcement.authorId}
                                />
                            }
                            action={setDeliveryFormModalOpened}
                        />}
                        onClose={()=>setDeliveryFormModalOpened(false)}
                    />

                    <Card
                        className={`${paddingClasses.paddingMedium}`}
                    >
                        <List className={`${listClasses.verticalList} 
                        ${flexClasses.flexColumnSpaceBetween}`}>
                            {
                                loggedUserId !== announcement.authorId ?
                                <div className={classes.listItem}>
                                    <Button variant={"contained"} onClick={() => setDeliveryFormModalOpened(true)}>
                                        Send request
                                    </Button>
                                    <Button variant={"contained"} onClick={() => handleOpenProfile(announcement.authorId)}>
                                        Author
                                    </Button>
                                </div>
                                    :
                                <div className={classes.listItem}>
                                    {
                                        !isToRemove ?
                                            <div>
                                                <Button variant={"contained"} onClick={() => history.push('/editAnnouncement/' + announcement.id)}>
                                                    Edit
                                                </Button>
                                                <Button variant={"contained"} onClick={() => setIsToRemove(true)}>
                                                    Remove
                                                </Button>
                                            </div>
                                        :
                                            <div className={flexClasses.flexColumnSpaceBetween}>
                                                Type REMOVE and confirm to remove announcement:
                                                <div className={flexClasses.flexRowSpaceBetween}>
                                                    <TextField
                                                        label={"REMOVE"}
                                                        value={confirmDeleteLabel}
                                                        onChange={e => setConfirmDeleteLabel(e.target.value)}
                                                    />
                                                    <Button
                                                        variant={"contained"}
                                                        disabled={confirmDeleteLabel !== "REMOVE"}
                                                        onClick={() => handleDeleteAnnouncement(announcement.id)}>
                                                        confirm
                                                    </Button>
                                                    <Button variant={"contained"} onClick={() => setIsToRemove(false)}>
                                                        cancel
                                                    </Button>
                                                </div>
                                            </div>
                                    }
                                </div>
                            }
                            {
                                announcement.packages.length !== 0 &&
                                <div className={classes.listItem}>
                                    Packages to delivery
                                    <PackagesList
                                        packages={announcement.packages}
                                    />
                                </div>
                            }
                            <div className={classes.listItem}>
                                <div className={classes.dataElement}>
                                    from: {`${announcement.destinationFrom.address}, ${announcement.destinationFrom.locality}, ${announcement.destinationFrom.country}`}
                                </div>
                                <div className={classes.dataElement}>
                                    to: {`${announcement.destinationTo.address}, ${announcement.destinationTo.locality}, ${announcement.destinationTo.country}`}
                                </div>
                                <div className={classes.dataElement}>
                                    salary: {`${announcement.amount}`}
                                </div>
                            </div>
                            <div className={classes.listItem}>
                                Destinations
                                <MapItem
                                    coordinates={
                                        {
                                            fromLongitude: parseFloat(announcement.destinationFrom.longitude),
                                            fromLatitude: parseFloat(announcement.destinationFrom.latitude),
                                            toLongitude: parseFloat(announcement.destinationTo.longitude),
                                            toLatitude: parseFloat(announcement.destinationTo.latitude)
                                        }
                                    }
                                />
                            </div>
                        </List>
                    </Card>
                </div>
            }
        </StyleRoot>

    )
}
