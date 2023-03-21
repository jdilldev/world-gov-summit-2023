'use client'

import { Map as Mapbox, MapRef, MapLayerMouseEvent } from "react-map-gl";
import { useCallback, useContext, useRef, useState } from "react";
import { useWindowSize } from "../app/hooks/hooks";
import { DEFAULT_THEME_PROMPT, } from "../app/constants/constants";

import { useRouter } from "next/navigation";
import { replaceSpacesWithUnderscore } from "../utils";
import { usePathname } from "next/navigation";


const Map = () => {
    const router = useRouter();
    const pathname = usePathname()
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const [zoom, setZoom] = useState(0)
    const [windowSize,] = useWindowSize()
    const projection = windowSize < 825 ? 'mercator' : 'globe'
    const longitude = windowSize < 825 ? -30 : 15
    const latitude = windowSize < 825 ? 90 : 0
    const mapRef = useRef<MapRef>(null);

    const [_, theme, __, metric] = pathname!.split('/')
    const onSelectSubregion = useCallback(({ lng, lat }: { lng: number, lat: number }) => {
        mapRef.current?.flyTo({ center: [lng, lat], duration: 1000 });
        setZoom(2.4)
    }, []);

    return <div ref={mapContainer} className={'h-full w-full relative md:h-[90%]'}>
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
                if (theme === DEFAULT_THEME_PROMPT || !e.features || !e.features[0]) return
                const { properties } = e.features[0];

                const subregion = properties!.subregionName


                onSelectSubregion(e.lngLat)
                let route = `${theme}/singleRegion/${metric}?region=${subregion}`
                route = replaceSpacesWithUnderscore(route)
                router.push(route, {})
            }}
        //onZoom={(e) => { console.log(e) }}
        /*            onDragEnd={(e) => {
                       setRegion('')
                   }} */
        />

    </div>
}

export default Map