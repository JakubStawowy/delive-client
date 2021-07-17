import {makeStyles} from "@material-ui/core";

export const flexComponents = makeStyles((()=>({
    flexRowSpaceAround: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexWrap: 'wrap'
    },
    flexColumnSpaceAround: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    flexRowSpaceBetween: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    flexColumnSpaceBetween: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})));

export const paddingComponents = makeStyles((()=>({
    paddingMedium: {
        padding: '2em'
    },
    paddingSmall: {
        padding: '1em'
    },
})));

export const sizeComponents = makeStyles((()=>({
    fullHeightWidth: {
        height: '100%',
        width: '100%'
    },
    fullWidth: {
        width: '100%'
    },
    menuHeight: {
        height: '12vh'
    },
    bodyHeight: {
        height: '88vh'
    }
})));

export const listComponents = makeStyles((()=>({
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
    singleMobileCard: {
        width: '30vw',
        [theme.breakpoints.down('xs')]: {
            width: '100%'
        }
    },
    mobileCard: {
        [theme.breakpoints.down('xs')]: {
            width: '100%'
        }
    },
    menu: {
        width: '60%',
        display: 'flex',
        justifyContent: 'space-between',
        [theme.breakpoints.down('xs')]: {
            position: 'absolute',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
            top: '12vh',
            background: 'red',
            height: '88vh',
            width: '100%',
            zIndex: 1
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
