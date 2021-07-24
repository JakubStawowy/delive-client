import ReactMapGl, {Marker} from 'react-map-gl';
import {useEffect, useState} from "react";
import {BounceLoader} from "react-spinners";
import {StyleRoot} from "radium";
import {useAnimationStyles} from "../style/animation";
import {fadeIn, bounceInDown} from "react-animations";
import {ANIMATION_TIME, XS_MEDIA_QUERY} from "../data/consts";
import RoomIcon from '@material-ui/icons/Room';
import {Button, makeStyles} from "@material-ui/core";

import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';

export const MapModal = (props) => {

    const [viewport, setViewport] = useState(null);

    const useStyles = makeStyles((()=>({
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
        map: {
            width: '80vw',
            height: '80vh'
        }
    })));
    const classes = useStyles();
    const bounceInDownAnimationStyles = useAnimationStyles(bounceInDown, ANIMATION_TIME * 2);
    const loaderAnimationStyles = useAnimationStyles(fadeIn, ANIMATION_TIME);

    const handleLocationError = () => {
        alert("Wystąpił problem z pobieraniem geolokacji");
        setViewport({
            latitude: 0,
            longitude: 0,
            width: window.matchMedia(XS_MEDIA_QUERY).matches ? '100vw' : '80vw',
            height: '80vh',
            zoom: 0,
        });
    }

    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(position => {
            setViewport({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                width: window.matchMedia(XS_MEDIA_QUERY).matches ? '100vw' : '80vw',
                height: '80vh',
                zoom: 15,
            });
        }, ()=>handleLocationError());
    }, []);

    const handleConfirm = () => {
        props.setModalOpened(false);
    }

    const handleCancel = () => {
        props.setModalOpened(false);
    }

    useEffect(()=>{
        console.log(classes);
    }, []);

    return (
        <StyleRoot>
            <div>
                {
                    viewport === null ?
                        <div style={loaderAnimationStyles.animation}>
                            <BounceLoader
                                loading
                                color={'red'}
                            />
                        </div>
                        :
                        <div style={bounceInDownAnimationStyles.animation}>
                            <ReactMapGl
                                {...viewport}
                                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                                onViewportChange={viewport=>{setViewport(viewport);}}
                                mapStyle={'mapbox://styles/mapbox/streets-v11'}
                            >
                                <Marker longitude={viewport.longitude} latitude={viewport.latitude}>
                                    <RoomIcon fontSize={'large'} className={classes.pin}/>
                                </Marker>
                            </ReactMapGl>
                            <Button variant={'contained'} className={classes.button} onClick={()=>handleConfirm()}>
                                <CheckIcon className={classes.check}/>
                            </Button>
                            <Button variant={'contained'} className={classes.button} onClick={()=>handleCancel()}>
                                <ClearIcon className={classes.clear}/>
                            </Button>
                        </div>
                }
            </div>
        </StyleRoot>
    )
}
