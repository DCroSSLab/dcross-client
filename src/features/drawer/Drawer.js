/**
 *
 * Project Name: 	DCroSS
 * Author List: 	Faraaz Biyabani
 * Filename: 		Drawer.js
 * Description:     Data Options drawer component. Houses almost everything other than the map itself.
 *                  It is divided into three tabs/panels: Layers, Filters and Reports
 *                  The panel components are in the /panels directory.
 *
 */


import {_useMapControl as useMapControl} from 'react-map-gl';
import {Button, ButtonGroup, Drawer, Position, Tab, Tabs} from "@blueprintjs/core";
import {useState} from "react";
import "./Drawer.css"
import LayersPanel from "./panels/LayersPanel";
import FiltersPanel from "./panels/FiltersPanel";
import ReportsPanel from "./panels/ReportsPanel";


/**
 * The drawer receives props that help determine and control layer visibility.
 * The drawer passes the relevant components to the tabs/panels components
 *
*/

export default function UtilDrawer(props) {
    const {context, containerRef} = useMapControl({
        onDragStart: evt => {
            // prevents the base map from panning when dragging over the drawer
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
            <Drawer className={"map-overlay-drawer"} isOpen={isOpen} onClose={handleClose} position={Position.LEFT}
                    title={"Data Options"} usePortal={true} size={Drawer.SIZE_SMALL} hasBackdrop={false}
                    >
                <div id="drawer">
                    <Tabs selectedTabId={tab} large={true} onChange={handleTabChange} animate={true}>
                        <Tab id="layer-tab" title="Layers" panel={<LayersPanel {...props}/>}/>
                        <Tab id="filter-tab" title="Filters" panel={<FiltersPanel {...props.layers}/>}/>
                        <Tab id="report-tab" title="Reports" panel={<ReportsPanel {...props}/>}/>
                    </Tabs>
                </div>
            </Drawer>
        </div>
    )
}