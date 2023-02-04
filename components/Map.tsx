import { FrameCorners } from "@arwes/core"
import { ButtonGroup } from "./Shared"
import { Map as Mapbox } from "react-map-gl";
import { useRef, useState } from "react";

const Map = () => {
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const [mapHeight, setMapHeight] = useState(0)
    const [chart2height, setchartheight] = useState(0)
    const [mapProjection, setMapProjection] = useState<'mercator' | 'globe'>('mercator')

    return <div className={`border-solid border-3 border-cyan-500  h-full w-full`}>
        {/* 
        // @ts-ignore */}
        <FrameCorners
            showContentLines
            className='h-full w-full flex bg-center bg-cover'
            animator={{ animate: false }}
            contentLineWidth={3}
            cornerWidth={3}
            cornerLength={50}>
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
                mapStyle="mapbox://styles/jdilldev/cld37ljym000801o0ygnt71yu"
                onRender={(event) => {
                    if (mapContainer.current)
                        setMapHeight(mapContainer.current.clientHeight)

                    return event.target.resize()
                }}
            />
        </FrameCorners>
    </div>
}

export default Map