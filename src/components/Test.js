import {flexComponents, sizeComponents} from "../style/components";
import {GoogleMap, withGoogleMap, withScriptjs} from "react-google-maps";

const Map = () => {
    return (
        <GoogleMap
            defaultZoom={10}
            defaultCenter={{lat: 45.421532, lng: -75.697189 }}
        />
    )
}
const WrappedMap = withScriptjs(withGoogleMap(Map));

export const Test = () => {

    const flex = flexComponents();
    const size = sizeComponents();

    return (
        <div className={`${flex.flexColumnSpaceAround} ${size.fullHeightWidth}`}>
            <WrappedMap
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${
                    process.env.REACT_APP_GOOGLE_KEY
                }`}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        </div>
    )
}
