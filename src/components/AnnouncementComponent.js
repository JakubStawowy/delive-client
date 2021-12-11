import {Button, Card, List, makeStyles, Modal, TextField} from "@material-ui/core";
import {ModalTemplate} from "../templates/ModalTemplate";
import {DeliveryForm} from "./DeliveryForm";
import {ProfileComponent} from "./ProfileComponent";
import {PackagesList} from "./PackagesList";
import {MapItem} from "./MapItem";
import React, {useEffect, useState} from "react";
import {useHistory} from "react-router";
import {flexComponents, listComponents, paddingComponents, rwdComponents, sizeComponents} from "../style/components";
import {deleteAnnouncement, getAnnouncementById, getLoggedUserId} from "../rest/restActions";
import {handleError} from "../actions/handlers";

export const AnnouncementComponent = props => {

    const [announcement, setAnnouncement] = useState(null);
    const [deliveryFormModalOpened, setDeliveryFormModalOpened] = useState(false);
    const [currentLocationLongitude, setCurrentLocationLongitude] = useState(null);
    const [currentLocationLatitude, setCurrentLocationLatitude] = useState(null);
    const [loggedUserId, setLoggedUserId] = useState(null);
    const [isToRemove, setIsToRemove] = useState(false);
    const [confirmDeleteLabel, setConfirmDeleteLabel] = useState('');
    const [profileModalOpened, setProfileModalOpened] = useState(false);

    const useClasses = makeStyles(((theme) => ({

        dataElement: {
            borderBottom: '1px solid gray',
            padding: '.5em 0 .5em'
        }
    })));
    const classes = useClasses();
    const history = useHistory();
    const rwdClasses = rwdComponents();
    const flexClasses = flexComponents();
    const sizeClasses = sizeComponents();
    const paddingClasses = paddingComponents();
    const listClasses = listComponents();

    const handleDeleteAnnouncement = announcementId => {
        deleteAnnouncement(announcementId).then(() => {
            alert("AnnouncementPage removed successfully");
            history.push('/home');
        }).catch(error => handleError(error, history, props.setLogged));
    }

    useEffect(() => {
        getLoggedUserId().then(response => setLoggedUserId(response.data))
            .catch(error => handleError(error, history, props.setLogged));
            getAnnouncementById(props.announcementId)
                .then(response => setAnnouncement(response.data))
                .catch(error => alert(error))
    }, []);

    return (
        <div>
            {

                announcement !== null &&
                <div>
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
                                    // connect={props.connect}
                                />
                            }
                            action={setDeliveryFormModalOpened}
                        />}
                        onClose={()=>setDeliveryFormModalOpened(false)}
                    />

                    <Modal
                        className={flexClasses.flexRowCenter}
                        centered open={profileModalOpened}
                        children={
                            <ModalTemplate
                                action={setProfileModalOpened}
                                child={
                                    <ProfileComponent
                                        userId={announcement.authorId}
                                        setLogged={props.setLogged}
                                    />
                                }
                            />
                        }
                        onClose={()=>setProfileModalOpened(false)}
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
                                        <Button variant={"contained"} onClick={() => setProfileModalOpened(true)}>
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
                                        weightUnit={announcement.weightUnit}
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
        </div>)
}
