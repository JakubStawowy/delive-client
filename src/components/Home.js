import {Card, Grid, List, ListItem} from "@material-ui/core";
import {flexComponents, listComponents, paddingComponents, rwdComponents, sizeComponents} from "../style/components";
import {announcements} from "../testData/announcements";
import {Announcement} from "./Announcement";
import {useEffect, useState} from "react";
import {BounceLoader} from "react-spinners";
import {StyleRoot} from "radium";
import {fadeInDown, fadeIn} from "react-animations";
import {useAnimationStyles} from "../style/animation";
import {ANIMATION_TIME} from "../data/consts";

export const Home = () => {

    const [announcementsData, setAnnouncementsData] = useState([]);

    const flexClasses = flexComponents();
    const paddingClasses = paddingComponents();
    const sizeClasses = sizeComponents();
    const listClasses = listComponents();
    const rwdClasses = rwdComponents();
    const animationStyles = useAnimationStyles(fadeInDown, ANIMATION_TIME);
    const loaderAnimationStyles = useAnimationStyles(fadeIn, ANIMATION_TIME);

    useEffect(()=>{
        setTimeout(()=>{
            setAnnouncementsData(announcements);
        }, ANIMATION_TIME);
    }, []);

    return (
        <StyleRoot>
            {/*<Grid container className={`${flexClasses.flexRowSpaceAround} ${sizeClasses.bodyHeight}`}>*/}
            <div className={`${flexClasses.flexRowSpaceAround} ${sizeClasses.bodyHeight}`}>
                {
                    announcementsData.length === 0 ?
                        <div style={loaderAnimationStyles.animation}>
                            <BounceLoader
                                loading
                                color={'red'}
                            />
                        </div>
                        :
                        <div style={animationStyles.animation} className={`${rwdClasses.mobileCard}`}>
                            <Card className={`${paddingClasses.paddingMedium}`}>
                                <List className={`${listClasses.announcementList}`}>
                                    {
                                        announcementsData.map(announcement=>{
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
