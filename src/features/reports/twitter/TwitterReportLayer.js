/**
 *
 * Project Name: 	DCroSS
 * Author List: 	Faraaz Biyabani, Saumyaranjan Parida
 * Filename: 		TwitterReportLayer.js
 * Description:     This component dispatches fetch actions and then displays the Twitter report
 *                  markers on the map, using the redux store.
 *
 */


import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchTwitterReports, selectAllTwitterReports} from "./twitterReportsSlice";
import {useEffect} from "react";
import {Marker} from "react-map-gl";
import icon from "./twitter-report-icon.png"


const SIZE = 35;


export function TwitterReportLayer(props) {
    const dispatch = useDispatch();
    const reports = useSelector(selectAllTwitterReports);
    const fetchTwitterReportsStatus = useSelector((state) => state.twitterReports.status);
    const {onClick} = props;

    useEffect(() => {
        if (fetchTwitterReportsStatus === 'idle') {
            dispatch(fetchTwitterReports());
        }
    }, [fetchTwitterReportsStatus, dispatch]);

    //I think we need long polling or websockets, but this works for now.
    useEffect(() => {
        const timer = setTimeout(
            () => dispatch(fetchTwitterReports()),
            10000
        );
        return () => clearTimeout(timer);
    })

    return reports.map((report, index) => (
        <Marker longitude={report.geometry.coordinates[0][0][0]} latitude={report.geometry.coordinates[0][0][1]}>
            <div style={{ cursor: 'pointer', transform: `translate(${-SIZE / 2}px,${-SIZE}px)` }} onClick={() => onClick(report)}>
                <img src={icon} height={SIZE}/>
            </div>
        </Marker>
    ));
}
