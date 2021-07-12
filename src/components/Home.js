import {Card, Grid, List, ListItem, Tab, Tabs} from "@material-ui/core";
import {flexComponents, listComponents, paddingComponents, sizeComponents} from "../style/components";
import {announcements} from "../testData/announcements";
import {Announcement} from "./Announcement";
import {useEffect, useState} from "react";
import {BounceLoader} from "react-spinners";

export const Home = () => {

    const flex = flexComponents();
    const padding = paddingComponents();
    const size = sizeComponents();
    const list = listComponents();

    const [announcementsData, setAnnouncementsData] = useState([]);

    useEffect(()=>{
        setTimeout(()=>{
            setAnnouncementsData(announcements);
        }, 1000);
    }, []);

    return (
        <Grid container className={`${flex.flexRowSpaceAround} ${size.bodyHeight}`}>
            {
                announcementsData.length === 0 ?
                    <BounceLoader
                        loading
                        color={'red'}
                    />
                    :
                    <Card className={`${padding.padding}`}>
                        <List className={`${list.announcementList}`}>
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
            }
        </Grid>
    )
}
