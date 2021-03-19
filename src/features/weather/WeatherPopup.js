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
                    {/*{weather.properties.forecast.rainfall.value && (*/}
                    {/*    `Rainfall: ${weather.properties.forecast.rainfall.value} mm`*/}
                    {/*)}*/}
                    {/*<br/>*/}
                    {/*{weather.properties.forecast.rainfall.value && (*/}
                    {/*    `Temperature: ${weather.properties.forecast.temperature.value} C`*/}
                    {/*)}*/}
                    {/*<br/>*/}
                    {/*{weather.properties.forecast.rainfall.value && (*/}
                    {/*    `Real Humidity: {weather.properties.forecast.real_humidity.value}%`*/}
                    {/*)}*/}
                    {/*<br/>*/}
                    {/*{weather.properties.forecast.wind_speed.value && (*/}
                    {/*    `Wind Speed: ${weather.properties.forecast.rainfall.value} kt`*/}
                    {/*)}*/}
                    {/*<br/>*/}
                    {/*{weather.properties.forecast.wind_direction.value && (*/}
                    {/*    `Wind Direction: ${weather.properties.forecast.rainfall.value} Degrees`*/}
                    {/*)}*/}
                </div>
                {/*<img width={240} src={info.image} />*/}
            </div>
        </Popup>
    );
}

export default React.memo(WeatherPopup);