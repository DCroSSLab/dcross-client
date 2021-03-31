/**
 *
 * Project Name: 	DCroSS
 * Author List: 	Faraaz Biyabani
 * Filename: 		NowcastLayer.js
 * Description:     This component dispatches fetch actions and then displays the nowcast
 *                  markers on the map, using the redux store.
 *
 */



import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {Marker} from "react-map-gl";
import icon from "./weather.png"
import {selectAllNowcasts, fetchNowcasts, selectFilteredNowcasts} from "./nowcastsSlice";

const SIZE = 18;


export function NowcastLayer(props) {
    const dispatch = useDispatch();
    const nowcasts = useSelector(selectFilteredNowcasts);
    const fetchNowcastsStatus = useSelector((state) => state.nowcasts.status);
    const {onClick} = props;

    useEffect(() => {
        if (fetchNowcastsStatus === 'idle') {
            dispatch(fetchNowcasts());
        }
    }, [fetchNowcastsStatus, dispatch]);

    return nowcasts.map((nowcast, index) => (
        <Marker longitude={nowcast.geometry.coordinates[0]} latitude={nowcast.geometry.coordinates[1]}>
            <div style={{ cursor: 'pointer', transform: `translate(${-SIZE / 2}px,${-SIZE}px)` }}
                 onClick={() => onClick(nowcast)}>
                <img src={icon} height={SIZE}/>
            </div>
        </Marker>
    ));
}
