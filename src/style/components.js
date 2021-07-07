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
