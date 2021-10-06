import {AppBar, Button, Card, List, ListItem, makeStyles, Tab, Tabs} from "@material-ui/core";
import {flexComponents, listComponents, paddingComponents, rwdComponents, sizeComponents} from "../style/components";
import {announcements} from "../testData/announcements";
import {Announcement} from "./Announcement";
import {useEffect, useState} from "react";
import {BounceLoader} from "react-spinners";
import {StyleRoot} from "radium";
import {fadeInDown, fadeIn, fadeOutLeft} from "react-animations";
import {useAnimationStyles} from "../style/animation";
import {ANIMATION_TIME} from "../data/consts";
import {handleItemAccessAttempt} from "../actions/handlers";
import {useHistory} from "react-router";
import {getDeliveryAnnouncements, getNormalAnnouncements} from "../actions/restActions";
import LoopIcon from "@material-ui/icons/Loop";

export const Home = () => {

    const [normalAnnouncements, setNormalAnnouncements] = useState([]);
    const [deliveryAnnouncements, setDeliveryAnnouncements] = useState([]);
    const [announcementFlag, setAnnouncementFlag] = useState(true);
    const [bounce, setBounce] = useState(false);

    const history = useHistory();

    const useStyles = makeStyles((()=>({
        selected: {
            background: '#DCDCDC'
        },
    })));
    const classes = useStyles();
    const flexClasses = flexComponents();
    const paddingClasses = paddingComponents();
    const sizeClasses = sizeComponents();
    const listClasses = listComponents();
    const rwdClasses = rwdComponents();
    const animationStyles = useAnimationStyles(fadeInDown, ANIMATION_TIME);
    const loaderAnimationStyles = useAnimationStyles(fadeIn, ANIMATION_TIME);
    const fadeOutStyles = useAnimationStyles(fadeOutLeft, ANIMATION_TIME / 2);

    useEffect(()=>{
        handleItemAccessAttempt(history);
        loadAnnouncements();
    }, []);

    const loadAnnouncements = () => {
        getNormalAnnouncements().then(response => setNormalAnnouncements(response.data)).catch((error) => alert(error));
        getDeliveryAnnouncements().then(response => setDeliveryAnnouncements(response.data)).catch((error) => alert(error));
    }
    const loadNormalAnnouncements = () => {
        setAnnouncementFlag(true);
    };
    const loadDeliveryAnnouncements = () => {
        setAnnouncementFlag(false);
    };

    const navToCommissionForm = type => {
        setBounce(true);
        setTimeout(() => history.push('/commission/' + type), ANIMATION_TIME / 2);
    }

    const refresh = () => {
        setNormalAnnouncements([]);
        setDeliveryAnnouncements([]);
        loadAnnouncements();
    }

    return (
        <StyleRoot>
            <div className={`${flexClasses.flexRowSpaceAround} ${sizeClasses.bodyHeight}`}>
                {
                    normalAnnouncements.length === 0 && deliveryAnnouncements.length === 0 ?
                        <div style={loaderAnimationStyles.animation}>
                            <BounceLoader
                                loading
                                color={'red'}
                            />
                        </div>
                        :
                        <div style={bounce ? fadeOutStyles.animation : animationStyles.animation} className={`${rwdClasses.mobileCard}`}>
                            <Card className={`${paddingClasses.paddingMedium} ${sizeClasses.componentHeight} ${flexClasses.flexColumnSpaceBetween}`}>
                                <div className={`${flexClasses.flexRowCenter}`}>
                                    <Button onClick={() => loadNormalAnnouncements()} className={announcementFlag && classes.selected}>
                                        Normal
                                    </Button>
                                    <Button onClick={() => loadDeliveryAnnouncements()} className={!announcementFlag && classes.selected}>
                                        Delivery
                                    </Button>
                                    <Button onClick={() => refresh()}>
                                        <LoopIcon />
                                    </Button>
                                </div>
                                    <List className={`${listClasses.verticalList}`}>
                                        {
                                            announcementFlag ?
                                            normalAnnouncements.map(announcement=>{
                                                return (
                                                    <ListItem>
                                                        <Announcement
                                                            data={announcement}
                                                            action={navToCommissionForm}
                                                            delivery={false}
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
                                                            action={navToCommissionForm}
                                                            dalivery={true}
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
