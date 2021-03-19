import {Checkbox} from "@blueprintjs/core";


export default function LayersPanel(props) {
    const {earthquake, nowcast, telegramReport, weather} = props.layers;
    const {showEarthquake, showNowcast, showTelegramReport, showWeather} = props.layerControls;


    return (
        <div>
            <Checkbox label="Earthquakes (NCS)" defaultChecked={earthquake} onChange={(event) =>
                showEarthquake(event.target.checked)}/>
            <Checkbox label="Nowcasts (IMD)" defaultChecked={nowcast} onChange={(event) =>
                showNowcast(event.target.checked)}/>
            <Checkbox label="AWS ARG Weather (IMD)" defaultChecked={weather} onChange={(event) =>
                showWeather(event.target.checked)}/>
            <Checkbox label="Telegram Reports" defaultChecked={telegramReport} onChange={(event) =>
                showTelegramReport(event.target.checked)}/>
        </div>
    )
}