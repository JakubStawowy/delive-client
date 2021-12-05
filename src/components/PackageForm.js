import {Button, Card, makeStyles, MenuItem, Select, TextField, Typography} from "@material-ui/core";
import {validateNumberFormat} from "../actions/validators";
import {flexComponents, paddingComponents, sizeComponents, validatedComponents} from "../style/components";
import {useState} from "react";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import {CENTIMETER, CM, METER} from "../consts/unitConsts";

export const PackageForm = (props) => {

    const [packageLength, setPackageLength] = useState(null);
    const [lengthUnit, setLengthUnit] = useState('M');
    const [packageLengthValidated, setPackageLengthValidated] = useState(true);
    const [packageWidth, setPackageWidth] = useState(null);
    const [widthUnit, setWidthUnit] = useState('M');
    const [packageWidthValidated, setPackageWidthValidated] = useState(true);
    const [packageHeight, setPackageHeight] = useState(null);
    const [heightUnit, setHeightUnit] = useState('M');
    const [packageHeightValidated, setPackageHeightValidated] = useState(true);
    const [packageWeight, setPackageWeight] = useState(null);
    const [packageWeightValidated, setPackageWeightValidated] = useState(true);

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
        const x = packageLengthValidated && packageLength !== null;
        const y = packageWidthValidated && packageWidth !== null;
        const z = packageHeightValidated && packageHeight !== null;
        const v = packageWeightValidated && packageWeight !== null;
        const message = (!x ? "Wrong package length value\n" : "") + (!y ? "Wrong package width value\n" : "")
            + (!z ? "Wrong package height value\n" : "") + (!v ? "Wrong package weight value" : "");
        x && y && z && v ?
            props.addPackage({
                id: props.packagesLength,
                packageLength,
                lengthUnit,
                packageWidth,
                widthUnit,
                packageHeight,
                heightUnit,
                packageWeight
            }) :
        alert(message);
    }

    return (
        <Typography variant={'h5'} className={`${flexClasses.flexRowSpaceAround} ${sizeClasses.fullWidth}`}>
            <Card className={`${flexClasses.flexColumnSpaceAround} ${paddingClasses.paddingMedium}`}>
                <div className={`${classes.section} ${flexClasses.flexRowSpaceBetween}`}>
                    <TextField
                        className={!packageLengthValidated && validationClasses.wrongTextField}
                        value={packageLength}
                        onChange={(e)=> {
                            setPackageLength(e.target.value);
                            setTimeout(()=>setPackageLengthValidated(validateNumberFormat(e.target.value)), 500);
                        }}
                        label={`Length [${lengthUnit}]`} />
                    <Select className={classes.select} onChange={e => setLengthUnit(e.target.value)} defaultValue={METER}>
                        <MenuItem value={CENTIMETER}>{CENTIMETER}</MenuItem>
                        <MenuItem value={METER}>{METER}</MenuItem>
                    </Select>
                </div>
                <div className={`${classes.section} ${flexClasses.flexRowSpaceBetween}`}>
                    <TextField
                        className={!packageWidthValidated && validationClasses.wrongTextField}
                        value={packageWidth}
                        onChange={(e)=> {
                            setPackageWidth(e.target.value);
                            setTimeout(()=>setPackageWidthValidated(validateNumberFormat(e.target.value)), 500);
                        }}
                        label={`Width [${widthUnit}]`}
                    />
                    <Select className={classes.select} onChange={e => setWidthUnit(e.target.value)} defaultValue={METER}>
                        <MenuItem value={CENTIMETER}>{CENTIMETER}</MenuItem>
                        <MenuItem value={METER}>{METER}</MenuItem>
                    </Select>
                </div>
                <div className={`${classes.section} ${flexClasses.flexRowSpaceBetween}`}>
                    <TextField
                        className={!packageHeightValidated && validationClasses.wrongTextField}
                        value={packageHeight}
                        onChange={(e)=> {
                            setPackageHeight(e.target.value);
                            setTimeout(()=>setPackageHeightValidated(validateNumberFormat(e.target.value)), 500);
                        }}
                        label={`Height [${heightUnit}]`} />
                        <Select className={classes.select} onChange={e => setHeightUnit(e.target.value)} defaultValue={METER}>
                            <MenuItem value={CENTIMETER}>{CENTIMETER}</MenuItem>
                            <MenuItem value={METER}>{METER}</MenuItem>
                        </Select>
                </div>
                <div className={`${classes.section} ${flexClasses.flexRowSpaceBetween}`}>
                    <TextField
                        className={!packageWeightValidated && validationClasses.wrongTextField}
                        value={packageWeight}
                        onChange={(e)=> {
                            setPackageWeight(e.target.value);
                            setTimeout(()=>setPackageWeightValidated(validateNumberFormat(e.target.value)), 500);
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
