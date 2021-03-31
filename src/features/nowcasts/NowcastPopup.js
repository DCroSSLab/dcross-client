/**
 *
 * Project Name: 	DCroSS
 * Author List: 	Faraaz Biyabani
 * Filename: 		NowcastPopup.js
 * Description:     Popup for nowcast markers.
 *
 */


import {Popup} from "react-map-gl";
import React from "react";


function NowcastPopup (props) {
    const {nowcast, setNowcast} = props;

    return (
        <Popup
            tipSize={5}
            anchor="top"
            longitude={nowcast.geometry.coordinates[0]}
            latitude={nowcast.geometry.coordinates[1]}
            closeOnClick={true}
            onClose={setNowcast} >
            <div>
                <div style={{maxWidth: 400, cursor: "pointer"}}>
                    IMD Nowcast
                    <br/>
                    Source: {nowcast.properties.station_name}, {nowcast.properties.source}
                    <br/>
                    Issue Time:
                    {nowcast.properties.forecast.issue_time}
                    <br/>
                    Expire Time:
                    {nowcast.properties.forecast.expire_time}
                    <br/>
                    Description:
                    <br/>
                    {nowcast.properties.forecast.description}
                </div>
            </div>
        </Popup>
    );
}

export default React.memo(NowcastPopup);