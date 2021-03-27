import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectAllTelegramReports} from "../../reports/telegram/telegramReportsSlice";
import {Card, Divider, Elevation, H6} from "@blueprintjs/core";
import ReportsImageGallery from "./ReportsImageGallery";
import "./ReportsPanel.css"


export default function ReportsPanel() {
    const dispatch = useDispatch();
    const reports = useSelector(selectAllTelegramReports);

    return (
        <div className="data-options-panel-reports">
            {reports.map((report) => (
                <Card elevation={Elevation.TWO} className="data-options-panel-report-card">
                    <H6>
                        {report.properties.source.platform} (+911234567890)
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
                        Reporter's Contact: +911234567890
                    </div>
                </Card>
            ))}
        </div>
    )
}