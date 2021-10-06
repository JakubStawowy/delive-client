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
import {getHalfwayPoint} from "../actions/restActions";

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
        singleButton: {
            width: '100%',
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
        setDefaultViewport();
    }

    const setDefaultViewport = () => {
        setViewport({
            latitude: 0,
            longitude: 0,
            width: window.matchMedia(XS_MEDIA_QUERY).matches ? '100vw' : '80vw',
            height: '80vh',
            zoom: 0,
        });
    }

    useEffect(()=>{
        if (props.coordinates !== undefined) {
            getHalfwayPoint({
                fromLatitude: props.coordinates.fromLatitude,
                toLatitude: props.coordinates.toLatitude,
                fromLongitude: props.coordinates.fromLongitude,
                toLongitude: props.coordinates.toLongitude,
                mapWidth: document.getElementById('root').clientWidth
            }).then((response)=> {
                setViewport({
                    latitude: response.data.latitude,
                    longitude: response.data.longitude,
                    width: window.matchMedia(XS_MEDIA_QUERY).matches ? '100vw' : '80vw',
                    height: '80vh',
                    zoom: response.data.zoomLevel
                });
            }).catch((error)=>alert(error));
        }
        else if (props.latitude !== undefined && props.longitude !== undefined) {
            setViewport({
                latitude: props.latitude,
                longitude: props.longitude,
                width: window.matchMedia(XS_MEDIA_QUERY).matches ? '100vw' : '80vw',
                height: '80vh',
                zoom: 15
            });
        }
        else {
            navigator.geolocation.getCurrentPosition(position => {
                setViewport({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    width: window.matchMedia(XS_MEDIA_QUERY).matches ? '100vw' : '80vw',
                    height: '80vh',
                    zoom: 15,
                });
            }, ()=>handleLocationError());
        }
    }, []);

    const handleConfirm = () => {
        props.setLatitude(viewport.latitude);
        props.setLongitude(viewport.longitude);
        props.setModalOpened(false);
    }

    const handleClose = () => props.setModalOpened(false);

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
                        <div id={'map'} style={bounceInDownAnimationStyles.animation}>
                            <ReactMapGl
                                {...viewport}
                                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                                onViewportChange={viewport => setViewport(viewport)}
                                mapStyle={'mapbox://styles/mapbox/streets-v11'}
                            >
                                {
                                    props.coordinates !== undefined && props.longitude === undefined &&
                                        <div>
                                            <Marker longitude={props.coordinates.fromLongitude} latitude={props.coordinates.fromLatitude}>
                                                <RoomIcon fontSize={'large'} className={classes.pin}/>
                                            </Marker>
                                            <Marker longitude={props.coordinates.toLongitude} latitude={props.coordinates.toLatitude}>
                                                <RoomIcon fontSize={'large'} className={classes.pin}/>
                                            </Marker>
                                        </div>
                                }
                                {

                                    props.coordinates === undefined && props.longitude === undefined &&
                                        <Marker longitude={viewport.longitude} latitude={viewport.latitude}>
                                            <RoomIcon fontSize={'large'} className={classes.pin}/>
                                        </Marker>
                                }
                                {
                                    props.longitude !== undefined && props.coordinates === undefined &&
                                        <Marker longitude={props.longitude} latitude={props.latitude}>
                                            <RoomIcon fontSize={'large'} className={classes.pin}/>
                                        </Marker>
                                }
                            </ReactMapGl>
                            {
                                props.setModalOpened !== undefined &&
                                <div>
                                    {
                                        (props.longitude !== undefined || props.coordinates !== undefined) ?
                                            <Button variant={'contained'} className={classes.singleButton} onClick={()=>handleClose()}>
                                                <CheckIcon className={classes.check}/>
                                            </Button>
                                            :
                                            <div>
                                                <Button variant={'contained'} className={classes.button} onClick={()=>handleConfirm()}>
                                                    <CheckIcon className={classes.check}/>
                                                </Button>
                                                <Button variant={'contained'} className={classes.button} onClick={()=>handleClose()}>
                                                    <ClearIcon className={classes.clear}/>
                                                </Button>
                                            </div>
                                    }
                                </div>
                            }
                        </div>
                }
            </div>
        </StyleRoot>
    )
}
