import React, {useState} from 'react';
import {Button, makeStyles, MenuItem, Select, Typography} from "@material-ui/core";
import {flexComponents, rwdComponents, sizeComponents} from "../style/components";
import {useHistory} from "react-router";
import logo from "../uploads/menu-logo.png";
import MenuIcon from '@material-ui/icons/Menu';
import {i18n} from "../data/i18n";
import {useAnimationStyles} from "../style/animation";
import {fadeInDown, fadeOutUp} from "react-animations";
import {ANIMATION_TIME, SM_MEDIA_QUERY} from "../data/consts";
import {StyleRoot} from "radium";
import {logoutUser} from "../rest/restActions";
import {disconnect, handleError} from "../actions/handlers";

export const Menu = (props) => {

    const localeSet = Object.keys(i18n);
    const menuStatements = i18n[props.locale].menuItems;
    const [menuOpened, setMenuOpened] = useState(false);
    const [menuAnimated, setMenuAnimated] = useState(false);
    const history = useHistory();

    const useStyles = makeStyles(({
        container: {
            background: 'red',
            width: '100%',
            position: 'fixed',
            top: 0,
            zIndex: 3
        },
        logo: {
            height: '80%',
        },
        icon: {
            color: 'white'
        },
        select: {

        },
        logoText: {
            fontSize: '2em',
            color: 'white',
            cursor: 'pointer'
        }
    }));
    const classes = useStyles();
    const flex = flexComponents();
    const sizeClasses = sizeComponents();
    const size = sizeComponents();
    const rwd = rwdComponents();
    const fadeInAnimationStyles = useAnimationStyles(fadeInDown, ANIMATION_TIME / 2);
    const fadeOutAnimationStyles = useAnimationStyles(fadeOutUp, ANIMATION_TIME / 2);

    const handleLogout = () => {
        logoutUser().then(() => {
            disconnect();
            localStorage.clear();
            props.setLogged(false);
            history.push("/login");
            closeMenu();
        }).catch((error) => handleError(error, history, props.setLogged));
    }

    const handleNav = url => {
        history.push(url);
        menuOpened && closeMenu();
    }

    const closeMenu = () => {
        const state = !menuAnimated;
        window.matchMedia(SM_MEDIA_QUERY).matches && setMenuAnimated(state);
        menuOpened ? setTimeout(()=>setMenuOpened(state), ANIMATION_TIME / 2) : setMenuOpened(state);
    }

    const handleChangeLocale = (e) => {
        const locale = e.target.value;
        props.action(locale);
        localStorage.setItem('locale', locale);
    }

    return (
        <StyleRoot>
            <div className={sizeClasses.menuHeight}>
                <div className={`${classes.container} ${flex.flexRowSpaceAround} ${size.menuHeight}`}>
                    <div
                        className={classes.logoText}
                        onClick={()=>handleNav('/home')}>
                        Delive
                    </div>
                    {/*<img src={logo} alt={''} className={classes.logo}/>*/}
                    <div
                        className={`${rwd.menu}
                     ${menuOpened ? rwd.visibleMobileFlexComponent : rwd.hiddenMobileComponent}`}
                        style={menuAnimated
                            ?
                            (window.matchMedia(SM_MEDIA_QUERY).matches
                                ? fadeInAnimationStyles.animation : null)
                            :
                            (window.matchMedia(SM_MEDIA_QUERY).matches
                                ? fadeOutAnimationStyles.animation : null)}
                    >
                        {
                            props.logged &&
                            <Button
                                variant={'contained'}
                                onClick={() => handleNav('/addAnnouncement/normal')}>
                                {menuStatements.newOffer}
                            </Button>
                        }
                        {/*{*/}
                        {/*    props.logged &&*/}
                        {/*    <Button variant={'contained'} onClick={()=>handleNav('/home')}>*/}
                        {/*        {menuStatements.allOffers}*/}
                        {/*    </Button>*/}
                        {/*}*/}
                        {
                            props.logged &&
                            <Button variant={'contained'} onClick={()=>handleNav('/messages')}>
                                Messages
                            </Button>
                        }
                        {
                            props.logged &&
                            <Button variant={'contained'} onClick={()=>handleNav('/delivery')}>
                                Delivery
                            </Button>
                        }
                        {
                            props.logged &&
                            <Button variant={'contained'} onClick={()=>handleNav('/profile')}>
                                Profile
                            </Button>
                        }
                        {
                            props.logged &&
                            <Button variant={'contained'} onClick={()=>handleLogout()} >
                                {menuStatements.login}
                            </Button>
                        }
                    </div>
                    <Button className={`${rwd.mobileComponent}`} onClick={()=>closeMenu()}>
                        <MenuIcon fontSize={'large'} className={`${classes.icon}`}/>
                    </Button>
                </div>
            </div>
        </StyleRoot>
    )
}
