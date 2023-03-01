import { Map as Mapbox, MapRef, MapLayerMouseEvent } from "react-map-gl";
import { useCallback, useRef, useState } from "react";
import { useWindowSize } from "../app/hooks/hooks";
import { getDeltaIndicator } from "./Shared";


const Map = () => {
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const [zoom, setZoom] = useState(0)
    const [windowSize,] = useWindowSize()
    const projection = windowSize < 825 ? 'mercator' : 'globe'
    const longitude = windowSize < 825 ? -30 : 15
    const latitude = windowSize < 825 ? 90 : 0
    const mapRef = useRef<MapRef>();

    const onSelectSubregion = useCallback(({ lng, lat }) => {
        mapRef.current?.flyTo({ center: [lng, lat], duration: 1000 });
        setZoom(2.4)
    }, []);

    return <div ref={mapContainer} className={'h-full w-full relative'}>
        {/* 
        // @ts-ignore */}
        <div className="flex flex-col gap-2 justify-center items-center font-equinox  z-10 fixed top-[12%] right-1/4 pointer-events-none">
            <p className='text-red-500 tracking-widest'>Unemployment</p>
            <div className='flex flex-col gap-2 justify-center items-center w-20 h-20 border-dashed rounded-full border-2 text-red-600 border-red-600 bg-red-900 bg-opacity-30'>
                {getDeltaIndicator(-.5)}
                <p className="justify-center items-center text-center text-sm">{' 17% since 2019'}</p>
            </div>
        </div>
        <Mapbox
            ref={mapRef}
            trackResize
            minZoom={1}
            maxZoom={2.5}
            // zoom={zoom}
            mapboxAccessToken='pk.eyJ1IjoiamRpbGxkZXYiLCJhIjoiY2xjbHR0MXNtOXE3ZTN2cGx1YWwxYmE4cyJ9.UKQMbbf2Q4revc3Nz9ws3g'
            initialViewState={{
                longitude,
                latitude,
                zoom: 1,
            }}
            interactiveLayerIds={['subregional-data']}
            projection={projection}
            attributionControl={false}
            style={{ position: 'absolute', width: '100%', height: '100%', }}
            mapStyle="mapbox://styles/jdilldev/clemtp805000901s45xextcln"
            onClick={(e: MapLayerMouseEvent) => {
                if (!e.features[0]) return
                const { properties } = e.features[0];

                onSelectSubregion(e.lngLat)
            }}
        />

    </div>
}

export default Map