import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchTelegramReports, selectAllTelegramReports} from "./telegramReportsSlice";
import {useEffect} from "react";
import {Marker} from "react-map-gl";
import icon from "./telegram-report-icon.png"


const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;

const SIZE = 40;


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

    // useEffect(() => {
    //     const timer = setTimeout(
    //         () => dispatch(fetchTelegramReports()),
    //         10000
    //     );
    //     return () => clearTimeout(timer);
    // })

    return reports.map((report, index) => (
        <Marker longitude={report.geometry.coordinates[0]} latitude={report.geometry.coordinates[1]}>
            <div style={{ cursor: 'pointer', transform: `translate(${-SIZE / 2}px,${-SIZE}px)` }} onClick={() => onClick(report)}>
                <img src={icon} height={SIZE}/>
            </div>
        </Marker>
    ));
}
