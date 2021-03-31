/**
 *
 * Project Name: 	DCroSS
 * Author List: 	Faraaz Biyabani
 * Filename: 		WeatherPopup2.js
 * Description:     Popup for weather markers.
 *
 */


import React from "react";


export default function WeatherPopup(props) {
    const {weatherPopup: weather} = props;

    //When a Mapbox geojson data "Source" is used, the JS object is converted to JSON, hence deeply nested keys
    //cannot be accessed, so JSON.parse is used to first convert the JSON back to a JS object.

    //For some weather entries, some fields (except rainfall and Issue Time) can be null sometimes indicating
    // no reported value, and so we "check" and not display those particular fields.


    return (
        <div className="custom-tooltip" style={{left: weather.x, top: weather.y}}>
            <h4>
                {`${weather.feature.properties.station_name}, ${weather.feature.properties.station_type}, 
                        ${weather.feature.properties.source}`}
            </h4>
            <div>Issue Time: {`${JSON.parse(weather.feature.properties.forecast).issue_time}`}</div>
            <div>Rainfall: {`${JSON.parse(weather.feature.properties.forecast).rainfall.value}`} mm</div>
            {JSON.parse(weather.feature.properties.forecast).temperature.value && (
                <div>Temperature: {`${JSON.parse(weather.feature.properties.forecast).temperature.value}`} C</div>
            )}
            {JSON.parse(weather.feature.properties.forecast).real_humidity.value && (
                <div>Real Humidity: {`${JSON.parse(weather.feature.properties.forecast).real_humidity.value}`}%</div>
            )}
            {JSON.parse(weather.feature.properties.forecast).wind_speed.value && (
                <div>Wind Speed: {`${JSON.parse(weather.feature.properties.forecast).wind_speed.value}`} kt</div>
            )}
            {JSON.parse(weather.feature.properties.forecast).wind_direction.value && (
                <div>Wind Direction: {`${JSON.parse(weather.feature.properties.forecast).wind_direction.value}`} Degrees</div>
            )}
        </div>
    )
}