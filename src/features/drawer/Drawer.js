import MapGL, {_useMapControl as useMapControl} from 'react-map-gl';
import {Button, Drawer, Position, RangeSlider, Tab, Tabs} from "@blueprintjs/core";
import {useState} from "react";
import "./Drawer.css"
import LayersPanel from "./panels/LayersPanel";
import FiltersPanel from "./panels/FiltersPanel";
import ReportsPanel from "./panels/ReportsPanel";
import {ButtonGroup} from "@material-ui/core";


export default function UtilDrawer(props) {
    const {context, containerRef} = useMapControl({
        onDragStart: evt => {
            // prevent the base map from panning
            evt.stopPropagation();
        },
        onClick: evt => {
            if (evt.type === 'click') {
            }
        },
        onDoubleClick: evt => {
            evt.stopPropagation();
        }
    });

    const {earthquake, nowcast, telegramReport} = props.layers;
    const {showEarthquake, showNowcast, showTelegramReport} = props.layerControls;

    const [isOpen, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [tab, selectTab] = useState("layer-tab");
    const handleTabChange = (tabID) => selectTab(tabID);

    const goToReports = () => {
        selectTab("report-tab");
        handleOpen();
    }

    return (
        <div className={"map-overlay"} ref={containerRef}>
            <ButtonGroup className="map-overlay-button">
                <Button intent={"primary"} onClick={handleOpen} text={"Data Options"}/>
                <Button intent={"primary"} onClick={goToReports} text={"Reports"}/>
            </ButtonGroup>
            {/*<Button className={"map-overlay-button"} intent={"primary"} onClick={handleOpen} text={"Data Options"}/>*/}
            <Drawer className={"map-overlay-drawer"} isOpen={isOpen} onClose={handleClose} position={Position.LEFT}
                    title={"Data Options"} usePortal={true} size={Drawer.SIZE_SMALL}
                    >
                <div id="drawer">
                    <Tabs selectedTabId={tab} large={true} onChange={handleTabChange} animate={true}>
                        <Tab id="layer-tab" title="Layers" panel={<LayersPanel {...props}/>}/>
                        <Tab id="filter-tab" title="Filters" panel={<FiltersPanel {...props.layers}/>}/>
                        <Tab id="report-tab" title="Reports" panel={<ReportsPanel/>}/>
                    </Tabs>
                </div>
            </Drawer>
        </div>
    )
}