import { FrameCorners } from "@arwes/core"
import { Map as Mapbox } from "react-map-gl";
import { useRef, useState } from "react";
import { useWindowSize } from "../app/hooks/hooks";


const LeftMapStyle: React.CSSProperties = {
    position: 'absolute',
    width: '100%',
    height: '100%'
};
const Map = () => {
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const [mapHeight, setMapHeight] = useState(0)
    const [windowSize,] = useWindowSize()
    const projection = windowSize < 825 ? 'mercator' : 'globe'
    const longitude = windowSize < 825 ? -30 : 15
    const latitude = windowSize < 825 ? 90 : 0

    console.log(mapContainer.current ? mapContainer.current.clientWidth : 'not ready')

    return <div ref={mapContainer} className={'h-full w-full relative'}>
        {/* 
        // @ts-ignore */}
        <div className="z-10 w-16 h-16 flex justify-center items-center absolute top-16 right-16 border-dashed rounded-full border-2 text-red-800 border-red-500 bg-red-900 bg-opacity-20">
            <p className="text-center">a</p>
        </div>
        <Mapbox
            trackResize
            minZoom={1}
            maxZoom={2.5}
            mapboxAccessToken='pk.eyJ1IjoiamRpbGxkZXYiLCJhIjoiY2xjbHR0MXNtOXE3ZTN2cGx1YWwxYmE4cyJ9.UKQMbbf2Q4revc3Nz9ws3g'
            initialViewState={{
                longitude,
                latitude,
                zoom: 1,
            }}
            projection={projection}
            attributionControl={false}
            style={{ position: 'absolute', left: 0, top: -100, width: '100%', height: '100%', }}
            mapStyle="mapbox://styles/jdilldev/clemtp805000901s45xextcln"
        />

    </div>
}

export default Map