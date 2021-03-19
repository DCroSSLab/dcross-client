import {useState} from "react";
import './Map.css'
import {EarthquakeLayer} from "../earthquakes/EarthquakeLayer";
import  MapGL from 'react-map-gl';
import {TelegramReportLayer} from "../reports/telegram/TelegramReportLayer";
import EarthquakePopup from "../earthquakes/EarthquakePopup";
import TelegramReportPopup from "../reports/telegram/TelegramReportPopup";
import {NowcastLayer} from "../nowcasts/NowcastLayer";
import NowcastPopup from "../nowcasts/NowcastPopup";
import "@blueprintjs/core/lib/css/blueprint.css";
import UtilDrawer from "../drawer/Drawer";
import {WeatherLayer} from "../weather/WeatherLayer";
import WeatherPopup from "../weather/WeatherPopup";

const TOKEN = "pk.eyJ1IjoiZmFyYWF6YiIsImEiOiJja200bTV1OHYwNXYzMnB1aXJ5enN0cXBjIn0.XSvpgelcXXCi90zU6ZzlKw";

export default function Map() {

    const [viewport, setViewport] = useState({
        longitude: 90.94,
        latitude: 26.21,
        zoom: 5,
        mapboxApiAccessToken: TOKEN
    });

    const [earthquakeLayerVisibility, showEarthquakeLayer] = useState(true);
    const [nowcastLayerVisibility, showNowcastLayer] = useState(true);
    const [telegramReportLayerVisibility, showTelegramReportLayer] = useState(false);
    const [weatherLayerVisibility, showWeatherLayer] = useState(true);

    const [earthquakePopup, setEarthquakePopup] = useState(null);
    const [telegramPopup, setTelegramPopup] = useState(null);
    const [nowcastPopup, setNowcastPopup] = useState(null);
    const [weatherPopup, setWeatherPopup] = useState(null);

    return (
        <MapGL {...viewport} width="100vw" height="100vh" onViewportChange={setViewport}
               mapStyle={'mapbox://styles/faraazb/ckk04lhmr165317nyy1u1o5ys'}
            // mapStyle='mapbox://styles/faraazb/ckk25t5n3psi17qwkxsybbqw'
        >

            <UtilDrawer layers={{earthquake: earthquakeLayerVisibility, nowcast: nowcastLayerVisibility,
                telegramReport: telegramReportLayerVisibility, weather: weatherLayerVisibility}}
                layerControls={{showEarthquake: showEarthquakeLayer, showNowcast: showNowcastLayer,
                showTelegramReport: showTelegramReportLayer, showWeather: showWeatherLayer}}
            />

            {earthquakeLayerVisibility && (
                <EarthquakeLayer onClick={setEarthquakePopup} />
            )}
            {weatherLayerVisibility && (
                <WeatherLayer onClick={setWeatherPopup} />
            )}
            {nowcastLayerVisibility && (
                <NowcastLayer onClick={setNowcastPopup} />
            )}
            <TelegramReportLayer onClick={setTelegramPopup}/>

            {nowcastPopup && (
                <NowcastPopup nowcast={nowcastPopup} setNowcast={setNowcastPopup} />
            )}
            {weatherPopup && (
                <WeatherPopup weather={weatherPopup} setWeather={setWeatherPopup} />
            )}
            {telegramPopup && (
                <TelegramReportPopup report={telegramPopup} setReport={setTelegramPopup} />
            )}
            {earthquakePopup && (
                <EarthquakePopup earthquake={earthquakePopup} setWeather={setEarthquakePopup}/>
            )}
        </MapGL>
    );
}