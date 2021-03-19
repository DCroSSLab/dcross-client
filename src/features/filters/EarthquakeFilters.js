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