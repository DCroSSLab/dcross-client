/**
 *
 * Project Name: 	DCroSS
 * Author List: 	Faraaz Biyabani
 * Filename: 		weatherLayer.js
 * Description:     This component displays the weather circle points on the map. It dispatches
 *                  fetch actions and then displays the Telegram report markers on the map, using
 *                  the redux store.
 *
 */


import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {Layer, Source} from "react-map-gl";
import {fetchAWSARGWeather, selectWeather} from "./weatherSlice";

const dataLayer = {
    id: 'weather',
    type: 'circle',
    paint: {
        'circle-color': '#3288bd',
        'circle-radius': 4,
    }
};

function WeatherLayer() {
    const dispatch = useDispatch();
    const weatherForecast = useSelector(selectWeather);
    const fetchWeatherStatus = useSelector((state) => state.weather.status);

    useEffect(() => {
        if (fetchWeatherStatus === 'idle') {
            dispatch(fetchAWSARGWeather())
        }
    }, [fetchWeatherStatus, dispatch])

    //OLD Markers implementation
    // return weatherForecast.map((weather, index) => (
    //     <Marker longitude={weather.geometry.coordinates[0]} latitude={weather.geometry.coordinates[1]}>
    //         {/*<svg className={weather.properties.classname}*/}
    //         {/*     height={SIZE}*/}
    //         {/*     viewBox="0 0 24 24"*/}
    //         {/*     style={{*/}
    //         {/*         cursor: 'pointer',*/}
    //         {/*         // fill: '#d00',*/}
    //         {/*         fill: "purple",*/}
    //         {/*         stroke: 'none',*/}
    //         {/*         transform: `translate(${-SIZE / 2}px,${-SIZE}px)`*/}
    //         {/*     }}*/}
    //         {/*    onClick={() => onClick(weather)}*/}
    //         {/*     // onMouseEnter={() => onClick(weather)}*/}
    //         {/*    // onMouseLeave={()=> onClick(null)}*/}
    //         {/*>*/}
    //         {/*    <path d={ICON} />*/}
    //         {/*</svg>*/}
    //         <div style={{ cursor: 'pointer', transform: `translate(${-SIZE / 2}px,${-SIZE}px)` }}
    //              onClick={() => onClick(weather)}>
    //             <img src={icon} height={SIZE}/>
    //         </div>
    //     </Marker>
    // ));
    const data = {"type": "FeatureCollection", "features": weatherForecast}

    return (
        <Source type={"geojson"} data={data}>
            <Layer {...dataLayer} />
        </Source>
    )
}

export default React.memo(WeatherLayer);