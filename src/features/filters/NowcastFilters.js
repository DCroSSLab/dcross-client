import {Checkbox} from "@blueprintjs/core";
import {useDispatch, useSelector} from "react-redux";
import {selectNowcastFilters, setSeverityFilter} from "../nowcasts/nowcastsSlice";


export default function NowcastFilters() {
    const dispatch = useDispatch();
    const filter = useSelector(selectNowcastFilters)
    const low = filter.severity.includes("Low");
    const medium = filter.severity.includes("Medium");
    const high = filter.severity.includes("High");

    const handleChange = (event) => {
        const type = event.target.checked ? "enable" : "disable";
        console.log("Type:"+type);
        console.log("Name"+event.target.name);
        dispatch(setSeverityFilter([type, event.target.name]));
    }

    return (
        <div>
            <h3>
                Nowcast Filters
            </h3>
            <h4>
                Severity
            </h4>
            <Checkbox name={"Low"} label={"Low"} defaultChecked={low} onChange={handleChange}/>
            <Checkbox name={"Medium"} label={"Medium"} defaultChecked={medium} onChange={handleChange}/>
            <Checkbox name={"High"} label={"High"} defaultChecked={high} onChange={handleChange}/>
        </div>
    )
}