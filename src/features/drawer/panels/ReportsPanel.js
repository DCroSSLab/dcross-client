/**
 *
 * Project Name: 	DCroSS
 * Author List: 	Faraaz Biyabani
 * Filename: 		ReportPanel.js
 * Description:     The ReportsPanel is a list view for both the Telegram and Twitter reports.
 *                  Uses both, the telegramReportsSlice and the twitterReportsSlice.
 *
 */


import React, {useCallback} from "react";
import {useSelector} from "react-redux";
import {selectAllTelegramReports} from "../../reports/telegram/telegramReportsSlice";
import {Card, Divider, Elevation, H6} from "@blueprintjs/core";
import ReportsImageGallery from "./ReportsImageGallery";
import "./ReportsPanel.css"
import {selectAllTwitterReports} from "../../reports/twitter/twitterReportsSlice";
import {FlyToInterpolator} from "react-map-gl";


export default function ReportsPanel(props) {
    const telegramReports = useSelector(selectAllTelegramReports);
    const twitterReports = useSelector(selectAllTwitterReports);
    const {setViewport} = props

    //Uses Mapbox's fly-to-interpolator to zoom to a report when the report card is clicked on.
    const flyTo = useCallback((longitude, latitude) => {
        setViewport({
            longitude: longitude,
            latitude: latitude,
            zoom: 15,
            transitionInterpolator: new FlyToInterpolator({speed: 1.5}),
            transitionDuration: 'auto'
        });
    }, []);

    //TODO -> Need to extract TelegramReportCard and TwitterReportCard components
    return (
        <div className="data-options-panel-reports">
            {telegramReports.map((report) => (
                <Card elevation={Elevation.TWO} className="data-options-panel-report-card"
                      onClick={() => flyTo(report.geometry.coordinates[0], report.geometry.coordinates[1])}>
                    <H6>
                        {report.properties.source.platform}
                    </H6>
                    <div>
                        Time: {report.properties.time}
                    </div>
                    <Divider />
                    <div>
                        Description:<br/>
                        {report.properties.description.text}
                    </div>
                    <ReportsImageGallery images={
                        report.properties.description.images.map((image) => (
                            "http://localhost:3001/reports/telegram/images/"+image.filename+image.extension
                        ))
                    }/>
                    <Divider />
                    <div>
                        Reporter's Contact: +{report.properties.source.phone_number}
                    </div>
                </Card>
            ))}
            {twitterReports.map((report) => (
                <Card elevation={Elevation.TWO} className="data-options-panel-report-card"
                      onClick={() => flyTo(report.geometry.coordinates[0][0][0], report.geometry.coordinates[0][0][1])}>
                    <H6>
                        {report.properties.source.platform}
                    </H6>
                    <div>
                        Time: {report.properties.time}
                    </div>
                    <Divider />
                    <div>
                        Description:<br/>
                        {report.properties.description.text}
                    </div>
                    <ReportsImageGallery images={report.properties.description.images}/>
                    <Divider />
                    <div>
                        Reporter: {report.properties.source.username}
                    </div>
                </Card>
            ))}
        </div>
    )
}