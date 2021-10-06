import React, {useEffect, useState} from 'react';
import {Button, makeStyles, MenuItem, Select} from "@material-ui/core";
import {flexComponents, rwdComponents, sizeComponents} from "../style/components";
import {useHistory} from "react-router";
import logo from "../uploads/menu-logo.png";
import MenuIcon from '@material-ui/icons/Menu';
import {i18n} from "../data/i18n";
import {useAnimationStyles} from "../style/animation";
import {fadeInDown, fadeOutUp} from "react-animations";
import {ANIMATION_TIME, SM_MEDIA_QUERY} from "../data/consts";
import {StyleRoot} from "radium";
import {logoutUser} from "../actions/restActions";
import {USER_ID} from "../consts/applicationConsts";

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
    const fadeInAnimationStyles = useAnimationStyles(fadeInDown, ANIMATION_TIME / 2);
    const fadeOutAnimationStyles = useAnimationStyles(fadeOutUp, ANIMATION_TIME / 2);

    const handleLogout = () => {
        logoutUser({
            'id': localStorage.getItem(USER_ID)
        }).then(() => {
            localStorage.clear();
            history.push("/login");
            closeMenu();
        }).catch((error) => alert(error));
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
            <div className={`${classes.container} ${flex.flexRowSpaceAround} ${size.menuHeight}`}>
                <img src={logo} alt={''} className={classes.logo} onClick={()=>handleNav('/home')}/>
                <div
                    className={`${rwd.menu} ${menuOpened ? rwd.visibleMobileFlexComponent : rwd.hiddenMobileComponent}`}
                    style={menuAnimated
                        ?
                        (window.matchMedia(SM_MEDIA_QUERY).matches
                            ? fadeInAnimationStyles.animation : null)
                        :
                        (window.matchMedia(SM_MEDIA_QUERY).matches
                            ? fadeOutAnimationStyles.animation : null)}
                >
                    <Button variant={'contained'} onClick={()=>handleNav('/announcementType')}>
                        {menuStatements.newOffer}
                    </Button>
                    <Button variant={'contained'} onClick={()=>handleNav('/home')}>
                        {menuStatements.allOffers}
                    </Button>
                    <Button variant={'contained'} onClick={()=>handleNav('/messages')}>
                        Messages
                    </Button>
                    <Button variant={'contained'} onClick={()=>handleNav('/delivery')}>
                        Delivery
                    </Button>
                    <Button variant={'contained'} onClick={()=>handleNav('/profile/' + localStorage.getItem(USER_ID))}>
                        Profile
                    </Button>
                    <Button variant={'contained'} onClick={()=>handleLogout()} >
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
                </div>
                <Button className={`${rwd.mobileComponent}`} onClick={()=>closeMenu()}>
                    <MenuIcon fontSize={'large'} className={`${classes.icon}`}/>
                </Button>
            </div>
        </StyleRoot>
    )
}
