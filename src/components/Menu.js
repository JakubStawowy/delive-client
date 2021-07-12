import React, {useEffect, useState} from 'react';
import {Button, makeStyles, MenuItem, Select} from "@material-ui/core";
import {flexComponents, rwdComponents, sizeComponents} from "../style/components";
import {useHistory} from "react-router";
import logo from "../uploads/menu-logo.png";
import MenuIcon from '@material-ui/icons/Menu';
import {animated, useSpring} from 'react-spring';
import {statements} from "../data/i18n/statements";

export const Menu = (props) => {

    const localeSet = Object.keys(statements);
    const menuStatements = statements[props.locale].menuItems;

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
        },
        select: {

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
        setMenuOpened(false);
    }

    const handleAnnouncementRequest = () => {
        history.push("/announcementType");
        setMenuOpened(false);
    }

    const handleHome = () => {
        history.push('/home');
        setMenuOpened(false);
    }

    const springStyles = useSpring({
       from: {
           opacity: 0
       },
       to: {
           opacity: menuOpened ? 1 : 0,
           display: menuOpened ? 'flex' : 'none'
       }
    });

    const handleChangeLocale = (e) => {
        const locale = e.target.value;
        props.action(locale);
        localStorage.setItem('locale', locale);
        // history.go(0);
    }

    return (
        <div className={`${classes.container} ${flex.flexRowSpaceAround} ${size.menuHeight}`}>
            <img src={logo} alt={''} className={classes.logo} onClick={()=>handleHome()}/>
            {/*<Button variant={'contained'} className={`${rwd.desktopComponent}`}>*/}
                <animated.div
                    className={`${rwd.menu} ${menuOpened ? rwd.visibleMobileFlexComponent : rwd.hiddenMobileComponent}`}
                    // className={`${rwd.menu} ${rwd.visibleMobileFlexComponent}`}
                    // style={springStyles}
                >
                    <Button variant={'contained'} onClick={()=>handleAnnouncementRequest()}>
                        {menuStatements.newOffer}
                    </Button>
                    <Button variant={'contained'} onClick={()=>handleHome()}>
                        {menuStatements.allOffers}
                    </Button>
                    <Button variant={'contained'} onClick={()=>handleLogin()} >
                        {menuStatements.login}
                    </Button>
                    <Select
                        onChange={(e)=>handleChangeLocale(e)}
                        className={`${classes.select}`}
                    >
                        {
                            localeSet.map(key=>{
                                return (
                                    <MenuItem
                                        value={key}
                                    >
                                        {key}
                                    </MenuItem>
                                )
                            })
                        }
                    </Select>
                </animated.div>
            <Button className={`${rwd.mobileComponent}`} onClick={()=>setMenuOpened(!menuOpened)}>
                <MenuIcon fontSize={'large'} className={`${classes.icon}`}/>
            </Button>

        </div>
    )
}
