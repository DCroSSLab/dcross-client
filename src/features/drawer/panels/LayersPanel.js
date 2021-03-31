/**
 *
 * Project Name: 	DCroSS
 * Author List: 	Faraaz Biyabani
 * Filename: 		LayersPanel.js
 * Description:     The LayersPanel lists all the available data layers along with checkboxes that can
 *                  be used to enable (show) or disable (hide) these data layers.
 *
 */


import {Checkbox} from "@blueprintjs/core";


/**
 * The required props are provided by the higher level Drawer component, which in turn,
 * receives them from the root level Map component.
 */
export default function LayersPanel(props) {
    const {earthquake, nowcast, telegramReport, twitterReport, weather} = props.layers;
    const {showEarthquake, showNowcast, showTelegramReport, showTwitterReport, showWeather} = props.layerControls;


    return (
        <div>
            <Checkbox label="Telegram Reports" defaultChecked={telegramReport} onChange={(event) =>
                showTelegramReport(event.target.checked)}/>
            <Checkbox label="Twitter Reports" defaultChecked={twitterReport} onChange={(event) =>
                showTwitterReport(event.target.checked)} />
            <Checkbox label="Earthquakes (NCS)" defaultChecked={earthquake} onChange={(event) =>
                showEarthquake(event.target.checked)}/>
            <Checkbox label="Nowcasts (IMD)" defaultChecked={nowcast} onChange={(event) =>
                showNowcast(event.target.checked)}/>
            <Checkbox label="AWS ARG Weather (IMD)" defaultChecked={weather} onChange={(event) =>
                showWeather(event.target.checked)}/>
        </div>
    )
}