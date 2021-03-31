/**
 *
 * Project Name: 	DCroSS
 * Author List: 	Faraaz Biyabani
 * Filename: 		FiltersPanel.js
 * Description:     The FiltersPanel has filters for the earthquake and nowcasts data layers.
 *
 */


import EarthquakeFilters from "../../filters/EarthquakeFilters";
import NowcastFilters from "../../filters/NowcastFilters";
import {Divider} from "@blueprintjs/core";


export default function FiltersPanel(props) {
    const {earthquake, nowcast, telegramReport, weather} = props;

    // earthquake, nowcast, etc will be boolean values.
    // Show the filter if a layer is enabled.
    return (
        <div>
            {earthquake && (
                <EarthquakeFilters />
            )}
            {earthquake && nowcast && (
                <Divider vertical={true}/>
            )}
            {nowcast && (
                <NowcastFilters />
            )}
        </div>
    )
}