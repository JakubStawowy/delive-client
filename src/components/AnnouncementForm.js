import {
    Button,
    Card,
    Grid,
    makeStyles,
    Modal,
    Typography,
    List,
    ListItem,
    TextField,
    FormControlLabel, Checkbox
} from "@material-ui/core";
import {
    flexComponents, listComponents,
    paddingComponents,
    rwdComponents,
    sizeComponents, validatedComponents
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
import {MapFormModal} from "./MapFormModal";
import {handleError, handleItemAccessAttempt} from "../actions/handlers";
import {addNormalAnnouncement, getAnnouncementById} from "../rest/restActions";
import CheckIcon from "@material-ui/icons/Check";
import AddIcon from '@material-ui/icons/Add';
import {validateEmptyString, validateNumberFormat} from "../actions/validators";
import {PackageForm} from "./PackageForm";

export const AnnouncementForm = (props) => {

    const announcementFormItems = i18n[
        localStorage.getItem('locale') !== undefined
        && localStorage.getItem('locale') !== null
            ? localStorage.getItem('locale') : 'en'].announcement;
    const [bounce, setBounce] = useState(false);
    const [announcementId, setAnnouncementId] = useState(null);
    const [packages, setPackages] = useState([]);
    const [localizationFromModalOpened, setLocalizationFromModalOpened] = useState(false);
    const [localizationToModalOpened, setLocalizationToModalOpened] = useState(false);
    const [packageFormOpened, setPackageFormOpened] = useState(false);
    const [transportWithTheClient, setTransportWithTheClient] = useState(false);
    const [validatedSalary, setValidatedSalary] = useState(true);

    const [fromLatitude, setFromLatitude] = useState(null);
    const [fromLongitude, setFromLongitude] = useState(null);
    const [toLatitude, setToLatitude] = useState(null);
    const [toLongitude, setToLongitude] = useState(null);
    const [amount, setAmount] = useState(null);

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
    const validationClasses = validatedComponents();
    const bounceInAnimationStyles = useAnimationStyles(bounceInRight, ANIMATION_TIME);
    const bounceOutAnimationStyles = useAnimationStyles(bounceOutLeft, ANIMATION_TIME / 2);

    const handleSubmit = () => {
        const isGeolocationValid = validateGeolocation(fromLatitude, fromLongitude, toLatitude, toLongitude);
        const isPackagesValid = packages.length > 0;
        const isSalaryValid = validateSalary(amount);
        const data = {
            id: announcementId,
            destinationFrom: {
                longitude: fromLongitude,
                latitude: fromLatitude
            },
            destinationTo: {
                longitude: toLongitude,
                latitude: toLatitude
            },
            packages: packages,
            amount,
            requireTransportWithClient: transportWithTheClient,
        };
        console.log(data);
        isGeolocationValid && isPackagesValid && isSalaryValid ?
        addNormalAnnouncement(data).then(() => {
            setBounce(true);
            setTimeout(()=>history.push('/home'), ANIMATION_TIME / 2);
        }).catch((error) => handleError(error, history, props.setLogged))
            :
            handleValidationError(isGeolocationValid, isPackagesValid, isSalaryValid);
    };

    const handleValidationError = (isGeolocationValid, isPackagesValid, isSalaryValidated) => {
        let message = '';
        !isGeolocationValid && (message = message + "Wrong geolocation\n");
        !isPackagesValid && (message = message + "No packages set\n");
        !isSalaryValidated && (message = message + "Wrong salary value\n");
        alert(message);
    }

    const validateGeolocation = (fromLatitude, fromLongitude, toLatitude, toLongitude) =>
        validateEmptyString(fromLatitude) &&
        validateEmptyString(fromLongitude) &&
        validateEmptyString(toLatitude) &&
        validateEmptyString(toLongitude) &&
        !(fromLatitude === toLatitude && fromLongitude === toLongitude);

    const validateSalary = salary => validateNumberFormat(salary);

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
        props.announcementId !== null && props.announcementId !== undefined &&
            getAnnouncementById(props.announcementId)
                .then(response => {
                    const data = response.data;
                    setAnnouncementId(data.id);
                    setPackages(data.packages);
                    setTransportWithTheClient(data.requireTransportWithClient)
                    setFromLatitude(data.destinationFrom.latitude);
                    setFromLongitude(data.destinationFrom.longitude);
                    setToLatitude(data.destinationTo.latitude);
                    setToLongitude(data.destinationTo.longitude);
                    setAmount(data.amount);
                })
                .catch(error => handleError(error, history));

    }, []);

    return (
        <StyleRoot>
            <div style={bounce ? bounceOutAnimationStyles.animation : bounceInAnimationStyles.animation}>
                <Grid container className={`${flexClasses.flexRowSpaceAround} ${sizeClasses.bodyHeight}`}>
                    <Modal
                        className={flexClasses.flexRowCenter}
                        centered open={localizationFromModalOpened}
                        children={
                            <MapFormModal
                                setModalOpened={setLocalizationFromModalOpened}
                                setLongitude={setFromLongitude}
                                setLatitude={setFromLatitude}
                                latitude={fromLatitude}
                                longitude={fromLongitude}
                            />
                        }
                        onClose={()=>setLocalizationFromModalOpened(!localizationFromModalOpened)}
                    />
                    <Modal
                        className={flexClasses.flexRowCenter}
                        centered open={localizationToModalOpened}
                        children={<MapFormModal
                            setModalOpened={setLocalizationToModalOpened}
                            setLongitude={setToLongitude}
                            setLatitude={setToLatitude}
                            latitude={toLatitude}
                            longitude={toLongitude}
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
                                    fromLatitude !== null && fromLongitude !== null ?
                                    <CheckIcon className={classes.check}/>
                                    :
                                    <RoomIcon color={'secondary'}/>
                                }
                                {announcementFormItems.destination.from}
                            </Button>

                            <Button variant={'contained'} onClick={()=>setLocalizationToModalOpened(true)}>
                                {
                                    toLatitude !== null && toLongitude !== null ?
                                        <CheckIcon className={classes.check}/>
                                        :
                                        <RoomIcon color={'secondary'}/>
                                }
                                {announcementFormItems.destination.to}
                            </Button>
                        </Typography>
                        <div className={flexClasses.flexRowSpaceBetween}>
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
                                <ListItem>
                                    <Button variant={'contained'} onClick={()=>setPackageFormOpened(true)} className={classes.package}>
                                        <AddIcon fontSize={'large'}/>
                                    </Button>
                                </ListItem>
                            </List>
                        </div>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={transportWithTheClient}
                                    color={"secondary"}
                                    onChange={() => setTransportWithTheClient(!transportWithTheClient)}
                                />
                            }
                            label={'Transport with the client'}
                        />
                        <div className={flexClasses.flexRowSpaceBetween}>
                            <TextField
                                label={"salary"}
                                value={amount}
                                onChange={e => {
                                    setAmount(e.target.value);
                                    setTimeout(()=>setValidatedSalary(validateSalary(e.target.value)), 500);
                                }}
                                className={!validatedSalary && validationClasses.wrongTextField}
                            />
                            <Button variant={'contained'} onClick={()=>handleSubmit()}>
                                {announcementFormItems.submit}
                                <ArrowForwardIcon fontSize={'large'}/>
                            </Button>
                        </div>
                    </Card>
                </Grid>
            </div>
        </StyleRoot>
    )
}
