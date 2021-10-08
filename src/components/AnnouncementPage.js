import {StyleRoot} from "radium";

import React, {useEffect, useState} from "react";
import {flexComponents, listComponents, paddingComponents, rwdComponents, sizeComponents} from "../style/components";
import {Button, Card, List, Modal, Typography} from "@material-ui/core";
import {MapModal} from "./MapModal";
import {getAnnouncementById} from "../actions/restActions";
import {useHistory} from "react-router";
import {PackagesModal} from "./PackagesModal";
import {ANIMATION_TIME} from "../data/consts";
import {trimDate} from "../actions/commonFunctions";
import {LocationData} from "./LocationData";

export const AnnouncementPage = (props) => {

    const [announcement, setAnnouncement] = useState(null);
    const [locationModalOpened, setLocationModalOpened] = useState(false);
    const [currentLocationLongitude, setCurrentLocationLongitude] = useState(null);
    const [currentLocationLatitude, setCurrentLocationLatitude] = useState(null);

    const history = useHistory();
    const rwdClasses = rwdComponents();
    const flexClasses = flexComponents();
    const sizeClasses = sizeComponents();
    const paddingClasses = paddingComponents();
    const listClasses = listComponents();

    const navToCommissionForm = type => {
        setTimeout(() => history.push('/commission/' + type), ANIMATION_TIME / 2);
    }

    const handleRegisterCommission = () => navToCommissionForm(announcement.date !== null ?
            'delivery/' + announcement.id + '/' + announcement.authorId : 'normal/' + announcement.id + '/' + announcement.authorId);

    const handleOpenProfile = userId => history.push('/profile/' + userId);
    useEffect(() => {
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
                        children={<LocationData
                            longitude={currentLocationLongitude}
                            latitude={currentLocationLatitude}
                            action={setLocationModalOpened}
                        />}
                        onClose={()=>setLocationModalOpened(false)}
                    />
                    <Typography>
                        <Card
                            className={`${rwdClasses.biggerMobileCard} 
                            ${paddingClasses.paddingMedium}`}
                        >
                            <List className={`${listClasses.verticalList} 
                            ${flexClasses.flexColumnSpaceBetween}`}>
                                <div>
                                    <Button variant={"contained"} onClick={() => handleRegisterCommission()}>
                                        Send request
                                    </Button>
                                    <Button variant={"contained"} onClick={() => handleOpenProfile(announcement.authorId)}>
                                        Author
                                    </Button>
                                </div>
                                {
                                    announcement.packages.length !== 0 &&
                                    <div>
                                        Packages to delivery
                                        <PackagesModal
                                            packages={announcement.packages}
                                        />
                                    </div>
                                }
                                {
                                    announcement.date !== null && <div>
                                        {trimDate(announcement.date)}
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
                                    <MapModal
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
                    </Typography>
                </div>
            }
        </StyleRoot>

    )
}
