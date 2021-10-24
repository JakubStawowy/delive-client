import {StyleRoot} from "radium";

import React, {useEffect, useState} from "react";
import {flexComponents, listComponents, paddingComponents, rwdComponents, sizeComponents} from "../style/components";
import {Button, Card, List, Modal, Typography} from "@material-ui/core";
import {MapFormModal} from "./MapFormModal";
import {getAnnouncementById, getLoggedUserId} from "../actions/restActions";
import {useHistory} from "react-router";
import {PackagesModal} from "./PackagesModal";
import {ANIMATION_TIME} from "../data/consts";
import {LocationDetails} from "./LocationDetails";
import {ModalTemplate} from "../templates/ModalTemplate";
import {PackagesList} from "./PackagesList";
import {MapItem} from "./MapItem";
import {handleError} from "../actions/handlers";

export const Announcement = (props) => {

    const [announcement, setAnnouncement] = useState(null);
    const [locationModalOpened, setLocationModalOpened] = useState(false);
    const [currentLocationLongitude, setCurrentLocationLongitude] = useState(null);
    const [currentLocationLatitude, setCurrentLocationLatitude] = useState(null);
    const [loggedUserId, setLoggedUserId] = useState(null);

    const history = useHistory();
    const rwdClasses = rwdComponents();
    const flexClasses = flexComponents();
    const sizeClasses = sizeComponents();
    const paddingClasses = paddingComponents();
    const listClasses = listComponents();

    const navToCommissionForm = type => {
        setTimeout(() => history.push('/commission/' + type), ANIMATION_TIME / 2);
    }

    const handleRegisterCommission = () => navToCommissionForm(
        // announcement.date !== null ?
        //     'delivery/' + announcement.id + '/' + announcement.authorId :
        'normal/' + announcement.id + '/' + announcement.authorId);

    const handleOpenProfile = userId => history.push('/profile/' + userId);

    useEffect(() => {
        getLoggedUserId().then(response => setLoggedUserId(response.data)).catch(error => handleError(error, history));
        props.announcementId !== undefined ?
        getAnnouncementById(props.announcementId)
            .then(response => setAnnouncement(response.data))
            .catch(error => alert(error))
            :
        getAnnouncementById(props.match.params.announcementId)
            .then(response => setAnnouncement(response.data))
            .catch(error => alert(error));
    }, []);

    const openLocationFromDetails = () => {
        setCurrentLocationLatitude(announcement.destinationFrom.latitude);
        setCurrentLocationLongitude(announcement.destinationFrom.longitude);
        setLocationModalOpened(true);
    }

    const openLocationToDetails = () => {
        setCurrentLocationLatitude(announcement.destinationTo.latitude);
        setCurrentLocationLongitude(announcement.destinationTo.longitude);
        setLocationModalOpened(true);
    }

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
                                />}
                            action={setLocationModalOpened}
                        />}
                        onClose={()=>setLocationModalOpened(false)}
                    />
                    <Card
                        className={`${rwdClasses.biggerMobileCard} 
                        ${paddingClasses.paddingMedium}`}
                    >
                        <List className={`${listClasses.verticalList} 
                        ${flexClasses.flexColumnSpaceBetween}`}>
                            {
                                loggedUserId === announcement.authorId ?
                                <div>
                                    <Button variant={"contained"} onClick={() => handleRegisterCommission()}>
                                        Send request
                                    </Button>
                                    <Button variant={"contained"} onClick={() => handleOpenProfile(announcement.authorId)}>
                                        Author
                                    </Button>
                                </div>
                                    :
                                    // TODO
                                    <Button variant={"contained"}>
                                        Edit
                                    </Button>
                            }
                            {
                                announcement.packages.length !== 0 &&
                                <div>
                                    Packages to delivery
                                    <PackagesList
                                        packages={announcement.packages}
                                    />
                                </div>
                            }
                            <div>
                                <Button variant={"contained"} onClick={() => openLocationFromDetails()}>
                                    location from details
                                </Button>
                                <Button variant={"contained"} onClick={() => openLocationToDetails()}>
                                    location to details
                                </Button>
                            </div>
                            <div>
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
