import ReactMapGl, {Marker} from 'react-map-gl';
import {useEffect, useState} from "react";
import {BounceLoader} from "react-spinners";
import {StyleRoot} from "radium";
import {useAnimationStyles} from "../style/animation";
import {fadeIn, bounceInDown} from "react-animations";
import {ANIMATION_TIME, XS_MEDIA_QUERY} from "../data/consts";
import RoomIcon from '@material-ui/icons/Room';
import {Button, Card, Checkbox, FormControlLabel, makeStyles, TextField} from "@material-ui/core";

import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import {flexComponents, paddingComponents} from "../style/components";

export const MapFormModal = (props) => {

    const [viewport, setViewport] = useState(null);

    const useStyles = makeStyles(((theme)=>({
        pin: {
            color: 'red'
        },
        button: {
            width: '50%',
            borderRadius: 0
        },
        check: {
            color: "green"
        },
        clear: {
            color: "red"
        },
        container: {
            borderBottomRightRadius: 0,
            borderBottomLeftRadius: 0,
        },
    })));
    const classes = useStyles();
    const bounceInDownAnimationStyles = useAnimationStyles(bounceInDown, ANIMATION_TIME * 2);
    const loaderAnimationStyles = useAnimationStyles(fadeIn, ANIMATION_TIME);
    const flexClasses = flexComponents();
    const paddingClasses = paddingComponents();

    const handleLocationError = () => {
        alert("Wystąpił problem z pobieraniem geolokacji");
        setDefaultViewport();
    }

    const mobileMapWidth = '100vw';
    const normalMapWidth = '40vw';
    const mapHeight = '50vh';

    const setDefaultViewport = () => {
        setViewport({
            latitude: 0,
            longitude: 0,
            width: window.matchMedia(XS_MEDIA_QUERY).matches ? mobileMapWidth : normalMapWidth,
            height: mapHeight,
            zoom: 0,
        });
    }

    useEffect(()=>{
        props.longitude !== null && props.latitude !== null ?

            setViewport({
                latitude: props.latitude,
                longitude: props.longitude,
                width: window.matchMedia(XS_MEDIA_QUERY).matches ? mobileMapWidth : normalMapWidth,
                height: mapHeight,
                zoom: 10,
            })
            :
            navigator.geolocation.getCurrentPosition(position => {
                setViewport({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    width: window.matchMedia(XS_MEDIA_QUERY).matches ? mobileMapWidth : normalMapWidth,
                    height: mapHeight,
                    zoom: 10,
                });
            }, ()=>handleLocationError());
    }, []);

    const handleConfirm = () => {
        props.setLatitude(viewport.latitude);
        props.setLongitude(viewport.longitude);
        props.setModalOpened(false);
    }

    const handleClose = () => props.setModalOpened(false);

    return (
        <StyleRoot>
            <Card className={`${flexClasses.flexColumnSpaceAround} ${classes.container}`}>
                <div className={`${flexClasses.flexColumnSpaceBetween}`}>

                    {
                        viewport === null ?
                            <div style={loaderAnimationStyles.animation}>
                                <BounceLoader
                                    loading
                                    color={'red'}
                                />
                            </div>
                            :
                            <div id={'map'} style={bounceInDownAnimationStyles.animation}>
                                <ReactMapGl
                                    {...viewport}
                                    mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                                    onViewportChange={viewport => setViewport(viewport)}
                                    mapStyle={'mapbox://styles/mapbox/streets-v11'}
                                >
                                    {
                                        props.coordinates === undefined &&
                                        <Marker longitude={viewport.longitude} latitude={viewport.latitude}>
                                            <RoomIcon fontSize={'large'} className={classes.pin}/>
                                        </Marker>
                                    }
                                </ReactMapGl>
                            </div>
                    }
                </div>

            </Card>
            <div>
                <Button variant={'contained'} className={classes.button} onClick={()=>handleConfirm()}>
                    <CheckIcon className={classes.check}/>
                </Button>
                <Button variant={'contained'} className={classes.button} onClick={()=>handleClose()}>
                    <ClearIcon className={classes.clear}/>
                </Button>
            </div>
        </StyleRoot>
    )
}
