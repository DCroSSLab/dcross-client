/**
 *
 * Project Name: 	DCroSS
 * Author List: 	Faraaz Biyabani, Priya Pathak
 * Filename: 		TelegramReportLayer.js
 * Description:     This component dispatches fetch actions and then displays the Telegram report
 *                  markers on the map, using the redux store.
 *
 */


import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchTelegramReports, selectAllTelegramReports} from "./telegramReportsSlice";
import {useEffect} from "react";
import {Marker} from "react-map-gl";
import icon from "./telegram-report-icon.png"


const SIZE = 35;


export function TelegramReportLayer(props) {
    const dispatch = useDispatch();
    const reports = useSelector(selectAllTelegramReports);
    const fetchTelegramReportsStatus = useSelector((state) => state.telegramReports.status);
    const {onClick} = props;

    useEffect(() => {
        if (fetchTelegramReportsStatus === 'idle') {
            dispatch(fetchTelegramReports());
        }
    }, [fetchTelegramReportsStatus, dispatch]);

    //I think we need long polling or websockets, but this works for now.
    //This regular GET requests are only being done for Telegram and Twitter reports
    useEffect(() => {
        const timer = setTimeout(
            () => dispatch(fetchTelegramReports()),
            10000
        );
        return () => clearTimeout(timer);
    })

    return reports.map((report, index) => (
        <Marker longitude={report.geometry.coordinates[0]} latitude={report.geometry.coordinates[1]}>
            <div style={{ cursor: 'pointer', transform: `translate(${-SIZE / 2}px,${-SIZE}px)` }} onClick={() => onClick(report)}>
                <img src={icon} height={SIZE}/>
            </div>
        </Marker>
    ));
}
