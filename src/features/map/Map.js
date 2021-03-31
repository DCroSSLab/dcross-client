/**
 *
 * Project Name: 	DCroSS
 * Author List: 	Faraaz Biyabani
 * Filename: 		Map.js
 * Description:     Map component, the root component.
 *
 */




import React, {useCallback, useState} from "react";
import './Map.css'
import {EarthquakeLayer} from "../earthquakes/EarthquakeLayer";
import MapGL, {AttributionControl, NavigationControl, ScaleControl} from 'react-map-gl';
import {TelegramReportLayer} from "../reports/telegram/TelegramReportLayer";
import EarthquakePopup from "../earthquakes/EarthquakePopup";
import TelegramReportPopup from "../reports/telegram/TelegramReportPopup";
import {NowcastLayer} from "../nowcasts/NowcastLayer";
import NowcastPopup from "../nowcasts/NowcastPopup";
import "@blueprintjs/core/lib/css/blueprint.css";
import UtilDrawer from "../drawer/Drawer";
import WeatherLayer from "../weather/WeatherLayer";
import WeatherPopup from "../weather/WeatherPopup2";
import {TwitterReportLayer} from "../reports/twitter/TwitterReportLayer";
import TwitterReportPopup from "../reports/twitter/TwitterReportPopup";

const TOKEN = "pk.eyJ1IjoiZmFyYWF6YiIsImEiOiJja200bTV1OHYwNXYzMnB1aXJ5enN0cXBjIn0.XSvpgelcXXCi90zU6ZzlKw";

const scaleControlStyle= {
    left: 100,
    bottom: 10
};

const navControlStyle= {
    right: 10,
    top: 10
};

const attributionStyle= {
    right: 0,
    bottom: 0
};

export default function Map() {

    const [viewport, setViewport] = useState({
        longitude: 90.94,
        latitude: 26.21,
        zoom: 5,
        bearing: 0,
        pitch: 0
    });

    const [earthquakeLayerVisibility, showEarthquakeLayer] = useState(true);
    const [nowcastLayerVisibility, showNowcastLayer] = useState(true);
    const [telegramReportLayerVisibility, showTelegramReportLayer] = useState(true);
    const [twitterReportLayerVisibility, showTwitterReportLayer] = useState(true);
    const [weatherLayerVisibility, showWeatherLayer] = useState(false);

    const [earthquakePopup, setEarthquakePopup] = useState(null);
    const [telegramPopup, setTelegramPopup] = useState(null);
    const [twitterPopup, setTwitterPopup] = useState(null);
    const [nowcastPopup, setNowcastPopup] = useState(null);
    const [weatherPopup, setWeatherPopup] = useState(null);

    // This is used to set a weather object as a subject for the popup
    // when it is hovered on. Since, we switched to the "sources" and "interactive layer"
    // implementation (described in weather/WeatherLayer.js), the MapGL comp.
    // needs the onHover prop.
    const onHover = useCallback(event => {
        const {
            features,
            srcEvent: {offsetX, offsetY}
        } = event;
        const hoveredFeature = features && features[0];

        setWeatherPopup(
            hoveredFeature
                ? {
                    feature: hoveredFeature,
                    x: offsetX,
                    y: offsetY
                }
                : null
        );
    }, []);

    return (
        <MapGL {...viewport} width="100vw" height="100vh" onViewportChange={setViewport}
               attributionControl={false}
               mapStyle={'mapbox://styles/mapbox/streets-v11'}
               mapboxApiAccessToken={TOKEN}
               interactiveLayerIds={['weather']}
               onHover={onHover}
               // Custom style not required anymore
        >

            <UtilDrawer layers={{earthquake: earthquakeLayerVisibility, nowcast: nowcastLayerVisibility,
                telegramReport: telegramReportLayerVisibility, twitterReport: twitterReportLayerVisibility,
                weather: weatherLayerVisibility}}
                layerControls={{showEarthquake: showEarthquakeLayer, showNowcast: showNowcastLayer,
                showTelegramReport: showTelegramReportLayer, showTwitterReport: showTwitterReportLayer,
                    showWeather: showWeatherLayer}}
                setViewport={setViewport}
            />

            {weatherLayerVisibility && (
                <WeatherLayer />
            )}
            {nowcastLayerVisibility && (
                <NowcastLayer onClick={setNowcastPopup} />
            )}
            {telegramReportLayerVisibility && (
                <TelegramReportLayer onClick={setTelegramPopup}/>
            )}
            {twitterReportLayerVisibility && (
                <TwitterReportLayer onClick={setTwitterPopup} />
            )}
            {earthquakeLayerVisibility && (
                <EarthquakeLayer onClick={setEarthquakePopup} />
            )}

            {nowcastPopup && (
                <NowcastPopup nowcast={nowcastPopup} setNowcast={setNowcastPopup} />
            )}
            {/*Using Weather Popup2*/}
            {weatherPopup && (
                <WeatherPopup weather={weatherPopup} />
            )}
            {telegramPopup && (
                <TelegramReportPopup report={telegramPopup} setReport={setTelegramPopup} />
            )}
            {earthquakePopup && (
                <EarthquakePopup earthquake={earthquakePopup} setWeather={setEarthquakePopup} />
            )}
            {twitterPopup && (
                <TwitterReportPopup report={twitterPopup} setReport={setTwitterPopup} />
            )}

            <NavigationControl style={navControlStyle} />
            <ScaleControl maxWidth={100} unit="metric" style={scaleControlStyle} />
            <AttributionControl compact={true} style={attributionStyle}
                customAttribution={"DCroSS@eyic"}/>
        </MapGL>
    );
}