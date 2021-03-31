/**
 *
 * Project Name: 	DCroSS
 * Author List: 	Faraaz Biyabani
 * Filename: 		EarthquakePopup.js
 * Description:     Popup for earthquake markers.
 *
 */


import React from "react";
import {Popup} from "react-map-gl";

function EarthquakePopup(props) {
    const {earthquake, setWeather} = props;
    const displayName = `${earthquake.properties.name}, ${earthquake.properties.magnitude}`;

    return (
        <Popup
            tipSize={5}
            anchor="top"
            longitude={earthquake.geometry.coordinates[0]}
            latitude={earthquake.geometry.coordinates[1]}
            closeOnClick={true}
            onClose={setWeather} >
            <div>
                <div>
                    {displayName}
                    <br/>
                    Depth: {earthquake.properties.depth.value} km
                    <br/>
                    Time: {earthquake.properties.time}
                </div>
            </div>
        </Popup>
    );
}

export default React.memo(EarthquakePopup);