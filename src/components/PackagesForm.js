import {Button, Card, List, ListItem, makeStyles, Modal} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import IndeterminateCheckBoxSharpIcon from "@material-ui/icons/IndeterminateCheckBoxSharp";
import {PackageForm} from "./PackageForm";
import {flexComponents, listComponents, paddingComponents} from "../style/components";
import {useState} from "react";

export const PackagesForm = (props) => {
    const [packageFormOpened, setPackageFormOpened] = useState(false);


    const useStyles = makeStyles((()=>({
        package: {
            background: '#FFE4C4'
        },

    })));
    const classes = useStyles();
    const flexClasses = flexComponents();
    const paddingClasses = paddingComponents();
    const listClasses = listComponents();

    const addPackage = data => {
        props.packages.push(data);
        setPackageFormOpened(false);
    }

    const removePackage = (id) => {
        let index;
        for (index = 0 ; index < props.packages.length ; index++) {
            if (props.packages[index].id === id) {
                break;
            }
        }
        props.packages.splice(index, 1);
        const packagesCopy = [...props.packages];
        props.setPackages(packagesCopy);
    }

    return (
        <div>
            <Modal
                className={flexClasses.flexRowCenter}
                centered open={packageFormOpened}
                children={<PackageForm
                    announcementFormItems={props.announcementFormItems}
                    setPackageFormOpened={setPackageFormOpened}
                    addPackage={addPackage}
                    packagesLength={props.packages.length}
                />}
                onClose={()=>setPackageFormOpened(!packageFormOpened)}
            />

            <Button variant={'contained'} onClick={()=>setPackageFormOpened(true)}>
                <AddIcon fontSize={'large'}/>
                Add package
            </Button>
            {
                props.packages.length > 0 &&
                        <List className={`${flexClasses.flexRowSpaceBetween} ${listClasses.horizontalList}`}>
                            {
                                props.packages.map(deliveryPackage => <ListItem>
                                    <Card className={`${flexClasses.flexColumnSpaceAround} ${paddingClasses.paddingSmall} ${classes.package}`}>
                                        <Button onClick={() => removePackage(deliveryPackage.id)}>
                                            <IndeterminateCheckBoxSharpIcon />
                                        </Button>
                                        {`${deliveryPackage.packageWidth} x ${deliveryPackage.packageLength} x ${deliveryPackage.packageHeight}`}
                                    </Card>
                                </ListItem>)
                            }
                        </List>
            }
        </div>
    )
}
