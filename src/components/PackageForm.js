import {Button, Card, makeStyles, TextField, Typography} from "@material-ui/core";
import {validateNumberFormat} from "../actions/validators";
import {flexComponents, paddingComponents, sizeComponents, validatedComponents} from "../style/components";
import {useState} from "react";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";

export const PackageForm = (props) => {

    const [packageLength, setPackageLength] = useState(null);
    const [packageLengthValidated, setPackageLengthValidated] = useState(true);
    const [packageWidth, setPackageWidth] = useState(null);
    const [packageWidthValidated, setPackageWidthValidated] = useState(true);
    const [packageHeight, setPackageHeight] = useState(null);
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
        packageLengthValidated && packageLength !== null &&
        packageWidthValidated && packageWidth !== null &&
        packageHeightValidated && packageHeight !== null ?
            props.addPackage({
                id: props.packagesLength,
                packageLength,
                packageWidth,
                packageHeight,
                packageWeight
            }) :
        alert("ValidationError");
    }

    return (
        <Typography variant={'h5'} className={`${flexClasses.flexRowSpaceAround} ${sizeClasses.fullWidth}`}>
            <Card className={`${flexClasses.flexColumnSpaceAround} ${paddingClasses.paddingMedium}`}>
                {props.announcementFormItems.length}
                <TextField
                    className={!packageLengthValidated && validationClasses.wrongTextField}
                    value={packageLength}
                    onChange={(e)=> {
                        setPackageLength(e.target.value);
                        setTimeout(()=>setPackageLengthValidated(validateNumberFormat(e.target.value)), 500);
                    }}
                    label={'x'} />
                {props.announcementFormItems.width}
                <TextField
                    className={!packageWidthValidated && validationClasses.wrongTextField}
                    value={packageWidth}
                    onChange={(e)=> {
                        setPackageWidth(e.target.value);
                        setTimeout(()=>setPackageWidthValidated(validateNumberFormat(e.target.value)), 500);
                    }}
                    label={'y'}
                />
                {props.announcementFormItems.height}
                <TextField
                    className={!packageHeightValidated && validationClasses.wrongTextField}
                    value={packageHeight}
                    onChange={(e)=> {
                        setPackageHeight(e.target.value);
                        setTimeout(()=>setPackageHeightValidated(validateNumberFormat(e.target.value)), 500);
                    }}
                    label={'z'} />
                Weight:
                <TextField
                    className={!packageWeightValidated && validationClasses.wrongTextField}
                    value={packageWeight}
                    onChange={(e)=> {
                        setPackageWeight(e.target.value);
                        setTimeout(()=>setPackageWeightValidated(validateNumberFormat(e.target.value)), 500);
                    }}
                    label={'z'} />
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
