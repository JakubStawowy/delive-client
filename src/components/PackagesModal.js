import {Button, Card, List, ListItem, makeStyles} from "@material-ui/core";
import {flexComponents, listComponents, paddingComponents} from "../style/components";
import CheckIcon from "@material-ui/icons/Check";

export const PackagesModal = (props) => {

    const useStyles = makeStyles((()=>({
        package: {
            background: '#FFE4C4'
        },
        singleButton: {
            width: '100%',
            borderRadius: 0
        },
        check: {
            color: "green"
        },
    })));
    const classes = useStyles();
    const flexClasses = flexComponents();
    const listClasses = listComponents();
    const paddingClasses = paddingComponents();
    const handleClose = () => {
        props.setPackagesModalOpened(false);
    }

    return (
        <Card>
            <List className={`${flexClasses.flexRowSpaceBetween} ${listClasses.horizontalList}`}>
                {
                    props.packages.map(deliveryPackage => <ListItem>
                        <Card className={`${flexClasses.flexColumnSpaceAround} ${paddingClasses.paddingSmall} ${classes.package}`}>
                            {`${deliveryPackage.packageWidth} x ${deliveryPackage.packageLength} x ${deliveryPackage.packageHeight}`}
                        </Card>
                    </ListItem>)
                }
            </List>
            {
                props.setPackagesModalOpened !== undefined &&
                    <Button variant={'contained'} className={classes.singleButton} onClick={()=>handleClose()}>
                        <CheckIcon className={classes.check}/>
                    </Button>
            }
        </Card>
    )
}
