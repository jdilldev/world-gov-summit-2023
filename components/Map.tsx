import { FrameCorners } from "@arwes/core"
import { ButtonGroup } from "./Shared"
import { Map as Mapbox } from "react-map-gl";
import { useRef, useState } from "react";

const Map = () => {
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const [_, setMapHeight] = useState(0)
    const [mapProjection, setMapProjection] = useState<'mercator' | 'globe'>('mercator')

    return <div className={`relative flex flex-col h-full `}>
        {/* 
        // @ts-ignore */}
        <ButtonGroup className='absolute top-0 right-0 z-10 font-normal' values={['Mercator', 'Globe']} controlValue={mapProjection} onChange={(value: string) => setMapProjection(value as 'mercator' | 'globe')} />
        <Mapbox
            // trackResize
            minZoom={1}
            maxZoom={2.5}
            mapboxAccessToken='pk.eyJ1IjoiamRpbGxkZXYiLCJhIjoiY2xjbHR0MXNtOXE3ZTN2cGx1YWwxYmE4cyJ9.UKQMbbf2Q4revc3Nz9ws3g'
            initialViewState={{
                longitude: 15,
                latitude: 0,
                zoom: 1,
            }}
            pitch={mapProjection === 'mercator' ? 30 : 0}
            projection={mapProjection}
            attributionControl={false}
            style={{ width: '100%', height: '100%' }}
            mapStyle="mapbox://styles/jdilldev/cle09vgbj001101l9rm902mdp"
            onRender={(event) => {
                if (mapContainer.current)
                    setMapHeight(mapContainer.current.clientHeight)

                return event.target.resize()
            }}
        />
    </div>
}

export default Map