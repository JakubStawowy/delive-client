import {Card, Grid, List, ListItem, Tab, Tabs} from "@material-ui/core";
import {flexComponents, listComponents, paddingComponents, sizeComponents} from "../style/components";
import {announcements} from "../testData/announcements";
import {Announcement} from "./Announcement";

export const Home = () => {

    const flex = flexComponents();
    const padding = paddingComponents();
    const size = sizeComponents();
    const list = listComponents();

    return (
        <Grid container className={`${flex.flexRowSpaceAround} ${size.bodyHeight}`}>
            <Card className={`${padding.padding}`}>
                <List className={`${list.announcementList}`}>
                    {
                        announcements.map(announcement=>{
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
        </Grid>
    )
}
