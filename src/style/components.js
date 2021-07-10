import {makeStyles} from "@material-ui/core";

export const flexComponents = makeStyles(((theme)=>({
    flexRowSpaceAround: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    flexColumnSpaceAround: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around'
    }
})));

export const paddingComponents = makeStyles(((theme)=>({
    padding: {
        padding: '2em'
    },
})));

export const sizeComponents = makeStyles(((theme)=>({
    fullHeightWidth: {
        height: '100%',
        width: '100%'
    },
    menuHeight: {
        height: '12vh'
    },
    bodyHeight: {
        height: '88vh'
    }
})));

export const listComponents = makeStyles(((theme)=>({
    announcementList: {
        maxHeight: '70vh',
        overflow: 'auto'
    }
})));

export const rwdComponents = makeStyles(((theme)=>({
    mobileComponent: {
        display: 'none',
        [theme.breakpoints.down('xs')]: {
            display: 'block'
        }
    },
    desktopComponent: {
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        }
    },
    menu: {
        [theme.breakpoints.down('xs')]: {
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
            top: '12vh',
            background: 'red',
            height: '88vh',
            width: '100%',
            zIndex: 1,
            opacity: '80%',
        },
        '&:after': {
            background: 'green'
        }
    },
    visibleMobileFlexComponent: {
        [theme.breakpoints.down('xs')]: {
            display: 'flex'
        }
    },
    hiddenMobileComponent: {
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        }
    },

})));
