import {Button, Card, List, ListItem, makeStyles} from "@material-ui/core";
import {flexComponents, listComponents, paddingComponents} from "../style/components";
import IndeterminateCheckBoxSharpIcon from "@material-ui/icons/IndeterminateCheckBoxSharp";
import AddIcon from "@material-ui/icons/Add";

export const PackagesList = (props) => {

    const useStyles = makeStyles((()=>({
        package: {
            background: '#FFE4C4'
        },
        listItem: {
            whiteSpace: 'nowrap'
        }
    })));
    const classes = useStyles();
    const listClasses = listComponents();
    const flexClasses = flexComponents();
    const paddingClasses = paddingComponents();

    return (

        <List className={`${flexClasses.flexRowSpaceBetween} ${listClasses.horizontalList}`}>
            {
                props.packages.map(deliveryPackage =>
                    <ListItem className={classes.listItem}>
                        <Card className={`${flexClasses.flexColumnSpaceAround} ${paddingClasses.paddingSmall} ${classes.package}`}>
                            <div>
                                {`${deliveryPackage.packageWidth} ${deliveryPackage.widthUnit} x ${deliveryPackage.packageLength} `}
                                {`${deliveryPackage.lengthUnit} x ${deliveryPackage.packageHeight} ${deliveryPackage.heightUnit}`}
                            </div>
                            <div>
                                {`${deliveryPackage.packageWeight} ${props.weightUnit}`}
                            </div>
                        </Card>
                    </ListItem>
                )
            }
        </List>
    )
}
