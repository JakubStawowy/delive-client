import {BounceLoader} from "react-spinners";
import ReactMapGl, {Marker} from "react-map-gl";
import RoomIcon from "@material-ui/icons/Room";
import {makeStyles} from "@material-ui/core";
import {useEffect, useState} from "react";
import {XS_MEDIA_QUERY} from "../data/consts";
import {getHalfwayPoint} from "../rest/restActions";

export const MapItem = (props) => {

    const [viewport, setViewport] = useState(null);

    const useStyles = makeStyles((()=>({
        pin: {
            color: 'red'
        },
    })));
    const classes = useStyles();

    useEffect(()=>{
        props.coordinates !== undefined ?
            getHalfwayPoint({
                fromLatitude: props.coordinates.fromLatitude,
                toLatitude: props.coordinates.toLatitude,
                fromLongitude: props.coordinates.fromLongitude,
                toLongitude: props.coordinates.toLongitude,
                mapWidth: window.matchMedia(XS_MEDIA_QUERY).matches ?
                    document.getElementById('root').clientWidth * 0.8 : document.getElementById('root').clientWidth * 0.4,
                mapHeight: document.getElementById('root').clientHeight * 0.3
            }).then((response)=> {
                setViewport({
                    latitude: response.data.latitude,
                    longitude: response.data.longitude,
                    width: window.matchMedia(XS_MEDIA_QUERY).matches ? '80vw' : '40vw',
                    height: '30vh',
                    zoom: response.data.zoomLevel
                    // zoom: 15
                });
            }).catch((error)=>alert(error))
            :
            setViewport({
                latitude: props.latitude,
                longitude: props.longitude,
                width: window.matchMedia(XS_MEDIA_QUERY).matches ? '80vw' : '40vw',
                height: '30vh',
                zoom: 15
            });
    }, []);

    return (
        <div>
            {
                viewport === null ?
                    <BounceLoader
                        loading
                        color={'red'}
                    />
                    :
                    <div id={'map'}>
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
                    </div>
            }
        </div>
    )
}
