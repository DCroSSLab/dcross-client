/**
 * (Deprecated)
 * Project Name: 	DCroSS
 * Author List: 	Faraaz Biyabani, Saumyaranjan Parida
 * Filename: 		WeatherPopup.js
 * Description:     Popup that comes when you click on a AWS-ARG weather marker
 *                  Currently, instead of makers, a Mapbox data "source" and a "layer" ()
 *                  is used to reduce the lag that would occur due to re-rendering 700+ markers
 *
 */


import React from "react";
import {Popup} from "react-map-gl";

function WeatherPopup(props) {
    const {weather, setWeather} = props;
    const title = `${weather.properties.station_name}, ${weather.properties.station_type}, ${weather.properties.source}`;

    return (
        <Popup
            tipSize={5}
            anchor="top"
            longitude={weather.geometry.coordinates[0]}
            latitude={weather.geometry.coordinates[1]}
            closeOnClick={true}
            onClose={setWeather} >
            <div>
                <div>
                    <h4>
                        {title}
                    </h4>
                    Issue Time: {weather.properties.forecast.issue_time}
                    <br/>
                    Rainfall: {weather.properties.forecast.rainfall.value} mm
                    <br/>
                    Temperature: {weather.properties.forecast.temperature.value} C
                    <br/>
                    Real Humidity: {weather.properties.forecast.real_humidity.value}%
                    <br/>
                    Wind Speed: {weather.properties.forecast.rainfall.value} kt
                    <br/>
                    Wind Direction: {weather.properties.forecast.rainfall.value} Degrees
                </div>
                {/*<img width={240} src={info.image} />*/}
            </div>
        </Popup>
    );
}

export default React.memo(WeatherPopup);