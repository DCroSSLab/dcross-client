import EarthquakeFilters from "../../filters/EarthquakeFilters";
import NowcastFilters from "../../filters/NowcastFilters";
import {Divider} from "@blueprintjs/core";


export default function FiltersPanel(props) {
    const {earthquake, nowcast, telegramReport, weather} = props;

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