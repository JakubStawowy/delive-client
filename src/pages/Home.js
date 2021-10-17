import {Button, Card, List, ListItem, makeStyles, Typography} from "@material-ui/core";
import {flexComponents, listComponents, paddingComponents, rwdComponents, sizeComponents} from "../style/components";
import {AnnouncementListItem} from "../components/AnnouncementListItem";
import {useEffect, useState} from "react";
import {BounceLoader} from "react-spinners";
import {StyleRoot} from "radium";
import {fadeInDown, fadeIn, fadeOutLeft} from "react-animations";
import {useAnimationStyles} from "../style/animation";
import {ANIMATION_TIME} from "../data/consts";
import {handleItemAccessAttempt} from "../actions/handlers";
import {useHistory} from "react-router";
import {getNormalAnnouncements} from "../actions/restActions";
import LoopIcon from "@material-ui/icons/Loop";

export const Home = () => {

    const [announcements, setAnnouncements] = useState([]);
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
        getNormalAnnouncements().then(response => setAnnouncements(response.data)).catch((error) => alert(error));
    }

    const navToCommissionForm = type => {
        setBounce(true);
        setTimeout(() => history.push('/commission/' + type), ANIMATION_TIME / 2);
    }

    const refresh = () => {
        setAnnouncements([]);
        loadAnnouncements();
    }

    return (
        <StyleRoot>
            <div className={`${flexClasses.flexRowSpaceAround} ${sizeClasses.bodyHeight}`}>
                {
                    announcements === null ?
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
                                    <Button onClick={() => refresh()}>
                                        <LoopIcon />
                                    </Button>
                                </div>
                                    <List className={`${listClasses.verticalList}`}>
                                        {
                                            announcements.length > 0 ?
                                            announcements.map(announcement=>{
                                                return (
                                                    <ListItem>
                                                        <AnnouncementListItem
                                                            data={announcement}
                                                            action={navToCommissionForm}
                                                            delivery={false}
                                                        />
                                                    </ListItem>
                                                )
                                            })
                                                :
                                                <div>
                                                    No announcements yet
                                                </div>
                                        }
                                    </List>
                            </Card>
                        </div>
                }
            </div>
        </StyleRoot>
    )
}