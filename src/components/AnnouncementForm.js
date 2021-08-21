import {Button, Card, Grid, makeStyles, Modal, TextField, Typography} from "@material-ui/core";
import {
    flexComponents,
    paddingComponents,
    rwdComponents,
    sizeComponents, validatedComponents
} from "../style/components";

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
import {
    validateDateTimeFormat,
    validateNotEmptyStrings,
    validateNumberFormat
} from "../actions/validators";

export const AnnouncementForm = (props) => {

    const announcementFormItems = i18n[
        localStorage.getItem('locale') !== undefined
        && localStorage.getItem('locale') !== null
            ? localStorage.getItem('locale') : 'en'].announcement;
    const [bounce, setBounce] = useState(false);
    const [localizationFromModalOpened, setLocalizationFromModalOpened] = useState(false);
    const [localizationToModalOpened, setLocalizationToModalOpened] = useState(false);

    const [fromLatitude, setFromLatitude] = useState('');
    const [fromLongitude, setFromLongitude] = useState('');
    const [toLatitude, setToLatitude] = useState('');
    const [toLongitude, setToLongitude] = useState('');
    const [packageLength, setPackageLength] = useState('');
    const [packageLengthValidated, setPackageLengthValidated] = useState(true);
    const [packageWidth, setPackageWidth] = useState('');
    const [packageWidthValidated, setPackageWidthValidated] = useState(true);
    const [packageHeight, setPackageHeight] = useState('');
    const [packageHeightValidated, setPackageHeightValidated] = useState(true);
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
        }
    })))
    const classes = styles();
    const flexClasses = flexComponents();
    const paddingClasses = paddingComponents();
    const sizeClasses = sizeComponents();
    const rwdClasses = rwdComponents();
    const validationClasses = validatedComponents();
    const bounceInAnimationStyles = useAnimationStyles(bounceInRight, ANIMATION_TIME);
    const bounceOutAnimationStyles = useAnimationStyles(bounceOutLeft, ANIMATION_TIME / 2);

    const handleSubmit = () => {
        if (props.delivery) {
            validateNotEmptyStrings([
                fromLatitude,
                fromLongitude,
                toLatitude,
                toLongitude
            ]) &&
                validateDateTimeFormat(dateDay + " " + dateHour)
            ?
            addDeliveryAnnouncement({
                fromLatitude: fromLatitude,
                fromLongitude: fromLongitude,
                toLatitude: toLatitude,
                toLongitude: toLongitude,
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
            validateNotEmptyStrings([
                fromLatitude,
                fromLongitude,
                toLatitude,
                toLongitude
            ]) &&
                validateNumberFormat(packageWidth) &&
                validateNumberFormat(packageHeight) &&
                validateNumberFormat(packageLength) ?
            addNormalAnnouncement({
                fromLatitude: fromLatitude,
                fromLongitude: fromLongitude,
                toLatitude: toLatitude,
                toLongitude: toLongitude,
                packageLength: packageLength,
                packageHeight: packageHeight,
                packageWidth: packageWidth,
                authorId: localStorage.getItem(USER_ID)
            }).then(() => {
                setBounce(true);
                setTimeout(()=>history.push('/home'), ANIMATION_TIME / 2);
            }).catch((error) => alert(error))
                :
                alert("ValidationError");
        }
    };

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
                            <Typography variant={'h5'} className={`${flexClasses.flexRowSpaceAround} ${sizeClasses.fullWidth}`}>
                                {announcementFormItems.length}
                                <TextField
                                    className={!packageLengthValidated && validationClasses.wrongTextField}
                                    value={packageLength}
                                    onChange={(e)=> {
                                        setPackageLength(e.target.value);
                                        setTimeout(()=>setPackageLengthValidated(validateNumberFormat(e.target.value)), 500);
                                    }}
                                    label={'x'} />
                            </Typography>
                        }
                        {
                            !props.delivery &&
                            <Typography variant={'h5'} className={`${flexClasses.flexRowSpaceAround} ${sizeClasses.fullWidth}`}>
                                {announcementFormItems.width}
                                <TextField
                                    className={!packageWidthValidated && validationClasses.wrongTextField}
                                    value={packageWidth}
                                    onChange={(e)=> {
                                        setPackageWidth(e.target.value);
                                        setTimeout(()=>setPackageWidthValidated(validateNumberFormat(e.target.value)), 500);
                                    }}
                                    label={'y'}
                                />
                            </Typography>
                        }
                        {
                            !props.delivery &&
                            <Typography variant={'h5'} className={`${flexClasses.flexRowSpaceAround} ${sizeClasses.fullWidth}`}>
                                {announcementFormItems.height}
                                <TextField
                                    className={!packageHeightValidated && validationClasses.wrongTextField}
                                    value={packageHeight}
                                    onChange={(e)=> {
                                        setPackageHeight(e.target.value);
                                        setTimeout(()=>setPackageHeightValidated(validateNumberFormat(e.target.value)), 500);
                                    }}
                                    label={'z'} />
                            </Typography>
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
