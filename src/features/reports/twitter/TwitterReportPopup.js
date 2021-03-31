/**
 *
 * Project Name: 	DCroSS
 * Author List: 	Faraaz Biyabani, Saumyaranjan Parida
 * Filename: 		TwitterReportPopup.js
 * Description:     Popup for Twitter report markers
 *
 */


import {Popup} from "react-map-gl";
import React from "react";


function TwitterReportPopup (props) {
    const {report, setReport} = props;
    const images = report.properties.description.images

    return (
        <Popup
            tipSize={5}
            anchor="top"
            longitude={report.geometry.coordinates[0][0][0]}
            latitude={report.geometry.coordinates[0][0][1]}
            closeOnClick={true}
            onClose={setReport} >
            <div>
                <div>
                    <b>
                        Twitter
                    </b>
                    <br/>
                    Time: {report.properties.time}
                    <br/>
                    {report.properties.username} said:
                    <br/>
                    {report.properties.description.text}
                </div>
                {images.length > 0 &&
                <img height={200} src={images[0]} />
                }
            </div>
        </Popup>
    );
}

export default React.memo(TwitterReportPopup);