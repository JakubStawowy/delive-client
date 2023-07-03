import {Button, Card, makeStyles, MenuItem, Select, TextField, Typography} from "@material-ui/core";
import {validateNumberFormat} from "../actions/validators";
import {flexComponents, paddingComponents, sizeComponents, validatedComponents} from "../style/components";
import {useState} from "react";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import {CENTIMETER, CM, METER} from "../consts/unitConsts";

export const PackageForm = (props) => {

    const [length, setlength] = useState(null);
    const [lengthUnit, setLengthUnit] = useState(CENTIMETER);
    const [lengthValidated, setlengthValidated] = useState(true);
    const [width, setwidth] = useState(null);
    const [widthUnit, setWidthUnit] = useState(CENTIMETER);
    const [widthValidated, setwidthValidated] = useState(true);
    const [height, setheight] = useState(null);
    const [heightUnit, setHeightUnit] = useState(CENTIMETER);
    const [heightValidated, setheightValidated] = useState(true);
    const [weight, setweight] = useState(null);
    const [weightValidated, setweightValidated] = useState(true);

    const useStyles = makeStyles((()=>({
        button: {
            width: '50%',
            borderRadius: 0
        },
        check: {
            color: "green"
        },
        clear: {
            color: "red"
        },
        section: {
            alignItems: 'end'
        },
        select: {
            marginLeft: '1em'
        }
    })));
    const classes = useStyles();
    const flexClasses = flexComponents();
    const sizeClasses = sizeComponents();
    const paddingClasses = paddingComponents();
    const validationClasses = validatedComponents();

    const handleClose = () => {
        props.setPackageFormOpened(false);
    }

    const handleConfirm = () => {
        const x = lengthValidated && length !== null;
        const y = widthValidated && width !== null;
        const z = heightValidated && height !== null;
        const v = weightValidated && weight !== null;
        const message = (!x ? "Wrong package length value\n" : "") + (!y ? "Wrong package width value\n" : "")
            + (!z ? "Wrong package height value\n" : "") + (!v ? "Wrong package weight value" : "");
        x && y && z && v ?
            props.addPackage({
                id: props.packagesLength,
                length,
                lengthUnit,
                width,
                widthUnit,
                height,
                heightUnit,
                weight
            }) :
        alert(message);
    }

    return (
        <Typography variant={'h5'} className={`${flexClasses.flexRowSpaceAround} ${sizeClasses.fullWidth}`}>
            <Card className={`${flexClasses.flexColumnSpaceAround} ${paddingClasses.paddingMedium}`}>
                <div className={`${classes.section} ${flexClasses.flexRowSpaceBetween}`}>
                    <TextField
                        className={!lengthValidated && validationClasses.wrongTextField}
                        value={length}
                        onChange={(e)=> {
                            setlength(e.target.value);
                            setTimeout(()=>setlengthValidated(validateNumberFormat(e.target.value)), 500);
                        }}
                        label={`Length [${lengthUnit}]`} />
                    <Select className={classes.select} onChange={e => setLengthUnit(e.target.value)} defaultValue={CENTIMETER}>
                        <MenuItem value={CENTIMETER}>{CENTIMETER}</MenuItem>
                        <MenuItem value={METER}>{METER}</MenuItem>
                    </Select>
                </div>
                <div className={`${classes.section} ${flexClasses.flexRowSpaceBetween}`}>
                    <TextField
                        className={!widthValidated && validationClasses.wrongTextField}
                        value={width}
                        onChange={(e)=> {
                            setwidth(e.target.value);
                            setTimeout(()=>setwidthValidated(validateNumberFormat(e.target.value)), 500);
                        }}
                        label={`Width [${widthUnit}]`}
                    />
                    <Select className={classes.select} onChange={e => setWidthUnit(e.target.value)} defaultValue={CENTIMETER}>
                        <MenuItem value={CENTIMETER}>{CENTIMETER}</MenuItem>
                        <MenuItem value={METER}>{METER}</MenuItem>
                    </Select>
                </div>
                <div className={`${classes.section} ${flexClasses.flexRowSpaceBetween}`}>
                    <TextField
                        className={!heightValidated && validationClasses.wrongTextField}
                        value={height}
                        onChange={(e)=> {
                            setheight(e.target.value);
                            setTimeout(()=>setheightValidated(validateNumberFormat(e.target.value)), 500);
                        }}
                        label={`Height [${heightUnit}]`} />
                        <Select className={classes.select} onChange={e => setHeightUnit(e.target.value)} defaultValue={CENTIMETER}>
                            <MenuItem value={CENTIMETER}>{CENTIMETER}</MenuItem>
                            <MenuItem value={METER}>{METER}</MenuItem>
                        </Select>
                </div>
                <div className={`${classes.section} ${flexClasses.flexRowSpaceBetween}`}>
                    <TextField
                        className={!weightValidated && validationClasses.wrongTextField}
                        value={weight}
                        onChange={(e)=> {
                            setweight(e.target.value);
                            setTimeout(()=>setweightValidated(validateNumberFormat(e.target.value)), 500);
                        }}
                        label={`Weight [${props.weightUnit}]`} />
                </div>
                <div>
                    <Button variant={'contained'} className={classes.button} onClick={()=>handleConfirm()}>
                        <CheckIcon className={classes.check}/>
                    </Button>
                    <Button variant={'contained'} className={classes.button} onClick={()=>handleClose()}>
                        <ClearIcon className={classes.clear}/>
                    </Button>
                </div>
            </Card>
        </Typography>
    )
}
