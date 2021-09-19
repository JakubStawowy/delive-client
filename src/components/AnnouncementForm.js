import {Button, Card, Grid, makeStyles, Modal, Typography, List, ListItem} from "@material-ui/core";
import {
    flexComponents, listComponents,
    paddingComponents,
    rwdComponents,
    sizeComponents
} from "../style/components";
import IndeterminateCheckBoxSharpIcon from '@material-ui/icons/IndeterminateCheckBoxSharp';
import RoomIcon from '@material-ui/icons/Room';
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import {i18n} from "../data/i18n";
import {StyleRoot} from "radium";
import {bounceInRight, bounceOutLeft} from "react-animations";
import {useAnimationStyles} from "../style/animation";
import {useEffect, useState} from "react";
import {useHistory} from "react-router";
import {ANIMATION_TIME} from "../data/consts";
import {MapModal} from "./MapModal";
import {handleItemAccessAttempt} from "../actions/handlers";
import {addDeliveryAnnouncement, addNormalAnnouncement} from "../actions/restActions";
import {USER_ID} from "../consts/ApplicationConsts";
import CheckIcon from "@material-ui/icons/Check";
import AddIcon from '@material-ui/icons/Add';
import {
    validateDateTimeFormat, validateEmptyString
} from "../actions/validators";
import {PackageForm} from "./PackageForm";

export const AnnouncementForm = (props) => {

    const announcementFormItems = i18n[
        localStorage.getItem('locale') !== undefined
        && localStorage.getItem('locale') !== null
            ? localStorage.getItem('locale') : 'en'].announcement;
    const [bounce, setBounce] = useState(false);
    const [packages, setPackages] = useState([]);
    const [localizationFromModalOpened, setLocalizationFromModalOpened] = useState(false);
    const [localizationToModalOpened, setLocalizationToModalOpened] = useState(false);
    const [packageFormOpened, setPackageFormOpened] = useState(false);

    const [fromLatitude, setFromLatitude] = useState('');
    const [fromLongitude, setFromLongitude] = useState('');
    const [toLatitude, setToLatitude] = useState('');
    const [toLongitude, setToLongitude] = useState('');
    const [dateDay, setDateDay] = useState('');
    const [dateHour, setDateHour] = useState('');

    const history = useHistory();

    const styles = makeStyles((()=>({
        datePicker: {
            borderRadius: '10px',
        },
        card: {
            height: '70vh'
        },
        check: {
            color: "green"
        },
        package: {
            background: '#FFE4C4'
        },

    })))
    const classes = styles();
    const flexClasses = flexComponents();
    const paddingClasses = paddingComponents();
    const sizeClasses = sizeComponents();
    const rwdClasses = rwdComponents();
    const listClasses = listComponents();
    const bounceInAnimationStyles = useAnimationStyles(bounceInRight, ANIMATION_TIME);
    const bounceOutAnimationStyles = useAnimationStyles(bounceOutLeft, ANIMATION_TIME / 2);

    const handleSubmit = () => {
        if (props.delivery) {
            validateEmptyString(fromLatitude) &&
            validateEmptyString(fromLongitude) &&
            validateEmptyString(toLatitude) &&
            validateEmptyString(toLongitude) &&
                validateDateTimeFormat(dateDay + " " + dateHour)
            ?
            addDeliveryAnnouncement({
                fromLatitude,
                fromLongitude,
                toLatitude,
                toLongitude,
                authorId: localStorage.getItem(USER_ID),
                date: dateDay + " " + dateHour
            }).then(() => {
                setBounce(true);
                setTimeout(() => history.push('/home'), ANIMATION_TIME / 2);
            }).catch((error) => alert(error))
                :
                alert("ValidationError");
        }
        else {
            validateEmptyString(fromLatitude) &&
            validateEmptyString(fromLongitude) &&
            validateEmptyString(toLatitude) &&
            validateEmptyString(toLongitude) && packages.length > 0 ?
            addNormalAnnouncement({
                fromLatitude,
                fromLongitude,
                toLatitude,
                toLongitude,
                packages: packages,
                authorId: localStorage.getItem(USER_ID)
            }).then(() => {
                setBounce(true);
                setTimeout(()=>history.push('/home'), ANIMATION_TIME / 2);
            }).catch((error) => alert(error))
                :
                alert("ValidationError");
        }
    };

    const addPackage = data => {
        packages.push(data);
        setPackageFormOpened(false);
    }

    const removePackage = (id) => {
        let index;
        for (index = 0 ; index < packages.length ; index++) {
            if (packages[index].id === id) {
                break;
            }
        }
        packages.splice(index, 1);
        const packagesCopy = [...packages];
        setPackages(packagesCopy);
    }

    useEffect(() => {
        handleItemAccessAttempt(history);
    }, []);

    return (
        <StyleRoot>
            <div style={bounce ? bounceOutAnimationStyles.animation : bounceInAnimationStyles.animation}>
                <Grid container className={`${flexClasses.flexRowSpaceAround} ${sizeClasses.bodyHeight}`}>
                    <Modal
                        className={flexClasses.flexRowCenter}
                        centered open={localizationFromModalOpened}
                        children={<MapModal
                            setModalOpened={setLocalizationFromModalOpened}
                            setLongitude={setFromLongitude}
                            setLatitude={setFromLatitude}
                        />}
                        onClose={()=>setLocalizationFromModalOpened(!localizationFromModalOpened)}
                    />
                    <Modal
                        className={flexClasses.flexRowCenter}
                        centered open={localizationToModalOpened}
                        children={<MapModal
                            setModalOpened={setLocalizationToModalOpened}
                            setLongitude={setToLongitude}
                            setLatitude={setToLatitude}
                        />}
                        onClose={()=>setLocalizationToModalOpened(!localizationToModalOpened)}
                    />
                    <Modal
                        className={flexClasses.flexRowCenter}
                        centered open={packageFormOpened}
                        children={<PackageForm
                            announcementFormItems={announcementFormItems}
                            setPackageFormOpened={setPackageFormOpened}
                            addPackage={addPackage}
                            packagesLength={packages.length}
                        />}
                        onClose={()=>setPackageFormOpened(!packageFormOpened)}
                    />
                    <Card className={`${paddingClasses.paddingMedium} ${flexClasses.flexColumnSpaceAround} ${classes.card} ${rwdClasses.singleMobileCard}`}>
                        <Typography variant={'h5'} className={`${flexClasses.flexRowSpaceAround} ${sizeClasses.fullWidth}`}>
                            {announcementFormItems.destination.destinations}
                            <Button variant={'contained'} onClick={()=>setLocalizationFromModalOpened(true)}>
                                {
                                    fromLatitude !== '' && fromLongitude !== '' ?
                                    <CheckIcon className={classes.check}/>
                                    :
                                    <RoomIcon color={'secondary'}/>
                                }
                                {announcementFormItems.destination.from}
                            </Button>

                            <Button variant={'contained'} onClick={()=>setLocalizationToModalOpened(true)}>
                                {
                                    toLatitude !== '' && toLongitude !== '' ?
                                        <CheckIcon className={classes.check}/>
                                        :
                                        <RoomIcon color={'secondary'}/>
                                }
                                {announcementFormItems.destination.to}
                            </Button>
                        </Typography>

                        {
                            !props.delivery &&
                                <Button variant={'contained'} onClick={()=>setPackageFormOpened(true)}>
                                    <AddIcon fontSize={'large'}/>
                                    Add package
                                </Button>
                        }
                        {
                            !props.delivery && packages.length > 0 &&
                                <List className={`${flexClasses.flexRowSpaceBetween} ${listClasses.horizontalList}`}>
                                    {
                                        packages.map(deliveryPackage => <ListItem>
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
                        {
                            props.delivery &&
                            <Typography variant={'h5'} className={`${flexClasses.flexRowSpaceAround} ${sizeClasses.fullWidth}`}>
                                {announcementFormItems.date}
                                <input
                                    type={'date'}
                                    className={`${classes.datePicker} ${paddingClasses.paddingSmall}`}
                                    value={dateDay}
                                    onChange={(e) => setDateDay(e.target.value)}
                                />
                                <input
                                    type={'time'}
                                    className={`${classes.datePicker} ${paddingClasses.paddingSmall}`}
                                    value={dateHour}
                                    onChange={(e) => setDateHour(e.target.value)}
                                />
                            </Typography>
                        }
                        <Button variant={'contained'} onClick={()=>handleSubmit()}>
                            {announcementFormItems.submit}
                            <ArrowForwardIcon fontSize={'large'}/>
                        </Button>
                    </Card>
                </Grid>
            </div>
        </StyleRoot>
    )
}
