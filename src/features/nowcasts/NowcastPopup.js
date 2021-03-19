import {Popup} from "react-map-gl";
import React from "react";


function NowcastPopup (props) {
    const {nowcast, setNowcast} = props;
    // const displayName = `${report.properties.name}, ${report.properties.magnitude}`;

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
                    {/*Coordinates:*/}
                    {/*{nowcast.geometry.coordinates[0]}, {nowcast.geometry.coordinates[1]}*/}
                    {/*<br/>*/}
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
                {/*<img width={240} src={info.image} />*/}
            </div>
        </Popup>
    );
}

export default React.memo(NowcastPopup);