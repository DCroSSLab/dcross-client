import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {Marker} from "react-map-gl";
import {fetchAWSARGWeather, selectWeather} from "./weatherSlice";


const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;

const SIZE = 15;


export function WeatherLayer(props) {
    const dispatch = useDispatch();
    const weatherForecast = useSelector(selectWeather);
    const fetchWeatherStatus = useSelector((state) => state.weather.status);
    const {onClick} = props;

    useEffect(() => {
        if (fetchWeatherStatus === 'idle') {
            dispatch(fetchAWSARGWeather())
        }
    }, [fetchWeatherStatus, dispatch])

    return weatherForecast.map((weather, index) => (
        <Marker longitude={weather.geometry.coordinates[0]} latitude={weather.geometry.coordinates[1]}>
            <svg className={weather.properties.classname}
                 height={SIZE}
                 viewBox="0 0 24 24"
                 style={{
                     cursor: 'pointer',
                     // fill: '#d00',
                     fill: "purple",
                     stroke: 'none',
                     transform: `translate(${-SIZE / 2}px,${-SIZE}px)`
                 }}
                onClick={() => onClick(weather)}
                 // onMouseEnter={() => onClick(weather)}
                // onMouseLeave={()=> onClick(null)}
            >
                <path d={ICON} />
            </svg>
        </Marker>
    ));
}
