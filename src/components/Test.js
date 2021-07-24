import {flexComponents, sizeComponents} from "../style/components";
import {GoogleMap, useLoadScript} from "@react-google-maps/api";
import {useEffect, useState} from "react";
import ReactMapGl, {Marker} from 'react-map-gl';
import {Button} from "@material-ui/core";

const libraries = ["places"];
const mapContainerStyle = {
    width: '70vw',
    height: '70vh'
}
const center = {
    lat: 43.653225,
    lng: -79.38186
}

export const Test = () => {

    const flex = flexComponents();
    const size = sizeComponents();

    // const {isLoaded, loadError} = useLoadScript({
    //     googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    //     libraries
    // });
    //
    // if (loadError) return "Error";
    // if (!isLoaded) return "loading";

    const [viewport, setViewport] = useState({
        latitude: 54.608860,
        longitude: 18.801050,
        width: '100vw',
        height: '100vh',
        zoom: 10
    });

    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);

    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(position => {
            setViewport({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                width: '100vw',
                height: '100vh',
                zoom: 10
            });

            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
        });
    }, []);

    return (
        <div className={`${flex.flexColumnSpaceAround} ${size.fullHeightWidth}`}>
            {/*<GoogleMap*/}
            {/*    mapContainerStyle={mapContainerStyle}*/}
            {/*    zoom={8}*/}
            {/*    center={center}*/}
            {/*>*/}

            {/*</GoogleMap>*/}
            <ReactMapGl
                {...viewport}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                onViewportChange={viewport=>{setViewport(viewport);}}
                mapStyle={'mapbox://styles/mapbox/streets-v11'}
            >
                <Marker longitude={longitude} latitude={latitude}>
                    <Button variant={'contained'}>
                        Hello
                    </Button>
                </Marker>
            </ReactMapGl>
        </div>
    )
}
