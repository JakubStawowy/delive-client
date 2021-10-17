import {Button, makeStyles} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";

export const ModalTemplate = (props) => {

    const useClasses = makeStyles((() => ({
        button: {
            width: '100%',
            borderRadius: 0
        },
        check: {
            color: "green"
        },
        clear: {
            color: "red"
        }
    })));
    const classes = useClasses();

    return (<div>
        {props.child}
        <Button
            variant={"contained"}
            className={classes.button}
            onClick={() => props.action(false)}
        >
            <CheckIcon className={classes.check}/>
        </Button>
    </div>)
}
