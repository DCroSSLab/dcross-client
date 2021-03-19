import {Popup} from "react-map-gl";
import React from "react";


function TelegramReportPopup (props) {
    const {report, setReport} = props;
    // const displayName = `${report.properties.name}, ${report.properties.magnitude}`;

    return (
        <Popup
            tipSize={5}
            anchor="top"
            longitude={report.geometry.coordinates[0]}
            latitude={report.geometry.coordinates[1]}
            closeOnClick={true}
            onClose={setReport} >
            <div>
                <div>
                    Telegram
                    <br/>
                    Time:
                    {report.properties.time}
                    <br/>
                    Reporter said:
                    <br/>
                    {report.properties.description.text}
                </div>
                {/*<img width={240} src={info.image} />*/}
            </div>
        </Popup>
    );
}

export default React.memo(TelegramReportPopup);