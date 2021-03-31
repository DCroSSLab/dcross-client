/**
 *
 * Project Name: 	DCroSS
 * Author List: 	Faraaz Biyabani
 * Filename: 		EarthquakeFilters.js
 * Description:     Filter component for earthquakes, which gets displayed within the Filters tab
 *                  inside the "Data Options" drawer.
 * Usage:           ../drawers/panels/FiltersPanel.js
 *
 */

import "./EarthquakeFilters.css"
import {useDispatch, useSelector} from "react-redux";
import {selectFilters, setDepthRange, setMagnitudeRange} from "../earthquakes/earthquakesSlice";
import {RangeSlider} from "@blueprintjs/core";

export default function EarthquakeFilters() {
    const dispatch = useDispatch();
    const filter = useSelector(selectFilters);
    const magnitudeRange = [filter.magnitude.low, filter.magnitude.high];
    const depthRange = [filter.depth.low, filter.depth.high];

    const handleMagnitudeChange = (range) => {
        //The blueprintjs slider has a weird behaviour of not rounding values, resulting in
        //values such as 4.000099999999 (maybe the onChange usage is wrong, need to check)
        //So round off the values, just to be clean, wouldn't create any problems if not done.
        range[0] = Math.round(range[0] * 10) / 10;
        range[1] = Math.round(range[1] * 10) / 10;
        dispatch(setMagnitudeRange(range));
    }

    const handleDepthChange = (range) => {
        dispatch(setDepthRange(range))
    }

    return (
        <div>
            <h3>
                Earthquake Filters
            </h3>
            <h4>
                Magnitude
            </h4>
            <div className={"range-slider"}>
                <RangeSlider
                    min={filter.magnitude.minimum}
                    max={filter.magnitude.maximum}
                    stepSize={0.1}
                    labelStepSize={10}
                    onChange={handleMagnitudeChange}
                    value={magnitudeRange}
                />
            </div>
            <h4>
                Depth (in Kilometres)
            </h4>
            <div className={"range-slider"}>
                <RangeSlider
                    min={filter.depth.minimum}
                    max={filter.depth.maximum}
                    stepSize={10}
                    labelStepSize={100}
                    onChange={handleDepthChange}
                    value={depthRange}
                />
            </div>
        </div>
    )
}