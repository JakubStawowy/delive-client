import {StyleRoot} from "radium";
import React, {useEffect, useState} from "react";
import {flexComponents, listComponents, paddingComponents, rwdComponents, sizeComponents} from "../style/components";
import {Button, Card, List, makeStyles, Typography} from "@material-ui/core";
import {MapModal} from "./MapModal";
import {MapComponent} from "./MapComponent";
import {getAnnouncementById} from "../actions/restActions";
import {handleError} from "../actions/handlers";
import {useHistory} from "react-router";
import {PackagesModal} from "./PackagesModal";
import {ANIMATION_TIME} from "../data/consts";
import {trimDate} from "../actions/commonFunctions";

export const AnnouncementPage = (props) => {

    const [announcement, setAnnouncement] = useState(null);
    const history = useHistory();
    const useClasses = makeStyles(((theme)=>({
        map: {
            width: '30vw'
        }
    })));
    const classes = useClasses();
    const rwdClasses = rwdComponents();
    const flexClasses = flexComponents();
    const sizeClasses = sizeComponents();
    const paddingClasses = paddingComponents();
    const listClasses = listComponents();

    const navToCommissionForm = type => {
        setTimeout(() => history.push('/commission/' + type), ANIMATION_TIME / 2);
    }

    const handleRegisterCommission = () => navToCommissionForm(announcement.date !== undefined ?
            'delivery/' + announcement.announcementId + '/' + announcement.authorId : 'normal/' + announcement.announcementId + '/' + announcement.authorId);

    const handleOpenProfile = userId => history.push('/profile/' + userId);
    useEffect(() => {
        getAnnouncementById(props.match.params.announcementId)
            .then(response => setAnnouncement(response.data))
            .catch(error => alert(error));
    }, []);

    return (
        <StyleRoot>
            {
                announcement !== null &&
                <div className={`${flexClasses.flexRowSpaceAround} ${sizeClasses.bodyHeight}`}>
                    <Typography>
                        <Card
                            className={`
                            ${rwdClasses.biggerMobileCard} 
                            ${paddingClasses.paddingMedium}
                            `}
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
