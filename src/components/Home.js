import {AppBar, Button, Card, List, ListItem, makeStyles, Tab, Tabs} from "@material-ui/core";
import {flexComponents, listComponents, paddingComponents, rwdComponents, sizeComponents} from "../style/components";
import {announcements} from "../testData/announcements";
import {Announcement} from "./Announcement";
import {useEffect, useState} from "react";
import {BounceLoader} from "react-spinners";
import {StyleRoot} from "radium";
import {fadeInDown, fadeIn} from "react-animations";
import {useAnimationStyles} from "../style/animation";
import {ANIMATION_TIME} from "../data/consts";
import {handleItemAccessAttempt} from "../actions/handlers";
import {useHistory} from "react-router";
import {getDeliveryAnnouncements, getNormalAnnouncements} from "../actions/restActions";

export const Home = () => {

    const [normalAnnouncements, setNormalAnnouncements] = useState([]);
    const [deliveryAnnouncements, setDeliveryAnnouncements] = useState([]);
    const [announcementFlag, setAnnouncementFlag] = useState(true);

    const history = useHistory();

    const useStyles = makeStyles((()=>({
        selected: {
            background: '#DCDCDC'
        },
        bar: {
            marginBottom: '1em'
        }
    })));
    const classes = useStyles();
    const flexClasses = flexComponents();
    const paddingClasses = paddingComponents();
    const sizeClasses = sizeComponents();
    const listClasses = listComponents();
    const rwdClasses = rwdComponents();
    const animationStyles = useAnimationStyles(fadeInDown, ANIMATION_TIME);
    const loaderAnimationStyles = useAnimationStyles(fadeIn, ANIMATION_TIME);

    useEffect(()=>{
        handleItemAccessAttempt(history);
        getNormalAnnouncements().then(response => setNormalAnnouncements(response.data)).catch((error) => alert(error));
        getDeliveryAnnouncements().then(response => setDeliveryAnnouncements(response.data)).catch((error) => alert(error));
    }, []);

    const loadNormalAnnouncements = () => {
        setAnnouncementFlag(true);
    };
    const loadDeliveryAnnouncements = () => {
        setAnnouncementFlag(false);
    };

    return (
        <StyleRoot>
            <div className={`${flexClasses.flexRowSpaceAround} ${sizeClasses.bodyHeight}`}>
                {
                    normalAnnouncements.length === 0 ?
                        <div style={loaderAnimationStyles.animation}>
                            <BounceLoader
                                loading
                                color={'red'}
                            />
                        </div>
                        :
                        <div style={animationStyles.animation} className={`${rwdClasses.mobileCard}`}>
                            <Card className={`${paddingClasses.paddingMedium}`}>
                                <div className={`${flexClasses.flexRowCenter} ${classes.bar}`}>
                                    <Button onClick={() => loadNormalAnnouncements()} className={announcementFlag && classes.selected}>
                                        Normal
                                    </Button>
                                    <Button onClick={() => loadDeliveryAnnouncements()} className={!announcementFlag && classes.selected}>
                                        Delivery
                                    </Button>
                                </div>
                                    <List className={`${listClasses.announcementList}`}>
                                        {
                                            announcementFlag ?
                                            normalAnnouncements.map(announcement=>{
                                                return (
                                                    <ListItem>
                                                        <Announcement
                                                            data={announcement}
                                                        />
                                                    </ListItem>
                                                )
                                            })
                                            :
                                            deliveryAnnouncements.map(announcement=>{
                                                return (
                                                    <ListItem>
                                                        <Announcement
                                                            data={announcement}
                                                        />
                                                    </ListItem>
                                                )
                                            })
                                        }
                                    </List>
                            </Card>
                        </div>
                }
            </div>
        </StyleRoot>
    )
}
