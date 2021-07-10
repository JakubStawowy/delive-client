import React, {useState} from 'react';
import {Button, makeStyles} from "@material-ui/core";
import {flexComponents, rwdComponents, sizeComponents} from "../style/components";
import {useHistory} from "react-router";
import logo from "../uploads/menu-logo.png";
import MenuIcon from '@material-ui/icons/Menu';

export const Header = () => {

    const useStyles = makeStyles(({
        container: {
            background: 'red',
            width: '100%',
            // height: '12vh'
        },
        logo: {
            height: '80%',
        },
        icon: {
            color: 'white'
        }
    }));
    const classes = useStyles();
    const flex = flexComponents();
    const size = sizeComponents();
    const rwd = rwdComponents();
    const history = useHistory();

    const [menuOpened, setMenuOpened] = useState(false);

    const handleLogin = () => {
        history.push("/login");
    }

    return (
        <div className={`${classes.container} ${flex.flexRowSpaceAround} ${size.menuHeight}`}>
            <img src={logo} alt={''} className={classes.logo}/>
            {/*<Button variant={'contained'} className={`${rwd.desktopComponent}`}>*/}
            <div className={`${rwd.menu} ${menuOpened ? rwd.visibleMobileFlexComponent : rwd.hiddenMobileComponent}`}>
                <Button variant={'contained'}  >
                    Ask for the delivery
                </Button>
                <Button variant={'contained'} >
                    Check the offers
                </Button>
                <Button variant={'contained'} onClick={()=>handleLogin()} >
                    Login / Logout
                </Button>
            </div>
            <Button className={`${rwd.mobileComponent}`} onClick={()=>setMenuOpened(!menuOpened)}>
                <MenuIcon fontSize={'large'} className={`${classes.icon}`}/>
            </Button>
        </div>
    )
}
