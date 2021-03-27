import {Popup} from "react-map-gl";
import React from "react";


function TelegramReportPopup (props) {
    const {report, setReport} = props;
    const images = report.properties.description.images

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
                    <b>
                        Telegram
                    </b>
                    <br/>
                    Time: {report.properties.time}
                    <br/>
                    Reporter said:
                    <br/>
                    {report.properties.description.text}
                </div>
                {images.length > 0 &&
                <img height={200} src={"http://localhost:3001/reports/telegram/images/"+
                    images[0].filename+images[0].extension} />
                }
            </div>
        </Popup>
    );
}

export default React.memo(TelegramReportPopup);