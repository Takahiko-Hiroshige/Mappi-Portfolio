/**
 *import Library
 */
import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import Geocoder from "react-native-geocoding";

const apiKey = "AIzaSyBLtufiSkb4dE3Xtk2rwPQl7mAPGFdnt0E";

const containerStyle = {
    width: "100%",
    height: "100%",
};
Geocoder.init(apiKey);

const Map = (props) => {
    const { address } = props;
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);
    const [getLocationError, setGetLocationError] = useState("");
    Geocoder.from(address)
        .then((json) => {
            const location = json.results[0].geometry.location;
            setLat(location.lat);
            setLng(location.lng);
        })
        .catch((error) => setGetLocationError(error));

    const center = {
        lat: lat,
        lng: lng,
    };

    return !getLocationError ? (
        <LoadScript googleMapsApiKey={apiKey}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={17}
            >
                <Marker position={center} />
            </GoogleMap>
        </LoadScript>
    ) : (
        <p className="text-1xl font-bold">
            読み込みに失敗しました。申し訳ありませんが、もう一度開き直してください。
        </p>
    );
};

export default Map;
