import React from 'react';
import {Button, makeStyles, Paper} from "@material-ui/core";
import {flexComponents, sizeComponents} from "../style/components";

export const Header = () => {

    const useStyles = makeStyles(({
        container: {
            background: 'red',
            width: '100%',
            // height: '12vh'
        }
    }));
    const classes = useStyles();
    const flex = flexComponents();
    const size = sizeComponents();

    return (
        <div className={`${classes.container} ${flex.flexRowSpaceAround} ${size.menuHeight}`}>
            <Button>
                Item1
            </Button>
            <Button>
                Item2
            </Button>
            <Button variant={'contained'}>
                Login
            </Button>
        </div>
    )
}
