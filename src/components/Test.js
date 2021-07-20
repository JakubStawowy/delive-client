import {flexComponents, sizeComponents} from "../style/components";
import {GoogleMap, useLoadScript, Marker, InfoWindow} from "@react-google-maps/api";

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

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,

    });

    if (loadError) return "Error";
    if (!isLoaded) return "Loading Maps";

    return (
        <div className={`${flex.flexColumnSpaceAround} ${size.fullHeightWidth}`}>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={8}
                center={center}
            >

            </GoogleMap>
        </div>
    )
}
