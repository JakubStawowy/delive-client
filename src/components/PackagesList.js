import {Card, List, ListItem, makeStyles} from "@material-ui/core";
import {flexComponents, listComponents, paddingComponents} from "../style/components";

export const PackagesList = (props) => {

    const useStyles = makeStyles((()=>({
        package: {
            background: '#FFE4C4'
        }
    })));
    const classes = useStyles();
    const listClasses = listComponents();
    const flexClasses = flexComponents();
    const paddingClasses = paddingComponents();

    return (
        <List className={`${flexClasses.flexRowSpaceBetween} ${listClasses.horizontalList}`}>
            {
                props.packages.map(deliveryPackage => <ListItem>
                    <Card className={`${flexClasses.flexColumnSpaceAround} ${paddingClasses.paddingSmall} ${classes.package}`}>
                        {`${deliveryPackage.packageWidth} x ${deliveryPackage.packageLength} x ${deliveryPackage.packageHeight}`}
                    </Card>
                </ListItem>)
            }
        </List>
    )
}
