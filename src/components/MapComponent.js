import ReactMapGl, {Marker} from "react-map-gl";
import RoomIcon from "@material-ui/icons/Room";
import {Button, makeStyles} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import {useEffect, useState} from "react";
import {XS_MEDIA_QUERY} from "../data/consts";

export const MapComponent = props => {


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
            width: '30vw',
            height: '30vh'
        }
    })));
    const classes = useStyles();

    useEffect(()=>{
        setViewport({
            latitude: 0,
            longitude: 0,
            width: window.matchMedia(XS_MEDIA_QUERY).matches ? '100vw' : '30vw',
            height: '80vh',
            zoom: 0,
        });
    }, []);

    return (
        <div id={'map'}>
            {
                viewport !== null &&
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
                </ReactMapGl>
            }
        </div>
    )
}
