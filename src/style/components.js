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
    },
    flexRowCenter: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    flexColumnCenter: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
})));

export const paddingComponents = makeStyles((()=>({
    paddingMedium: {
        padding: '2em'
    },
    paddingSmall: {
        padding: '1em'
    },
    noPadding: {
        padding: 0
    }
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
    },
    componentHeight: {
        height: '70vh'
    }
})));

export const listComponents = makeStyles(((theme)=>({
    verticalList: {
        height: '70vh',
        overflow: 'auto'
    },
    horizontalList: {
        maxWidth: '30vw',
        overflow: 'auto',
        [theme.breakpoints.down('xs')]: {
            maxWidth: '100vw',
        },
        [theme.breakpoints.between('sm', 'md')]: {
            maxWidth: '60vw',
        }
    }
})));

export const rwdComponents = makeStyles(((theme)=>({
    mobileComponent: {
        display: 'none',
        [theme.breakpoints.down('sm')]: {
            display: 'block'
        }
    },
    singleMobileCard: {
        width: '40vw',
        // height: '60vh',
        [theme.breakpoints.down('xs')]: {
            // width: '100%'
            width: '90vw'
        },
        [theme.breakpoints.between('sm', 'md')]: {
            width: '60vw'
        }
    },
    listItem: {
        width: '40vw',
        [theme.breakpoints.down('xs')]: {
            width: '100%'
        },
        [theme.breakpoints.between('sm', 'md')]: {
            width: '60vw'
        }
    },
    biggerMobileCard: {
        [theme.breakpoints.down('xs')]: {
            width: '100%'
        },
        width: '80vw'
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
        [theme.breakpoints.down('sm')]: {
            position: 'absolute',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
            top: '12vh',
            background: 'red',
            height: '88vh',
            width: '100%',
            zIndex: 3
        }
    },
    visibleMobileFlexComponent: {
        [theme.breakpoints.down('sm')]: {
            display: 'flex'
        }
    },
    hiddenMobileComponent: {
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        }
    },
})));

export const validatedComponents = makeStyles({
    wrongTextField: {
        borderBottom: '1px solid red'
    }
});
