/**
 *
 * Project Name: 	DCroSS
 * Author List: 	Faraaz Biyabani
 * Filename: 		EarthquakeLayer.js
 * Description:     This component dispatches fetch actions and then displays the earthquake
 *                  markers on the map, using the redux store.
 *
 */


import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchEarthquakes, selectFilteredEarthquakes} from "./earthquakesSlice";
import {useEffect} from "react";
import {Marker} from "react-map-gl";
import "./EarthquakeLayer.css"


const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;

const SIZE = 20;


export function EarthquakeLayer(props) {
    const dispatch = useDispatch();
    const earthquakes = useSelector(selectFilteredEarthquakes);
    const fetchEarthquakesStatus = useSelector((state) => state.earthquakes.status);
    const {onClick} = props;

    useEffect(() => {
        if (fetchEarthquakesStatus === 'idle') {
            dispatch(fetchEarthquakes())
        }
    }, [fetchEarthquakesStatus, dispatch])

    return earthquakes.map((earthquake, index) => (
        <Marker longitude={earthquake.geometry.coordinates[0]} latitude={earthquake.geometry.coordinates[1]}>
            <svg className={earthquake.properties.classname}
                 height={SIZE}
                 viewBox="0 0 24 24"
                 style={{
                     cursor: 'pointer',
                     // fill: '#d00',
                     fill: earthquake.properties.fill,
                     stroke: 'none',
                     transform: `translate(${-SIZE / 2}px,${-SIZE}px)`
                 }}
                // onClick={() => onClick(earthquake)}
                onMouseEnter={() => onClick(earthquake)}
                // onMouseLeave={()=> onClick(null)}
            >
                <path d={ICON} />
            </svg>
        </Marker>
    ));
}
