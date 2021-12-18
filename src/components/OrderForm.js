import {
    Button,
    Card,
    makeStyles,
    Modal,
    List,
    ListItem,
    TextField,
    FormControlLabel, Checkbox, Select, MenuItem
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
import {StyleRoot} from "radium";
import {bounceInRight, bounceOutLeft} from "react-animations";
import {useAnimationStyles} from "../style/animation";
import {useEffect, useState} from "react";
import {useHistory} from "react-router";
import {ANIMATION_TIME} from "../data/consts";
import {MapFormModal} from "./MapFormModal";
import {handleError, handleItemAccessAttempt} from "../actions/handlers";
import {addOrder, getOrderById, getProposedAddresses} from "../rest/restActions";
import CheckIcon from "@material-ui/icons/Check";
import AddIcon from '@material-ui/icons/Add';
import {validateEmptyString, validateNumberFormat} from "../actions/validators";
import {PackageForm} from "./PackageForm";
import {KILOGRAM, LBS} from "../consts/unitConsts";

export const OrderForm = (props) => {

    const [bounce, setBounce] = useState(false);
    const [orderId, setOrderId] = useState(null);
    const [packages, setPackages] = useState([]);
    const [localizationFromModalOpened, setLocalizationFromModalOpened] = useState(false);
    const [localizationToModalOpened, setLocalizationToModalOpened] = useState(false);
    const [packageFormOpened, setPackageFormOpened] = useState(false);
    const [transportWithTheClient, setTransportWithTheClient] = useState(false);
    const [validatedSalary, setValidatedSalary] = useState(true);
    const [weightUnit, setWeightUnit] = useState(KILOGRAM);

    const [useMap, setUseMap] = useState(false);

    const [fromLatitude, setFromLatitude] = useState(null);
    const [fromLongitude, setFromLongitude] = useState(null);
    const [fromAddress, setFromAddress] = useState(null);

    const [toLatitude, setToLatitude] = useState(null);
    const [toLongitude, setToLongitude] = useState(null);
    const [toAddress, setToAddress] = useState(null);
    const [proposedFromAddresses, setProposedFromAddresses] = useState([]);
    const [proposedToAddresses, setProposedToAddresses] = useState([]);

    const [salary, setSalary] = useState(null);

    const history = useHistory();

    const styles = makeStyles(((theme)=>({
        check: {
            color: "green"
        },
        package: {
            background: '#FFE4C4'
        },
        root: {
            alignItems: 'flex-start',
            [theme.breakpoints.down('xs')]: {
                padding: '5vw'
            }
        },
        textField: {
            width: '100%'
        },
        subContainer: {

            width: '100%',
            alignItems: 'flex-start'
        },
        submit: {
            width: '100%',
            [theme.breakpoints.down('xs')]: {
                flexDirection: 'column',
                alignItems: 'flex-start'
            },
        },
        submitButton: {
            [theme.breakpoints.down('xs')]: {
                width: '100%'
            },
        },
        unitSection: {
            display: 'flex',
            alignItems: 'center',
            width: '100%'
        },
        weightSelect: {
            marginLeft: '1em'
        },
        listItem: {
            whiteSpace: 'nowrap'
        },
        dropDown: {
            position: 'relative'
        },
        dropDownContext: {
            position: 'absolute',
            background: 'white',
            border: '.2px solid gray',
            borderBottomRightRadius: '1em',
            borderBottomLeftRadius: '1em',
            zIndex: 1,
            maxHeight: '20vh',
            overflow: 'auto'
        },
        dropDownItem: {
            '&:hover': {
                cursor: 'pointer',
                background: 'lightgray'
            }
        }
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
        const isGeolocationValid = validateGeolocation(fromLatitude, fromLongitude, toLatitude, toLongitude)
            || validateAddresses(fromAddress, toAddress);

        // const isGeolocationValid = true;
        const isPackagesValid = packages.length > 0;
        const isSalaryValid = validateSalary(salary);
        const destinationFrom = useMap ? {
            longitude: fromLongitude,
            latitude: fromLatitude
        } : {
            address: fromAddress
        };
        const destinationTo = useMap ? {
            longitude: toLongitude,
            latitude: toLatitude
        } : {
            address: toAddress
        };

        const data = {
            id: orderId,
            destinationFrom,
            destinationTo,
            packages: packages,
            weightUnit,
            salary: salary,
            requireTransportWithClient: transportWithTheClient,
        };
        console.log(data);
        isGeolocationValid && isPackagesValid && isSalaryValid ?
        addOrder(data).then(response => {
            if (response.data.operationSuccess) {
                setBounce(true);
                setTimeout(()=>history.push('/home'), ANIMATION_TIME / 2);
            }
            else {
                alert(response.data.message);
            }
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

    const validateAddresses = (fromAddress, toAddress) => {
        return fromAddress !== null && fromAddress.length >= 3 && toAddress !== null && toAddress.length >= 3
    };

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

    const onTextFieldKeyUp = (setAddress, setProposedAddresses, value) => {
        // const x = false;
        const x = true;
        setAddress(value);
        if (x) {
            getProposedAddresses(value).then(response => setProposedAddresses(response.data))
                .catch(error => handleError(error, history, props.setLogged));
        }
    }

    const handleChooseAddress = (setAddress, setProposedAddresses, address) => {
        setAddress(address);
        setProposedAddresses([]);
    };

    useEffect(() => {
        handleItemAccessAttempt(history);
        props.orderId !== null && props.orderId !== undefined &&
            getOrderById(props.orderId)
                .then(response => {
                    const data = response.data;
                    setOrderId(data.id);
                    setPackages(data.packages);
                    setTransportWithTheClient(data.requireTransportWithClient)
                    setFromLatitude(data.destinationFrom.latitude);
                    setFromLongitude(data.destinationFrom.longitude);
                    setToLatitude(data.destinationTo.latitude);
                    setToLongitude(data.destinationTo.longitude);
                    setSalary(data.salary);
                })
                .catch(error => handleError(error, history));

    }, []);

    return (
        <StyleRoot>
            <div
                // onClick={() => {setProposedFromAddresses([]); setProposedToAddresses([])}}
                style={bounce ? bounceOutAnimationStyles.animation : bounceInAnimationStyles.animation} className={`${flexClasses.flexColumnCenter} ${sizeClasses.bodyHeight}`} >
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
                                address={fromAddress}
                                setAddress={setFromAddress}
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
                            address={toAddress}
                            setAddress={setToAddress}
                        />}
                        onClose={()=>setLocalizationToModalOpened(!localizationToModalOpened)}
                    />
                    <Modal
                        className={flexClasses.flexRowCenter}
                        centered open={packageFormOpened}
                        children={<PackageForm
                            setPackageFormOpened={setPackageFormOpened}
                            addPackage={addPackage}
                            packagesLength={packages.length}
                            weightUnit={weightUnit}
                        />}
                        onClose={()=>setPackageFormOpened(!packageFormOpened)}
                    />
                    <Card className={`${paddingClasses.paddingMedium} ${flexClasses.flexColumnSpaceAround} ${rwdClasses.singleMobileCard} ${classes.root}`}>
                        <div className={`${flexClasses.flexColumnSpaceBetween} ${classes.subContainer}`}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={!useMap}
                                        color={"secondary"}
                                        onChange={() => setUseMap(false)}
                                    />
                                }
                                label={'Type address'}
                            />
                            <div className={`${classes.dropDown} ${classes.textField}`}>
                                <TextField
                                    label={"Starting location address"}
                                    className={`${classes.textField}`}
                                    value={fromAddress}
                                    onChange={e => onTextFieldKeyUp(setFromAddress, setProposedFromAddresses, e.target.value)}
                                    disabled={useMap}
                                />
                                {
                                    proposedFromAddresses.length !== 0 &&
                                    <div className={`${classes.dropDownContext} ${classes.textField}`}>
                                        {
                                            proposedFromAddresses.map(address => (
                                                <div
                                                    className={`${paddingClasses.paddingExtraSmall} ${classes.dropDownItem}`}
                                                    onClick={() => handleChooseAddress(setFromAddress, setProposedFromAddresses, address)}
                                                >{address}</div>
                                            ))
                                        }
                                    </div>
                                }
                            </div>
                            <div className={`${classes.dropDown} ${classes.textField}`}>
                            <TextField
                                label={"Destination address"}
                                className={`${classes.textField}`}
                                value={toAddress}
                                onChange={e => onTextFieldKeyUp(setToAddress, setProposedToAddresses, e.target.value)}
                                disabled={useMap}
                            />
                                {
                                    proposedToAddresses.length !== 0 &&
                                    <div className={`${classes.dropDownContext} ${classes.textField}`}>
                                        {
                                            proposedToAddresses.map(address => (
                                                <div
                                                    className={`${paddingClasses.paddingExtraSmall} ${classes.dropDownItem}`}
                                                    onClick={() => handleChooseAddress(setToAddress, setProposedToAddresses, address)}
                                                >{address}</div>
                                            ))
                                        }
                                    </div>
                                }
                            </div>
                        </div>
                        <div className={`${flexClasses.flexColumnSpaceBetween} ${classes.subContainer}`}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={useMap}
                                        color={"secondary"}
                                        onChange={() => setUseMap(true)}
                                    />
                                }
                                label={'Use maps'}
                            />
                            <div className={`${flexClasses.flexRowSpaceAround}`}>
                                <Button
                                    onClick={()=>setLocalizationFromModalOpened(true)}
                                    disabled={!useMap}
                                >
                                    {
                                        fromLatitude !== null && fromLongitude !== null ?
                                            <CheckIcon className={classes.check}/>
                                            :
                                            <RoomIcon color={'secondary'}/>
                                    }
                                    Starting location
                                </Button>

                                <Button
                                    onClick={()=>setLocalizationToModalOpened(true)}
                                    disabled={!useMap}
                                >
                                    {
                                        toLatitude !== null && toLongitude !== null ?
                                            <CheckIcon className={classes.check}/>
                                            :
                                            <RoomIcon color={'secondary'}/>
                                    }
                                    Destination
                                </Button>
                            </div>
                        </div>
                        <div className={`${flexClasses.flexRowSpaceBetween} ${classes.subContainer}`}>
                            <List className={`${flexClasses.flexRowSpaceBetween} ${listClasses.horizontalList}`}>
                                {
                                    packages.map(deliveryPackage =>
                                        <ListItem className={classes.listItem}>
                                        <Card className={`${flexClasses.flexColumnSpaceAround} ${paddingClasses.paddingSmall} ${classes.package}`}>
                                            <Button onClick={() => removePackage(deliveryPackage.id)}>
                                                <IndeterminateCheckBoxSharpIcon />
                                            </Button>
                                            <div>
                                                {`${deliveryPackage.packageWidth} ${deliveryPackage.widthUnit} x ${deliveryPackage.packageLength} `}
                                                {`${deliveryPackage.lengthUnit} x ${deliveryPackage.packageHeight} ${deliveryPackage.heightUnit}`}
                                            </div>
                                            <div>
                                                {`${deliveryPackage.packageWeight} ${weightUnit}`}
                                            </div>
                                        </Card>
                                    </ListItem>
                                    )
                                }
                                <ListItem>
                                    <Button variant={'contained'} onClick={()=>setPackageFormOpened(true)} className={classes.package}>
                                        <AddIcon fontSize={'large'}/>
                                    </Button>
                                </ListItem>
                            </List>

                        </div>
                        <div className={`${classes.unitSection}`}>
                            Packages weight unit:
                            <Select className={classes.weightSelect} onChange={e => setWeightUnit(e.target.value)} defaultValue={KILOGRAM}>
                                <MenuItem value={KILOGRAM}>{KILOGRAM}</MenuItem>
                                <MenuItem value={LBS}>{LBS}</MenuItem>
                            </Select>
                        </div>
                        <div className={flexClasses.flexRowSpaceBetween}>
                            <TextField
                                label={"Salary [EUR]"}
                                value={salary}
                                onChange={e => {
                                    setSalary(e.target.value);
                                    setTimeout(()=>setValidatedSalary(validateSalary(e.target.value)), 500);
                                }}
                                className={!validatedSalary && validationClasses.wrongTextField}
                            />
                        </div>
                        <div className={`${flexClasses.flexRowSpaceBetween} ${classes.submit}`}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={transportWithTheClient}
                                        color={"secondary"}
                                        onChange={() => setTransportWithTheClient(!transportWithTheClient)}
                                    />
                                }
                                label={'I want to participate in transport'}
                            />
                            <Button variant={'contained'} onClick={()=>handleSubmit()} className={classes.submitButton}>
                                Submit
                                <ArrowForwardIcon fontSize={'large'}/>
                            </Button>
                        </div>
                    </Card>
            </div>
        </StyleRoot>
    )
}
